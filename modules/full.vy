struct item_struct:
    reply_to_index: uint256
    item: bytes32

item: event({item_index: indexed(uint256)})
# item_index is the index of the sent item in C.N.

last_item_index: public(uint256)

items: public(map(uint256, item_struct))

item_metadata: public(map(uint256, uint256)) # TODO: Check this is implemented correctly

# External sender mappings
external_sender_authorization: public(map(address, map(address, bool)))
# outer address is the authorizing user

owner: constant(address) = 0xd015FB4e0c7f2D0592fa642189a70ce46C90d612
custom_metadata_mask: constant(uint256) = 2 ** (12*8+1) - 1 - 6 # Fills 12 bytes with F, then sets the last third and second to last bits to 0 TODO: Double check this math
# TODO: Add owner/management functions

# Helper methods - used across several disparate paths

@public
@constant
def external_sender_asserts(msg_sender: address, sender: address):
    assert self.external_sender_authorization[msg_sender][sender]
@public
@constant
def prep_custom_metadata(custom_metadata: uint256) -> uint256:
    return bitwise_and(custom_metadata, custom_metadata_mask)

@public
@constant
def generate_metadata(sender: address, other_metadata: uint256) -> uint256:
    # Default_metadata is 3 bits.
    #   The leftmost bit represents if a message is a light item
    #   The middle bit represents if a message is sent by an external user
    #   The right bit represents if an item is an IPFS hash of form Qm (sha2-256). This bit is set automatically if there is no metadata sent by the user, but must be set manually if the user sends metadata.
    #       Should this change in the future or you want to do something
    #       different now, you should trigger this flag, but also use custom
    #       metadata to indicate this difference.
    return shift(convert(sender, uint256), 96) + other_metadata

# Functions which feed into check_item_then_iterate_last_item, log.item, and generate_metadata
@private
def send_light_item(reply_to_index: uint256, sender: address, metadata: uint256, light: uint256 = 4):#TODO: Trace metadata through light items
    assert reply_to_index <= self.last_item_index
    self.last_item_index += 1
    self.item_metadata[self.last_item_index] = self.generate_metadata(sender, metadata + light)
    log.item(self.last_item_index)
@private
def send_full_item(item: bytes32, reply_to_index: uint256, sender: address, metadata: uint256):
    self.send_light_item(reply_to_index, sender, metadata, 0)
    self.items[self.last_item_index].reply_to_index = reply_to_index
    self.items[self.last_item_index].item = item

# Functions which feed into send_light_item
@private
def send_light_item_external(reply_to_index: uint256, sender: address, msg_sender: address, metadata: uint256):
    self.external_sender_asserts(msg_sender, sender)
    self.send_light_item(reply_to_index, sender, metadata)
@public
@payable
def send_light_message_user(item: bytes32, reply_to_index: uint256 = 0):
    self.send_light_item(reply_to_index, msg.sender, 0)
@public
@payable
def send_light_hash_user(item: bytes32, reply_to_index: uint256 = 0):
    self.send_light_item(reply_to_index, msg.sender, 1)
@public
@payable
def send_light_item_user_with_metadata(item: bytes32, custom_metadata: uint256, reply_to_index: uint256 = 0):
    self.send_light_item(reply_to_index, msg.sender, self.prep_custom_metadata(custom_metadata))

# Functions which feed into send_full_item
@private
def send_full_item_external(item: bytes32, reply_to_index: uint256, sender: address, msg_sender: address, metadata: uint256):
    self.external_sender_asserts(msg_sender, sender)
    self.send_full_item(item, reply_to_index, sender, metadata + 2)
@public
@payable
def send_full_message_user(item: bytes32, reply_to_index: uint256 = 0):
    self.send_full_item(item, reply_to_index, msg.sender, 0)
@public
@payable
def send_full_hash_user(item: bytes32, reply_to_index: uint256 = 0):
    self.send_full_item(item, reply_to_index, msg.sender, 1)
@public
@payable
def send_full_item_user_with_metadata(item: bytes32, custom_metadata: uint256, reply_to_index: uint256 = 0):
    self.send_full_item(item, reply_to_index, msg.sender, self.prep_custom_metadata(custom_metadata))

# Functions which feed into send_full_item_external
@public
@payable
def send_full_message_external(item: bytes32, sender: address, reply_to_index: uint256 = 0):
    self.send_full_item_external(item, reply_to_index, sender, msg.sender, 0)
@public
@payable
def send_full_hash_external(item: bytes32, sender: address, reply_to_index: uint256 = 0):
    self.send_full_item_external(item, reply_to_index, sender, msg.sender, 1)
@public
@payable
def send_full_item_external_with_metadata(item: bytes32, sender: address, custom_metadata: uint256, reply_to_index: uint256 = 0):
    self.send_full_item_external(item, reply_to_index, sender, msg.sender, self.prep_custom_metadata(custom_metadata))

# Functions which feed into send_light_item_external
@public
@payable
def send_light_message_external(item: bytes32, sender: address, reply_to_index: uint256 = 0):
    self.send_light_item_external(reply_to_index, sender, msg.sender, 0)
@public
@payable
def send_light_hash_external(item: bytes32, sender: address, reply_to_index: uint256 = 0):
    self.send_light_item_external(reply_to_index, sender, msg.sender, 1)
@public
@payable
def send_light_item_external_with_metadata(item: bytes32, sender: address, custom_metadata: uint256, reply_to_index: uint256 = 0):
    self.send_light_item_external(reply_to_index, sender, msg.sender, self.prep_custom_metadata(custom_metadata))

# Editing functions (full items only!) TODO: Check these items with the metadata changes

@private
def edit(new_item: bytes32, item_index: uint256, sender: address):
    assert shift(self.items[item_index].metadata, -96) == convert(sender, uint256)
    self.items[item_index].item = new_item
@private
def edit_with_metadata(new_item: bytes32, item_index: uint256, sender: address, new_metadata: uint256):
    self.edit(new_item, item_index, sender)
    self.items[item_index].metadata = self.generate_metadata(sender, new_metadata)

@public
@payable
def edit_full_item_user_with_metadata(new_item: bytes32, item_index: uint256, new_metadata: uint256, is_hash: bool = False):
    self.edit_with_metadata(new_item, item_index, msg.sender, self.prep_custom_metadata(new_metadata) + convert(is_hash, uint256))
@public
@payable
def edit_full_item_external_with_metadata(new_item: bytes32, item_index: uint256, sender: address, new_metadata: uint256, is_hash: bool = False):
    self.external_sender_asserts(msg.sender, sender)
    self.edit_with_metadata(new_item, item_index, sender, self.prep_custom_metadata(new_metadata) + 2 + convert(is_hash, uint256))
@public
@payable
def edit_full_item_user(new_item: bytes32, item_index: uint256):
    self.edit(new_item, item_index, msg.sender)
@public
@payable
def edit_full_item_external(new_item: bytes32, item_index: uint256, sender: address):
    self.external_sender_asserts(msg.sender, sender)
    self.edit(new_item, item_index, sender)

###   External sender functionality   ###

@public
def authorizeSender(sender: address):
    self.external_sender_authorization[sender][msg.sender] = True

@public
def deauthorizeSender(sender: address):
    self.external_sender_authorization[sender][msg.sender] = False

###   Withdraw donations functionality   ###

@public
def withdraw():
    send(owner, self.balance)
