# Notes:

# External contract:

#               [[Add @ functionality (important for dms, etc.) - could be done by allowing users to initialize a file type?]]

#               [[Multi file support via external contract]]

# [[Full audit]]

###   Management Addresses   ###
managementAddress: address
backupAddress: address #Allow to change management address but that's it

initialized: bool

externalSenderAuthorization: bool[address]

###   Blank variables for safe comparisons   ###

blankAddress: address
blankUsername: bytes32

### File structuring   ###

filing: public({
        resource: bytes[1024][uint256],
        numberOfFiles: uint256,
        fileTypeName: uint256 #use filing w/ type 0 to store name
} [uint256])
firstOpenFiling: public(uint256)

# if blank, then the filings with index uint256 can be created by anyone,
# otherwise they can be created by anyone
# Note that you can set this to be a smart contract which can
# allow certain individuals to collectively control a filing,
# or you can use this to create executable rules to determine if
# a filing is valid.
filingOwner: public(address[uint256])

# Initial file types: [[need to initialize upon init]]
#       0 - names (filing and user names)
#       1 - Communal.network messages

###   Message Struct   ###
lastMessageNumber: public(uint256)
message: public({
        timeSent: timestamp,
        senderAddress: address,
        # The byte string filing index
        resourceIndex: uint256,
        fileType: uint256
} [uint256])
## Optional flags
flags: public({
        flagged: bool[uint256],
        flagName: uint256 #use filing w/ type 0 to store name
} [uint256])
## Initial flags: [[need to initialize upon init]]
#### Messages
### message "deleted" - 0
### message "banned" - 1
### message "mature" - 2
#### Users
### user deactivated - 3
### user "banned" - 4
### user verified - 5

## Optional message counters
counters: public({
        count: uint256[uint256],
        countName: uint256 #use filing w/ type 0 to store name
} [uint256])
## Initial counts: [[need to initialize upon init]]
##### Messages
#### Favorite functionality
### messageFavoriteCount - 0
#### Adding replies functionality
### messageNumberOfReplies - 1
### messageReplyIndex - 2
#### Remessage functionality
### messageOriginalIndex - 3 # if originalIndex is not set, then it's not a remessage, otherwise it's a remessage
### messageRemessageCount - 4
#### Being a reply functionality
### messageReplyToIndex - 5 # Reply: if replyToIndex is 0, then it's not a reply, otherwise it's a reply
#### Transfer functionality
### messageTotalAmount - 6
##### Users
### userNumberUnfollowers - 7
### userNumberFollowers - 8
### userNumberFollowed - 9
### userNumberUnfollowed - 10
### userNumberOfFavorites - 11
### userDisplayName - 12

###   User Struct   ###

user: public({
        username: bytes32,
        autoBan: bool,
        # Filing functionality
        filings: {
                fileIndices: uint256[uint256],
                numberOfFiles: uint256
        } [uint256],
        # Remessage functionality
        originalToRemessage: uint256[uint256],
        # Favorite Functionality
        favorites: uint256[uint256],
        currentlyFavorited: bool[uint256],
        # The people this user is following
        following: address[uint256],
        currentlyFollowing: bool[address],
        # The people following this user
        followers: address[uint256],
        currentlyFollower: bool[address]
} [address])

###      ###

usernameToAddress: public(address[bytes32])

@public
def authorizeSender(sender: address):
        assert msg.sender == self.managementAddress
        self.externalSenderAuthorization[sender] = True

@public
def deauthorizeSender(sender: address):
        assert msg.sender == self.managementAddress
        self.externalSenderAuthorization[sender] = False

###   Banning   ###

@public
def banFollower(toBan: address):
        self.user[msg.sender].banned[toBan] = True

@public
def unbanFollower(toUnban: address):
        self.user[msg.sender].banned[toUnban] = False

###   Favorite Functionality   ###

@public
def favoriteMessage(messageIndex: uint256):
        assert not self.user[msg.sender].currentlyFavorited[messageIndex] and messageIndex <= self.lastMessageNumber
        self.user[msg.sender].currentlyFavorited[messageIndex] = True
        self.message[messageIndex].favoriteCount += 1
        self.user[msg.sender].favorites[self.user[msg.sender].numberOfFavorites] = messageIndex
        self.user[msg.sender].numberOfFavorites += 1

@public
def unfavoriteMessage(messageIndex: uint256):
        assert self.user[msg.sender].currentlyFavorited[messageIndex]
        self.user[msg.sender].currentlyFavorited[messageIndex] = False
        self.message[messageIndex].favoriteCount = self.message[messageIndex].favoriteCount - 1

@public
@payable
def claimUsername(username: bytes32):
	assert self.usernameToAddress[username] == self.blankAddress and self.user[msg.sender].username == self.blankUsername
	self.usernameToAddress[username] = msg.sender
	self.user[msg.sender].username = username

###   Deleting Functionality   ###

@public
def deleteMessage(messageIndex: uint256):
	assert msg.sender == self.message[messageIndex].senderAddress
	self.message[messageIndex].deleted = True

@public
def undeleteMessage(messageIndex: uint256):
	assert msg.sender == self.message[messageIndex].senderAddress
	self.message[messageIndex].deleted = False

###   Following functionality   ###

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

###   Banning Functionality   ###

@public
def banMessage(messageIndex: uint256):
	assert msg.sender == self.managementAddress
	self.message[messageIndex].banned = True

@public
def unbanMessage(messageIndex: uint256):
	assert msg.sender == self.managementAddress
	self.message[messageIndex].banned = False

###   Message Functionality   ###

@public
def sendMessage(sender: address, messageString: bytes[1024], replyToIndex: uint256, fileType: uint256):
        # [[Add asserts for fileType]]
        #Message stuff
        self.lastMessageNumber += 1
        self.message[self.lastMessageNumber].resourceIndex = self.filing[fileType].numberOfFiles
        self.filing[fileType].resource[self.filing[fileType].numberOfFiles] = messageString
        self.filing[fileType].numberOfFiles += 1
        self.message[self.lastMessageNumber].timeSent = block.timestamp
        self.message[self.lastMessageNumber].senderAddress = sender
        self.message[self.lastMessageNumber].fileType = fileType
        self.message[self.lastMessageNumber].banned = self.user[sender].autoBan
        if replyToIndex != 0:
                self.message[self.lastMessageNumber].replyToIndex = replyToIndex
                self.message[replyToIndex].numberOfReplies += 1
                self.message[replyToIndex].replyIndex[self.message[replyToIndex].numberOfReplies] = self.lastMessageNumber
        #User Stuff
        self.user[sender].filings[fileType].fileIndices[self.user[sender].filings[fileType].numberOfFiles] = self.lastMessageNumber
        self.user[sender].filings[fileType].numberOfFiles += 1

###   Transfer Functionality   ###

@public
@payable
def transfer(messageIndex: uint256):
        assert messageIndex <= self.lastMessageNumber
        self.message[messageIndex].totalAmount += msg.value
        send(self.message[messageIndex].senderAddress, msg.value)

@public
@payable
def sendMessageEth(messageString: bytes[1024], replyToIndex: uint256, fileType: uint256):
        self.sendMessage(msg.sender, messageString, replyToIndex, fileType)

@public
def sendMessageExternal(_sender: address, messageString: bytes[1024], replyToIndex: uint256, fileType: uint256):
        assert self.externalSenderAuthorization[msg.sender]
        self.sendMessage(_sender, messageString, replyToIndex, fileType)

###   remessage Functionality   ###

@public
@payable
def remessage(messageIndex: uint256):
        # Pulls the original message index in case the remessage is a remessage of a remessage
        _messageIndex: uint256 = messageIndex
        if self.message[_messageIndex].originalIndex != 0:
                _messageIndex = self.message[_messageIndex].originalIndex
        assert not self.message[_messageIndex].deleted and not self.message[_messageIndex].banned
        assert self.user[msg.sender].originalToRemessage[_messageIndex] == 0 or self.message[self.user[msg.sender].originalToRemessage[_messageIndex]].deleted
        self.lastMessageNumber += 1
        self.user[msg.sender].originalToRemessage[_messageIndex] = self.lastMessageNumber
        self.message[self.lastMessageNumber].timeSent = block.timestamp
        self.message[self.lastMessageNumber].senderAddress = msg.sender
        self.message[self.lastMessageNumber].originalIndex = _messageIndex
        self.message[_messageIndex].remessageCount += 1
        self.user[msg.sender].filings[self.message[_messageIndex].fileType].fileIndices[self.user[msg.sender].filings[self.message[_messageIndex].fileType].numberOfFiles] = self.lastMessageNumber
        self.user[msg.sender].filings[self.message[_messageIndex].fileType].numberOfFiles += 1

###   Display name functionality   ###

@public
@payable
def setDisplayname(displayname: bytes[1024]):
        self.sendMessage(msg.sender, displayname, 0, 0)
        self.user[msg.sender].displayName = self.lastMessageNumber


#[[Rethink this]]
@public
def unRemessage(messageIndex: uint256):
        # Pulls the original message index in case the remessage is a remessage of a remessage
        _messageIndex: uint256 = messageIndex
        if self.message[_messageIndex].originalIndex != 0:
                _messageIndex = self.message[_messageIndex].originalIndex
        self.message[self.user[msg.sender].originalToRemessage[_messageIndex]].deleted = True
        self.message[_messageIndex].remessageCount = self.message[_messageIndex].remessageCount - 1
        
###   Deactivation functionality   ###

@public
def deactivateAccount():
        self.user[msg.sender].deactivated = True

@public
def reactivateAccount():
        self.user[msg.sender].deactivated = False

###   Initialization   ###

@public
def __init__():
        assert not self.initialized
        self.managementAddress = 0x877769a9FC3a3154F19270bF951DEa39ef8628Cf
        self.backupAddress = 0x51CE88B114c959aCB729e0a4899E9D9CccEEB69e
        self.initialized = True

###   Management Functions   ###

@public
def changeManagementAddress(newAddress: address):
        assert msg.sender == self.managementAddress or msg.sender == self.backupAddress
        self.managementAddress = newAddress

@public
def changeBackupAddress(newAddress: address):
        assert msg.sender == self.backupAddress
        self.backupAddress = newAddress

### Initializing file type ###

@public
def initializePublicFiling(filingName: bytes[1024]) -> uint256:
        self.sendMessage(msg.sender, filingName, 0, 0)
        self.filing[self.firstOpenFiling].fileTypeName = self.lastMessageNumber
        self.firstOpenFiling += 1
        return self.firstOpenFiling - 1

@public
def initializeControlledFiling(filingName: bytes[1024]) -> uint256:
        self.sendMessage(msg.sender, filingName, 0, 0)
        self.filing[self.firstOpenFiling].fileTypeName = self.lastMessageNumber
        self.filingOwner[self.firstOpenFiling] = msg.sender
        self.firstOpenFiling += 1
        return self.firstOpenFiling - 1

### Changing filing owners ###

@public
def changeFilingOwner(filingIndex: uint256, newOwner: address):
        assert msg.sender == self.filingOwner[filingIndex]
        self.filingOwner[filingIndex] = newOwner

