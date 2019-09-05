# [[]] module:
# TODO: Explain module

# TODO: Get communal.network interface

###   Favorite Functionality   ###
favorite: event({favoriteBy: indexed(address), messageIndex: indexed(uint256)})
unfavorite: event({unfavoriteBy: indexed(address), messageIndex: indexed(uint256)})

favoritedByUser: bool[uint256][address] #bool - T if favorited, F if not | uint256 - messageIndex | address - user who favorited a given message
# Note that favorite count and messages a user have favorited can be reconstructed using JS copmbined with events

@public
def favoriteMessage(messageIndex: uint256):
        assert messageIndex <= self.CommunalNetwork.getLastMessageNumber()
        assert not self.favoritedByUser[messageIndex][msg.sender]
        self.favoritedByUser[messageIndex][msg.sender] = True
        log.favorite(msg.sender, messageIndex)

@public
def unfavoriteMessage(messageIndex: uint256):
        assert self.favoritedByUser[messageIndex][msg.sender]
        self.favoritedByUser[messageIndex][msg.sender] = False
        log.unfavorite(msg.sender, messageIndex)
