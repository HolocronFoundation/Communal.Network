# Notes:

# External contract:

#               [[Multi file support via external contract]]

#               [[Split out communal network social media aspects as a test/example of external functionality]]

# [[Full audit]]

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
#       0 - names, or anything really
#       1 - Communal.network messages

############################# [[Add ownership to flags]]

## Optional flags
flags: public({
        modifierRules: [[]],
        flagged: bool[uint256], #message, user, or file index
        flagName: uint256 #use filing w/ type 0 to store name
} [uint256]) #flagType

## Optional counters
counters: public({
        count: uint256[uint256], #message, user, or file index
        countName: uint256 #use filing w/ type 0 to store name
} [uint256]) #flagType

###   Message Functionality   ###

@public
def addFile(file: bytes[1024], fileType: uint256):
        # [[Add asserts for fileType]]
        self.filing[fileType].resource[self.filing[fileType].numberOfFiles] = messageString
        self.filing[fileType].numberOfFiles += 1

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

