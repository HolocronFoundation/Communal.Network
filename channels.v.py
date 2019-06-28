channeled: event({channel_index: indexed(uint256)})
channel_name_display: event({channel_index: indexed(uint256), channel_name_display: indexed(bytes32)})

last_opened_channel: public(uint256)

channel_index_to_channel_name_unique: public(map(uint256, bytes32))
channel_name_unique_to_channel_index: public(map(bytes32, uint256))

channel_owner: public(map(uint256, address))

# TODO: Add channel item - think about how this should work - perhaps a helper contract which sends the item, then channels it. Need to make sent items return their index
@public
def channel_item()
# TODO: This
# Check that the item was sent by the sender - need to use external interface

# TODO: Add channel metadata

@public
@constant
def check_owner(channel_index: uint256, owner: address):
    assert owner == self.channel_owner[channel_index]

@public
@payable
def open_new_channel(first_owner: address = msg.sender):
    self.last_opened_channel += 1
    self.channel_owner[self.last_opened_channel] = first_owner

# TODO: Make a channel opening GUI (elsewhere)

@public
@payable
def change_channel_owner(channel_index: uint256, new_owner: address):
    self.check_owner(channel_index, msg.sender)
    self.channel_owner[channel_index] = new_owner

@public
@payable
def change_channel_index_to_channel_name_unique(channel_index: uint256, new_name: bytes32):
    self.check_owner(channel_index, msg.sender)
    assert self.channel_name_unique_to_channel_index(new_name) == 0
    self.channel_name_unique_to_channel_index[self.channel_index_to_channel_name_unique[channel_index]] = 0
    self.channel_index_to_channel_name_unique[channel_index] = new_name
    self.channel_name_unique_to_channel_index[new_name] = channel_index
    # TODO: Check this when less tired

@public
@payable
def delete_channel_index_to_channel_name_unique(channel_index: uint256):
    self.check_owner(channel_index, msg.sender)
    self.channel_name_unique_to_channel_index[self.channel_index_to_channel_name_unique[channel_index]] = 0
    self.channel_index_to_channel_name_unique[channel_index] = EMPTY_BYTES32
    # TODO: Check this when less tired

@public
@payable
def change_channel_name_display(channel_index: uint256, new_name: bytes32):
    self.check_owner(channel_index, msg.sender)
    # TODO: This
