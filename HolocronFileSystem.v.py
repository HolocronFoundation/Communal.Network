# Notes:

# External contract:

#               [[Multi file support via external contract]]

#               [[Split out communal network social media aspects as a test/example of external functionality]]

# [[Full audit]]

###   Blank variable for safe comparisons   ###

blankAddress: address

### File structuring   ###

files: public({
        resource: bytes[1024][uint256],
        numberOfFiles: uint256,
        name: uint256, #use file w/ type 0 to store name
        owner: address
} [uint256])
firstOpenFile: public(uint256)
# if owner is blank, then the file with index uint256 can be created by anyone,
# otherwise they can be created by anyone
# Note that you can set this to be a smart contract which can
# allow certain individuals to collectively control a file type,
# or you can use this to create executable rules to determine if
# a file is valid.

# Initial file types: [[need to initialize upon init]]
#       0 - internal names, publicly appendable

## Optional flags
flags: public({
        modifierAddress: address, # if not set, can be anyone #[[Add check for not set address]]
        flagged: bool[uint256], #message, user, or file index
        name: uint256, #use file w/ type 0 to store name
        owner: address
} [uint256]) #flagType
firstOpenFlag: public(uint256)

## Optional counters
counters: public({
        modifierAddress: address, # if not set, can be anyone #[[Add check for not set address]]
        count: uint256[uint256], #message, user, or file index
        name: uint256, #use file w/ type 0 to store name
        owner: address
        # [[Add individual owners
} [uint256]) #flagType
firstOpenCounter: public(uint256)

###   File Functionality   ###

@public
def addFile(file: bytes[1024], fileType: uint256):
        assert fileType < self.firstOpenFile and (self.files[fileType].owner == blankAddress or self.files[fileType].owner == msg.sender)
        self.files[fileType].resource[self.files[fileType].numberOfFiles] = messageString
        self.files[fileType].numberOfFiles += 1

###   Initializing file type   ###

@public
def initializePublicFile(fileName: bytes[1024]) -> uint256:
        self.files[self.firstOpenFile].name = self.files[0].numberOfFiles
        self.addFile(fileName, 0)
        self.firstOpenFile += 1
        return self.firstOpenFile - 1

@public
def initializeControlledFile(fileName: bytes[1024]) -> uint256:
        self.files[self.firstOpenFile].name = self.files[0].numberOfFiles
        self.addFile(fileName, 0)
        self.files[self.firstOpenFile].owner = msg.sender
        self.firstOpenFile += 1
        return self.firstOpenFile - 1

###   Changing file owners   ###

@public
def changeFileOwner(fileIndex: uint256, newOwner: address):
        assert msg.sender == self.files[filesIndex].owner
        self.files[filesIndex].owner = newOwner


###   Flag Functionality   ###

@public
def addFlag(flag: bool, flagType: uint256):
        assert flagType < self.firstOpenFlag and (self.flags[flagType].owner == blankAddress or self.flags[flagType].owner == msg.sender)
        self.files[flagType].resource[self.files[flagType].numberOfFiles] = messageString

###   Initializing flag type   ###

@public
def initializePublicFlag(flagName: bytes[1024]) -> uint256:
        self.flags[self.firstOpenFlag].name = self.files[0].numberOfFiles
        self.addFile(flagName, 0)
        self.firstOpenFlag += 1
        return self.firstOpenFlag - 1

@public
def initializeControlledFlag(fileName: bytes[1024]) -> uint256:
        self.flags[self.firstOpenFlag].name = self.files[0].numberOfFiles
        self.addFile(fileName, 0)
        self.flags[self.firstOpenFlag].owner = msg.sender
        self.firstOpenFlag += 1
        return self.firstOpenFlag - 1

###   Changing flag owners   ###

@public
def changeFlagOwner(flagIndex: uint256, newOwner: address):
        assert msg.sender == self.flags[flagIndex].owner
        self.flags[flagIndex].owner = newOwner


###   Counter Functionality   ###

@public
def addCounter(counter: bool, counterType: uint256):
        assert counterType < self.firstOpenCounter and (self.counters[counterType].owner == blankAddress or self.counters[counterType].owner == msg.sender)
        self.files[counterType].resource[self.files[counterType].numberOfFiles] = messageString

###   Initializing counter type   ###

@public
def initializePublicCounter(counterName: bytes[1024]) -> uint256:
        self.counters[self.firstOpenCounter].name = self.files[0].numberOfFiles
        self.addFile(counterName, 0)
        self.firstOpenCounter += 1
        return self.firstOpenCounter - 1

@public
def initializeControlledCounter(fileName: bytes[1024]) -> uint256:
        self.counters[self.firstOpenCounter].name = self.files[0].numberOfFiles
        self.addFile(fileName, 0)
        self.counters[self.firstOpenCounter].owner = msg.sender
        self.firstOpenCounter += 1
        return self.firstOpenCounter - 1

###   Changing counter owners   ###

@public
def changeCounterOwner(counterIndex: uint256, newOwner: address):
        assert msg.sender == self.counters[counterIndex].owner
        self.counters[counterIndex].owner = newOwner
