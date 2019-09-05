item: event({channel_index: indexed(uint256), reply_to_index: indexed(uint256), metadata: indexed(uint256)})
# item_index is the index of the sent item in C.N.

# TODO: Implement channeling

# Channel management
struct channel:
    owner: address
    name_display: bytes32
    name_unique: bytes32 # TODO: finish implementing
    about: bytes32
    css: bytes32
    js: bytes32

channels: map(uint256, channel)
channel_last_opened: public(uint256)

# TODO: Is there functionality which is more core than "reply"

last_item_index: public(uint256)
item_metadata: public(map(uint256, uint256)) # TODO: Check this is implemented correctly

# outer address is the authorizing user

owner: constant(address) = 0xd015FB4e0c7f2D0592fa642189a70ce46C90d612
custom_metadata_mask: constant(uint256) = 2 ** (12*8+1) - 1 - 2 # Fills 12 bytes with F, then sets the second to last bit to 0 TODO: Double check this math
# TODO: Add owner/management functions - most notably update functionality

# Helper methods - used across several disparate paths

@public
@constant
def prep_custom_metadata(custom_metadata: uint256) -> uint256:
    return bitwise_and(custom_metadata, custom_metadata_mask)

@public
@constant
def generate_metadata(sender: address, other_metadata: uint256) -> uint256:
    # Default_metadata is 1 bit.
    #   The right bit represents if an item is an IPFS hash of form Qm (sha2-256). This bit is set automatically if there is no metadata sent by the user, but must be set manually if the user sends metadata.
    #       Should this change in the future or you want to do something
    #       different now, you should trigger this flag, but also use custom
    #       metadata to indicate this difference.
    return shift(convert(sender, uint256), 96) + other_metadata

# Functions which feed into check_item_then_iterate_last_item, log.item, and generate_metadata
@private
def send_item(channel: uint256, reply_to_index: uint256, sender: address, metadata: uint256):
    assert reply_to_index <= self.last_item_index
    self.last_item_index += 1
    self.item_metadata[self.last_item_index] = self.generate_metadata(sender, metadata)
    log.item(channel, reply_to_index, item_metadata[self.last_item_index])

# Functions which feed into send_item
@public
@payable
def send_message_user(item: bytes32, channel: uint256, reply_to_index: uint256 = 0):
    self.send_item(channel, reply_to_index, msg.sender, 0)
@public
@payable
def send_hash_user(item: bytes32, channel: uint256, reply_to_index: uint256 = 0):
    self.send_item(channel, reply_to_index, msg.sender, 1)
@public
@payable
def send_item_user_with_metadata(item: bytes32, channel: uint256, custom_metadata: uint256, reply_to_index: uint256 = 0):
    self.send_item(channel, reply_to_index, msg.sender, self.prep_custom_metadata(custom_metadata))

###   Withdraw donations functionality   ###

@public
def withdraw():
    send(owner, self.balance)
