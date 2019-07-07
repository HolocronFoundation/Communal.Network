item: event({item_index: indexed(uint256)})
# item_index is the index of the sent item in C.N.

last_item_index: public(uint256)
item_metadata: public(map(uint256, uint256)) # TODO: Check this is implemented correctly

# External sender mappings
external_sender_authorization: public(map(address, map(address, bool)))
# outer address is the authorizing user

owner: constant(address) = 0xd015FB4e0c7f2D0592fa642189a70ce46C90d612
custom_metadata_mask: constant(uint256) = 2 ** (12*8+1) - 1 - 6 # Fills 12 bytes with F, then sets the last third and second to last bits to 0 TODO: Double check this math
# TODO: Add owner/management functions - most notably update functionality

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
def send_item(reply_to_index: uint256, sender: address, metadata: uint256, light: uint256 = 4):#TODO: Trace metadata through light items
    assert reply_to_index <= self.last_item_index
    self.last_item_index += 1
    self.item_metadata[self.last_item_index] = self.generate_metadata(sender, metadata + light)
    log.item(self.last_item_index)

# Functions which feed into send_item
@private
def send_item_external(reply_to_index: uint256, sender: address, msg_sender: address, metadata: uint256):
    self.external_sender_asserts(msg_sender, sender)
    self.send_item(reply_to_index, sender, metadata)
@public
@payable
def send_message_user(item: bytes32, reply_to_index: uint256 = 0):
    self.send_item(reply_to_index, msg.sender, 0)
@public
@payable
def send_hash_user(item: bytes32, reply_to_index: uint256 = 0):
    self.send_item(reply_to_index, msg.sender, 1)
@public
@payable
def send_item_user_with_metadata(item: bytes32, custom_metadata: uint256, reply_to_index: uint256 = 0):
    self.send_item(reply_to_index, msg.sender, self.prep_custom_metadata(custom_metadata))

# Functions which feed into send_item_external
@public
@payable
def send_message_external(item: bytes32, sender: address, reply_to_index: uint256 = 0):
    self.send_item_external(reply_to_index, sender, msg.sender, 0)
@public
@payable
def send_hash_external(item: bytes32, sender: address, reply_to_index: uint256 = 0):
    self.send_item_external(reply_to_index, sender, msg.sender, 1)
@public
@payable
def send_item_external_with_metadata(item: bytes32, sender: address, custom_metadata: uint256, reply_to_index: uint256 = 0):
    self.send_item_external(reply_to_index, sender, msg.sender, self.prep_custom_metadata(custom_metadata))

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
