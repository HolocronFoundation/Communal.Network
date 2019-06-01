item: event({item_index: indexed(uint256), reply_to_index: indexed(uint256), metadata: indexed(bytes32)})
# TODO: Replace item_sender with itemInfo, of the format
#       ADDRESS(20 bytes), isLight(1bit), externalSender(1 bit) <- can be acquired from current functionality
#       isHash(1 bit) <- needs additional functionality
#       OR allow metadata to be customized by users when creating their item
#       OR have 1 byte of default metadata and allow the other 11 to be customized
# item_index is the index of the sent item in C.N.

last_item_index: public(uint256)

# Full item mappings TODO: consider replacing with a struct
item_index_to_reply_to_index: public(map(uint256, uint256))
item_index_to_item: public(map(uint256, bytes32))
item_index_to_metadata: public(map(uint256, bytes32))

# External sender mappings
external_sender_authorization: public(map(address, map(address, bool)))
# outer address is the authorizing user

owner: constant(address) = 0xd015FB4e0c7f2D0592fa642189a70ce46C90d612
custom_metadata_mask: constant(uint256) = 2 ** (12*8+1) - 1 - 7 # Fills 12 bytes with F, then sets the last three bits to 0

# Items

# Helper methods - used across several disparate paths

@private
@constant # TODO: Check if you can do asserts in constants
def external_sender_asserts(msg_sender: address, sender: address):
    assert self.external_sender_authorization[msg_sender][sender]

# TODO - put custom metadata at the top and feed through, remove the other things
# Functions which feed into send_full_item_external
@public
@payable
def send_full_message_external(message: bytes32, reply_to_index: uint256 = 0, sender: address):
    send_full_item_external(message, reply_to_index, sender, msg.sender, 0)
@public
@payable
def send_full_hash_external(hash: bytes32, reply_to_index: uint256 = 0, sender: address):
    send_full_item_external(hash, reply_to_index, sender, msg.sender, 1)

# Functions which feed into send_full_item
@private
def send_full_item_external(item: bytes32, reply_to_index: uint256, sender: address, msg_sender: address, is_hash: bool):
    external_sender_asserts(msg_sender, sender)
    send_full_item(item, reply_to_index, sender, 2, is_hash)
@public
@payable
def send_full_message_user(message: bytes32, reply_to_index: uint256 = 0):
    send_full_item(item, reply_to_index, sender, 0, 0)
@public
@payable
def send_full_hash_user(hash: bytes32, reply_to_index: uint256 = 0):
    send_full_item(item, reply_to_index, sender, 0, 1)

# Functions which feed into send_light_item_external
@public
@payable
def send_light_message_external(message: bytes32, reply_to_index: uint256 = 0, sender: address):
    send_light_item_external(reply_to_index, sender, msg.sender, 0)
@public
@payable
def send_light_hash_external(hash: bytes32, reply_to_index: uint256 = 0, sender: address):
    send_light_item_external(reply_to_index, sender, msg.sender, 1)

# Functions which feed into send_light_item
@private
def send_light_item_external(reply_to_index: uint256, sender: address, msg_sender: address, is_hash: bool):
    external_sender_asserts(msg_sender, sender)
    send_light_item(reply_to_index, sender, 2, is_hash)
@public
@payable
def send_light_message_user(message: bytes32, reply_to_index: uint256 = 0):
    send_light_item(reply_to_index, msg.sender, 0, 0)
@public
@payable
def send_light_hash_user(hash: bytes32, reply_to_index: uint256 = 0):
    send_light_item(reply_to_index, msg.sender, 0, 1)

# Functions which feed into check_item_then_iterate_last_item, log.item, and generate_metadata
@private
def send_light_item(reply_to_index: uint256, sender: address, is_external: bool, is_hash: bool):
    check_item_then_iterate_last_item(reply_to_index)
    log.item(self.last_item_index, reply_to_index, generate_metadata(sender, 4, is_external, is_hash))
@private
def send_full_item(item: bytes32, reply_to_index: uint256, sender: address, is_external: bool, is_hash: bool):
    check_item_then_iterate_last_item(reply_to_index)
    self.item_index_to_metadata[self.last_item_index] = generate_metadata(sender, 0, is_external, is_hash)
    self.item_index_to_reply_to_index[self.last_item_index] = reply_to_index
    self.item_index_to_item[self.last_item_index] = item
    log.item(self.last_item_index, reply_to_index, self.item_index_to_metadata[self.last_item_index])

@private
def check_item_then_iterate_last_item(reply_to_index: uint256):_index_then_log_item
    assert reply_to_index <= self.last_item_index
    self.last_item_index += 1
@private
@constant
def generate_metadata(sender: address, is_light: bool, is_external: bool, is_hash: bool):
    # TODO: Convert sender to uint256
    # TODO: shift sender to leftmost 20 bytes (so you can index from SENDER0000....000 to SENDER1111....1111)
    # TODO: flip rightmost bits based upon is_light, is_external, and is_hash
    return bitwise_shift(convert(),) + is_light + is_external + is_hash
    pass
@private
@constant
def generate_custom_metadata(sender: address, is_light: bool, is_external: bool, is_hash: bool, custom_metadata: uint256):
    return bitwise_or(generate_metadata(sender, is_light, is_external, is_hash), bitwise_and(custom_metadata, custom_metadata_mask))

# Editing functions (full items only!)
# TODO: Update these to take into account hashes
@public
@payable
def edit_full_item_user(new_item: bytes32, item_index: uint256):
    edit(new_item, item_index, msg.sender)
@public
@payable
def edit_full_item_external(new_item: bytes32, item_index: uint256, sender: address):
    external_sender_asserts(msg.sender, sender)
    edit(new_item, item_index, sender)

@private
def edit(new_item: bytes32, item_index: uint256, sender: address):
    # TODO: Asserts
    # TODO: Edit
    pass

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

# TODO: Create send big item contract
# TODO: Check what happens if there is no return
# TODO: Add custom metadata functions
