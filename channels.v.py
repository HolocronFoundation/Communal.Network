channeled: event({channel_index: indexed(uint256)})

last_opened_channel: public(uint256)

channel_name_unique: public(map(uint256, bytes32))
name_unique_used: public(map(bytes32, uint256))

channel_name_display: public(map(uint256, bytes32)) # TODO: Replace this with event

channel_owner: public(map(uint256, address))

# TODO: Add channel item

@public
@constant
def check_owner(channel_index: uint256, owner: address):
    assert owner == self.channel_owner[channel_index]

@public
@payable
def open_new_channel_owned(first_owner: address = msg.sender):
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
def change_channel_name_unique(channel_index: uint256, new_name: bytes32):
    self.check_owner(channel_index, msg.sender)
    # TODO: This

@public
@payable
def delete_channel_name_unique(channel_index: uint256):
    self.check_owner(channel_index, msg.sender)
    # TODO: This

@public
@payable
def change_channel_name_display(channel_index: uint256, new_name: bytes32):
    self.check_owner(channel_index, msg.sender)
    # TODO: This
