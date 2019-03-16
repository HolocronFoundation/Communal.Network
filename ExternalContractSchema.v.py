# External contract schema

# [[Replace things with logs]]

# # Commonalities # #

contract CommunalNetwork:
        def getLastMessageNumber() -> uint256: constant
        def getSenderAddress(messageIndex: uint256) -> address: constant

CommunalNetwork: Communal.Network

###   Transfer Functionality   ###

totalAmount: wei_value[uint256]

@public
@payable
def transfer(messageIndex: uint256):
        assert messageIndex <= self.CommunalNetwork.getLastMessageNumber()
        self.totalAmount[messageIndex] += msg.value
        send(self.CommunalNetwork.getSenderAddress(messageIndex), msg.value)

###   Favorite Functionality   ###

favoritedByUser: bool[uint256][address] #bool - T if favorited, F if not | uint256 - messageIndex | address - user who favorited a given message
favoriteCount: uint256[uint256] #uint256 - count | uint256 - messageIndex

@public
def favoriteMessage(messageIndex: uint256):
        assert messageIndex <= self.CommunalNetwork.getLastMessageNumber()
        assert not self.favoritedByUser[messageIndex][msg.sender]
        self.favoritedByUser[messageIndex][msg.sender] = True
        self.favoriteCount[messageIndex] += 1
        self.user[msg.sender].favorites[self.user[msg.sender].numberOfFavorites] = messageIndex #[[work]]
        self.user[msg.sender].numberOfFavorites += 1 #[[work]]

@public
def unfavoriteMessage(messageIndex: uint256):
        assert self.favoritedByUser[messageIndex][msg.sender]
        self.favoritedByUser[messageIndex][msg.sender] = False
        self.favoriteCount[messageIndex] = self.favoriteCount[messageIndex] - 1

###   Verified user Functionality   ###

administrator: address

verifiedUser: bool[address]

@public
def verifyUser(toVerify: address):
        assert msg.sender == self.administrator
        self.verifiedUser[toVerify] = True

@public
def verifyUser(toUnverify: address):
        assert msg.sender == self.administrator
        self.verifiedUser[toVerify] = False

###   Feed Functionality   ###

#   Banning Followers  #

bannedFollowers: bool[address][address]

@public
def banFollower(toBan: address):
        self.bannedFollowers[toBan][msg.sender] = True

@public
def unbanFollower(toUnban: address):
        self.bannedFollowers[tounBan][msg.sender] = False
