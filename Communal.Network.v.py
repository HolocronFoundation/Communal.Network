# Notes:

# External contract:

#               [[Add ERC 20 support]]
#               - Requires authorized external senders

#               [[Add @ functionality (important for dms, etc.)]]

#               [[Multi file support via external contract]]

# [[Full audit]] functionality

# [[Test - Authorized external sender]]

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
        readableFileType: uint256 #use tweed to store name
} [uint256])

# Initial file types:
#       0 - tweed
#       1 - name (username, whatever)

###   Tweed Struct   ###
lastTweedNumber: public(uint256)
tweed: public({
        deleted: bool, #SPLIT
        banned: bool, #SPLIT
        mature: bool, #SPLIT
        timeSent: timestamp,
        senderAddress: address,
        # The byte string filing index
        resourceIndex: uint256,
        fileType: uint256,
        # Retweed functionality
        originalIndex: uint256, # if originalIndex is 0, then it's not a retweed, otherwise it's a retweed #SPLIT
        reTweedCount: uint256, #SPLIT
        # Reply functionality
        replyToIndex: uint256, # Reply: if replyToIndex is 0, then it's not a reply, otherwise it's a reply #SPLIT
        # Favorite functionality
        favoriteCount: uint256, #SPLIT
        # Dynamic array pointing to tweed index
        numberOfReplies: uint256, #SPLIT
        replyIndex: uint256[uint256], #SPLIT
        # TransferFunctionality
        totalAmount: wei_value #SPLIT
} [uint256])

###   User Struct   ###

user: public({
        username: bytes32,
        displayName: uint256, #use tweed to store name. This is a tweed index.
        autoBan: bool,
        # Filing functionality
        filings: {
                fileIndices: uint256[uint256],
                numberOfFiles: uint256
        } [uint256],
        # Retweed functionality
        originalToRetweed: uint256[uint256],
        # Favorite Functionality
        numberOfFavorites: uint256,
        favorites: uint256[uint256],
        currentlyFavorited: bool[uint256],
        # Deactivation functionality
        deactivated: bool,
        # The people this user is following
        numberFollowed: uint256,
        following: address[uint256],
        numberUnfollowed: uint256,
        currentlyFollowing: bool[address],
        # The people following this user
        numberFollowers: uint256,
        followers: address[uint256],
        numberUnfollowers: uint256,
        currentlyFollower: bool[address],
        # Banning followers
        banned: bool[address], #[[implement]]
        verified: bool
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
def favoriteTweed(tweedIndex: uint256):
        assert not self.user[msg.sender].currentlyFavorited[tweedIndex] and tweedIndex <= self.lastTweedNumber
        self.user[msg.sender].currentlyFavorited[tweedIndex] = True
        self.tweed[tweedIndex].favoriteCount += 1
        self.user[msg.sender].favorites[self.user[msg.sender].numberOfFavorites] = tweedIndex
        self.user[msg.sender].numberOfFavorites += 1

@public
def unfavoriteTweed(tweedIndex: uint256):
        assert self.user[msg.sender].currentlyFavorited[tweedIndex]
        self.user[msg.sender].currentlyFavorited[tweedIndex] = False
        self.tweed[tweedIndex].favoriteCount = self.tweed[tweedIndex].favoriteCount - 1

@public
@payable
def claimUsername(username: bytes32):
	assert self.usernameToAddress[username] == self.blankAddress and self.user[msg.sender].username == self.blankUsername
	self.usernameToAddress[username] = msg.sender
	self.user[msg.sender].username = username

###   Deleting Functionality   ###

@public
def deleteTweed(tweedIndex: uint256):
	assert msg.sender == self.tweed[tweedIndex].senderAddress
	self.tweed[tweedIndex].deleted = True

@public
def undeleteTweed(tweedIndex: uint256):
	assert msg.sender == self.tweed[tweedIndex].senderAddress
	self.tweed[tweedIndex].deleted = False

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
def banTweed(tweedIndex: uint256):
	assert msg.sender == self.managementAddress
	self.tweed[tweedIndex].banned = True

@public
def unbanTweed(tweedIndex: uint256):
	assert msg.sender == self.managementAddress
	self.tweed[tweedIndex].banned = False

###   Tweed Functionality   ###

@private
def sendTweed(sender: address, tweedString: bytes[1024], replyToIndex: uint256, fileType: uint256):
        #Tweed stuff
        self.lastTweedNumber += 1
        self.tweed[self.lastTweedNumber].resourceIndex = self.filing[fileType].numberOfFiles
        self.filing[fileType].resource[self.filing[fileType].numberOfFiles] = tweedString
        self.filing[fileType].numberOfFiles += 1
        self.tweed[self.lastTweedNumber].timeSent = block.timestamp
        self.tweed[self.lastTweedNumber].senderAddress = sender
        self.tweed[self.lastTweedNumber].fileType = fileType
        self.tweed[self.lastTweedNumber].banned = self.user[sender].autoBan
        if replyToIndex != 0:
                self.tweed[self.lastTweedNumber].replyToIndex = replyToIndex
                self.tweed[replyToIndex].numberOfReplies += 1
                self.tweed[replyToIndex].replyIndex[self.tweed[replyToIndex].numberOfReplies] = self.lastTweedNumber
        #User Stuff
        self.user[sender].filings[fileType].fileIndices[self.user[sender].filings[fileType].numberOfFiles] = self.lastTweedNumber
        self.user[sender].filings[fileType].numberOfFiles += 1

###   Transfer Functionality   ###

@public
@payable
def transfer(tweedIndex: uint256):
        assert tweedIndex <= self.lastTweedNumber
        self.tweed[tweedIndex].totalAmount += msg.value
        send(self.tweed[tweedIndex].senderAddress, msg.value)

@public
@payable
def sendTweedEth(tweedString: bytes[1024], replyToIndex: uint256, fileType: uint256):
        self.sendTweed(msg.sender, tweedString, replyToIndex, fileType)

@public
def sendTweedExternal(_sender: address, tweedString: bytes[1024], replyToIndex: uint256, fileType: uint256):
        assert self.externalSenderAuthorization[msg.sender]
        self.sendTweed(_sender, tweedString, replyToIndex, fileType)

###   reTweed Functionality   ###

@public
@payable
def reTweed(tweedIndex: uint256):
        # Pulls the original tweed index in case the retweed is a retweed of a retweed
        _tweedIndex: uint256 = tweedIndex
        if self.tweed[_tweedIndex].originalIndex != 0:
                _tweedIndex = self.tweed[_tweedIndex].originalIndex
        assert not self.tweed[_tweedIndex].deleted and not self.tweed[_tweedIndex].banned
        assert self.user[msg.sender].originalToRetweed[_tweedIndex] == 0 or self.tweed[self.user[msg.sender].originalToRetweed[_tweedIndex]].deleted
        self.lastTweedNumber += 1
        self.user[msg.sender].originalToRetweed[_tweedIndex] = self.lastTweedNumber
        self.tweed[self.lastTweedNumber].timeSent = block.timestamp
        self.tweed[self.lastTweedNumber].senderAddress = msg.sender
        self.tweed[self.lastTweedNumber].originalIndex = _tweedIndex
        self.tweed[_tweedIndex].reTweedCount += 1
        self.user[msg.sender].filings[self.tweed[_tweedIndex].fileType].fileIndices[self.user[msg.sender].filings[self.tweed[_tweedIndex].fileType].numberOfFiles] = self.lastTweedNumber
        self.user[msg.sender].filings[self.tweed[_tweedIndex].fileType].numberOfFiles += 1

###   Display name functionality   ###

@public
@payable
def setDisplayname(displayname: bytes[1024]):
        self.sendTweed(msg.sender, displayname, 0, 1)
        self.user[msg.sender].displayName = self.lastTweedNumber


#[[Rethink this]]
@public
def unReTweed(tweedIndex: uint256):
        # Pulls the original tweed index in case the retweed is a retweed of a retweed
        _tweedIndex: uint256 = tweedIndex
        if self.tweed[_tweedIndex].originalIndex != 0:
                _tweedIndex = self.tweed[_tweedIndex].originalIndex
        self.tweed[self.user[msg.sender].originalToRetweed[_tweedIndex]].deleted = True
        self.tweed[_tweedIndex].reTweedCount = self.tweed[_tweedIndex].reTweedCount - 1
        
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

###   Setting File type names   ###

@public
def setFilename(index: uint256, name: bytes[1024]):
        assert msg.sender == self.managementAddress
        self.sendTweed(msg.sender, name, 0, 1)
        self.filing[index].readableFileType = self.lastTweedNumber

