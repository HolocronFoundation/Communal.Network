



# TODO: Add bidding mechanism for unique items (names, channels, channel names)
# TODO: Add channel rent

# TODO: Add channel item - think about how this should work - perhaps a helper contract which sends the item, then channels it. Need to make sent items return their index
@public
def channel_item()
# TODO: This
# Check that the item was sent by the sender - need to use external interface

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
