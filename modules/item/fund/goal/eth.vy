# [[]] module:
# TODO: Explain module

# TODO: Get communal.network interface
# TODO: Add send big message

# # Commonalities # #

contract CommunalNetwork:
        def getLastMessageNumber() -> uint256: constant
        def getSenderAddress(messageIndex: uint256) -> address: constant

CommunalNetwork: Communal.Network

###   Reply functionality   ###

# [[To do]]

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

#   Following functionality   #

# [[REWORK THIS]]

@public
def follow(toFollow: address):
        assert not self.user[msg.sender].currentlyFollowing[toFollow]
        self.user[msg.sender].currentlyFollowing[toFollow] = True
        self.user[msg.sender].following[self.user[msg.sender].numberFollowed] = toFollow
        self.user[msg.sender].numberFollowed += 1
        self.user[toFollow].followers[self.user[toFollow].numberFollowers] = msg.sender
        self.user[toFollow].currentlyFollower[msg.sender] = True
        self.user[toFollow].numberFollowers += 1

@public
def unfollow(toUnfollow: address):
        assert self.user[msg.sender].currentlyFollowing[toUnfollow]
        self.user[msg.sender].currentlyFollowing[toUnfollow] = False
        self.user[msg.sender].numberUnfollowed += 1
        self.user[toUnfollow].currentlyFollower[msg.sender] = False
        self.user[toUnfollow].numberUnfollowers += 1

###   remessage Functionality   ###

# [[REWORK ALL OF THIS]]

@public
@payable
def remessage(messageIndex: uint256):
        # Pulls the original message index in case the remessage is a remessage of a remessage
        _messageIndex: uint256 = messageIndex
        if self.message[_messageIndex].originalIndex != 0:
                _messageIndex = self.message[_messageIndex].originalIndex
        assert not self.message[_messageIndex].deleted and not self.message[_messageIndex].banned #[[deleted no longer exists, neither does banned]]
        assert self.user[msg.sender].originalToRemessage[_messageIndex] == 0 or self.message[self.user[msg.sender].originalToRemessage[_messageIndex]].deleted
        self.lastMessageNumber += 1
        self.user[msg.sender].originalToRemessage[_messageIndex] = self.lastMessageNumber
        self.message[self.lastMessageNumber].timeSent = block.timestamp
        self.message[self.lastMessageNumber].senderAddress = msg.sender
        self.message[self.lastMessageNumber].originalIndex = _messageIndex
        self.message[_messageIndex].remessageCount += 1
        self.user[msg.sender].filings[self.message[_messageIndex].fileType].fileIndices[self.user[msg.sender].filings[self.message[_messageIndex].fileType].numberOfFiles] = self.lastMessageNumber
        self.user[msg.sender].filings[self.message[_messageIndex].fileType].numberOfFiles += 1


#[[Rethink this]]
@public
def unRemessage(messageIndex: uint256):
        # Pulls the original message index in case the remessage is a remessage of a remessage
        _messageIndex: uint256 = messageIndex
        if self.message[_messageIndex].originalIndex != 0:
                _messageIndex = self.message[_messageIndex].originalIndex
        self.message[self.user[msg.sender].originalToRemessage[_messageIndex]].deleted = True #[[deleted no longer exists]]
        self.message[_messageIndex].remessageCount = self.message[_messageIndex].remessageCount - 1
