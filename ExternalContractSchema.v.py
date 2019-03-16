# External contract schema

# [[Replace things with logs]]

# # Commonalities # #

contract CommunalNetwork:
        def getLastMessageNumber() -> uint256: constant
        def getSenderAddress(messageIndex: uint256) -> address: constant

CommunalNetwork: Communal.Network

###   Username functionality   ###
addressToUsername: public(bytes32[address])
usernameToAddress: public(address[bytes32])

@public
@payable
def claimUsername(username: bytes32):
	assert self.usernameToAddress[username] == ZERO_ADDRESS
	self.usernameToAddress[username] = msg.sender
	if self.addressToUsername[msg.sender] != ZERO_ADDRESS:
                self.usernameToAddress[self.addressToUsername[msg.sender]] = ZERO_ADDRESS
	self.addressToUsername[msg.sender] = username

###   Display name functionality   ###

# [[To fix]]

@public
@payable
def setDisplayname(displayname: bytes[1024]):
        self.sendMessage(msg.sender, displayname, 0, 1)
        self.user[msg.sender].displayName = self.lastMessageNumber

###   Deactivation functionality   ###

deactivated: bool[address]

@public
def deactivateAccount():
        self.deactivated[msg.sender] = True

@public
def reactivateAccount():
        self.deactivated[msg.sender] = False

###   Transfer Functionality   ###
transfer: event({sender: indexed(address), messageIndex: indexed(uint256), amount: wei_value})

@public
@payable
def transfer(messageIndex: uint256):
        assert messageIndex <= self.CommunalNetwork.getLastMessageNumber()
        send(self.CommunalNetwork.getSenderAddress(messageIndex), msg.value)

###   Deleting Functionality   ###
deleted: bool[uint256] # bool - deleted | uint256 - message index

@public
def deleteMessage(messageIndex: uint256):
	assert msg.sender == getSenderAddress(messageIndex)
	self.deleted[messageIndex] = True

@public
def undeleteMessage(messageIndex: uint256):
	assert msg.sender == getSenderAddress(messageIndex)
	self.deleted[messageIndex] = False

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

###   Verified user Functionality   ###
verify: event({verifiedBy: indexed(address), user: indexed(address)})
unverify: event({unverifiedBy: indexed(address), user: indexed(address)})

verifiedByUser: bool[address][address] #bool - T if verified, F if not | address - user who was verified | address - user who verified a user

@public
def verifyUser(toVerify: address):
        assert not self.verifiedByUser[toVerify][msg.sender]
        self.verifiedByUser[toVerify][msg.sender] = True
        log.verify(msg.sender, messageIndex)

@public
def unverifyUser(toUnverify: address):
        assert self.verifiedByUser[toVerify][msg.sender]
        self.verifiedByUser[toVerify][msg.sender] = False
        log.unverify(msg.sender, messageIndex)

###   Banning Message Functionality   ###
messageBanned: event({bannedBy: indexed(address), message: indexed(uint256)})
messageUnbanned: event({unbannedBy: indexed(address), message: indexed(uint256)})

messageBannedByUser: bool[uint256][address] #bool - T if verified, F if not | uint256 - message which was banned | address - user who banned a user

@public
def banMessage(messageIndex: uint256):
        assert not self.messageBannedByUser[messageIndex][msg.sender]
	self.messageBannedByUser[messageIndex][msg.sender] = True
	log.messageBanned(msg.sender, messageIndex)

@public
def unbanMessage(messageIndex: uint256):
        assert self.messageBannedByUser[messageIndex][msg.sender]
	self.messageBannedByUser[messageIndex][msg.sender] = False
	log.messageUnbanned(msg.sender, messageIndex)

###   Mature/NSFW Functionality   ###

# [[To do]]

###   Feed Functionality   ###

#   Banning Followers  #

bannedFollowers: bool[address][address]

@public
def banFollower(toBan: address):
        assert not self.bannedFollowers[toBan][msg.sender]
        self.bannedFollowers[toBan][msg.sender] = True

@public
def unbanFollower(toUnban: address):
        assert self.bannedFollowers[toBan][msg.sender]
        self.bannedFollowers[tounBan][msg.sender] = False
