message: event({messageIndex: indexed(uint256), sender: indexed(address), replyToIndex: indexed(uint256), metadataCode: uint256, messageContent: bytes[128]})

lastMessageNumber: public(uint256)
externalSenderAuthorization: bool[address][address] # bool - T if authorized external sender | address - external address | address - user address

@private
def sendMessage(sender: address, replyToIndex: uint256, messageContent: bytes[32], metadataCode: uint256):
        assert replyToIndex <= self.lastMessageNumber
        log.message(self.lastMessageNumber, sender, replyToIndex, metadataCode, messageContent)
        self.lastMessageNumber += 1

@public
@payable
def sendMessageUser(messageString: bytes[32], replyToIndex: uint256 = 0, metadataCode: uint256 = 0):
        self.sendMessage(msg.sender, replyToIndex, messageString, metadataCode)

@public
@payable
def sendMessageExternalUser(_sender: address, messageString: bytes[32], replyToIndex: uint256 = 0, metadataCode: uint256 = 0):
        assert self.externalSenderAuthorization[msg.sender][_sender]
        self.sendMessage(_sender, replyToIndex, messageString, metadataCode)

###

@public
def authorizeSender(sender: address):
        self.externalSenderAuthorization[sender][msg.sender] = True

@public
def deauthorizeSender(sender: address):
        self.externalSenderAuthorization[sender][msg.sender] = False
