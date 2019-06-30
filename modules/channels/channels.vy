# TODO: Potentially subsume into main contract, or have the main contract able to send message then pass through items to modules

channeled: event({channel_index: indexed(uint256)})

last_opened_channel: public(uint256)

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
