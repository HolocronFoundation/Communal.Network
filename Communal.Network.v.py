# TO DO

#               [[Add @ functionality (important for dms, etc.) - could be done by allowing users to initialize a file type?]]

###   External contract info   ###

contract CommunalFileSystem:

###   Blank variables for safe comparisons   ###

blankAddress: address
blankUsername: bytes32

###   Management Addresses   ###

managementAddress: address
backupAddress: address #Allow to change management address but that's it

### Initialization lock   ###

initialized: bool

###   User struct   ###

user: public({
        filings: {
                fileIndices: uint256[uint256],
                numberOfFiles: uint256
        } [uint256],
        username: bytes32,
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

###   Message Struct   ###
lastMessageNumber: public(uint256)
message: public({
        timeSent: timestamp,
        senderAddress: address,
        # The byte string filing index
        resourceIndex: uint256,
        fileType: uint256
} [uint256])

###   Deactivation functionality   ###

@public
def deactivateAccount():
        self.user[msg.sender].deactivated = True

@public
def reactivateAccount():
        self.user[msg.sender].deactivated = False

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

###   Banning followers   ###

@public
def banFollower(toBan: address):
        self.user[msg.sender].banned[toBan] = True

@public
def unbanFollower(toUnban: address):
        self.user[msg.sender].banned[toUnban] = False

###   Username functionality   ###

usernameToAddress: public(address[bytes32])

@public
@payable
def claimUsername(username: bytes32):
	assert self.usernameToAddress[username] == self.blankAddress and self.user[msg.sender].username == self.blankUsername
	self.usernameToAddress[username] = msg.sender
	self.user[msg.sender].username = username

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

###   Deleting Functionality   ###

@public
def deleteMessage(messageIndex: uint256):
	assert msg.sender == self.message[messageIndex].senderAddress
	self.message[messageIndex].deleted = True

@public
def undeleteMessage(messageIndex: uint256):
	assert msg.sender == self.message[messageIndex].senderAddress
	self.message[messageIndex].deleted = False

###   Display name functionality   ###

@public
@payable
def setDisplayname(displayname: bytes[1024]):
        self.sendMessage(msg.sender, displayname, 0, 0)
        self.user[msg.sender].displayName = self.lastMessageNumber

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


#[[Rethink this]]
@public
def unRemessage(messageIndex: uint256):
        # Pulls the original message index in case the remessage is a remessage of a remessage
        _messageIndex: uint256 = messageIndex
        if self.message[_messageIndex].originalIndex != 0:
                _messageIndex = self.message[_messageIndex].originalIndex
        self.message[self.user[msg.sender].originalToRemessage[_messageIndex]].deleted = True
        self.message[_messageIndex].remessageCount = self.message[_messageIndex].remessageCount - 1

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

###   Transfer Functionality   ###

@public
@payable
def transfer(messageIndex: uint256):
        assert messageIndex <= self.lastMessageNumber
        self.message[messageIndex].totalAmount += msg.value
        send(self.message[messageIndex].senderAddress, msg.value)

###   Message Functionality   ###

@public
def sendMessage(sender: address, messageString: bytes[1024], replyToIndex: uint256, fileType: uint256):
        # [[Add asserts for fileType]]
        #Message stuff
        self.lastMessageNumber += 1
        self.message[self.lastMessageNumber].resourceIndex = self.filing[fileType].numberOfFiles
        self.filing[fileType].resource[self.filing[fileType].numberOfFiles] = messageString #[[Replace w/ external call]]
        self.filing[fileType].numberOfFiles += 1 #[[Replace w/ external call]]
        self.message[self.lastMessageNumber].timeSent = block.timestamp
        self.message[self.lastMessageNumber].senderAddress = sender
        self.message[self.lastMessageNumber].fileType = fileType
        if replyToIndex != 0:
                self.message[self.lastMessageNumber].replyToIndex = replyToIndex
                self.message[replyToIndex].numberOfReplies += 1
                self.message[replyToIndex].replyIndex[self.message[replyToIndex].numberOfReplies] = self.lastMessageNumber
        #User Stuff
        self.addressFilings[sender].filings[fileType].fileIndices[self.user[sender].filings[fileType].numberOfFiles] = self.lastMessageNumber # [[REWORK]]
        self.addressFilings[sender].filings[fileType].numberOfFiles += 1 #[[REWORK]]

## Initial counts: [[need to initialize upon init]] [[need to create creation function]] [[***need to secure]]
##### Messages
#### Favorite functionality
### messageFavoriteCount - 0 modifierRule: only changed via specific contract call
#### Adding replies functionality
### messageNumberOfReplies - 1 modifierRule: only changed via specific contract call
### messageReplyIndex - 2 modifierRule: only changed via specific contract call
#### Remessage functionality
### messageOriginalIndex - 3 modifierRule: only changed via specific contract call # if originalIndex is not set, then it's not a remessage, otherwise it's a remessage
### messageRemessageCount - 4 modifierRule: only changed via specific contract call
#### Being a reply functionality
### messageReplyToIndex - 5 # Reply: if replyToIndex is 0, then it's not a reply, otherwise it's a reply
#### Transfer functionality
### messageTotalAmount - 6 modifierRule: only changed via specific contract call
##### Users
### userNumberUnfollowers - 7 modifierRule: only changed via specific contract call
### userNumberFollowers - 8 modifierRule: only changed via specific contract call
### userNumberFollowed - 9 modifierRule: only changed via specific contract call
### userNumberUnfollowed - 10 modifierRule: only changed via specific contract call
### userNumberOfFavorites - 11 modifierRule: only changed via specific contract call
### userDisplayName - 12 modifierRule: only user can change

## Initial flags: [[need to initialize upon init]] [[need to create creation function]] [[***need to secure]]
#### Messages
### message "deleted" - 0 modifierRule: only owner can change
### message "banned" - 1 modifierRule: only contract manager can change
### message "mature" - 2 modifierRule: only owner can change
#### Users
### user deactivated - 3 modifierRule: only user can change
### user "banned" - 4 modifierRule: only contract manager can change
### user verified - 5 modifierRule: only contract manager can change
