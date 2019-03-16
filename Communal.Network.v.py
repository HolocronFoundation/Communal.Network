
lastMessageNumber: public(uint256)
externalSenderAuthorization: bool[address][address] # bool - T if authorized external sender | address - external address | address - user address

###   Message Functionality   ###
message: event({messageIndex: indexed(uint256), sender: indexed(address), messageContent: bytes32, additionalMessageContent: bytes32})

@private
def sendMessage(sender: address, messageContent: bytes32, additionalMessageContent: bytes32):
        log.message(self.lastMessageNumber, sender, messageContent, additionalMessageContent)
        self.lastMessageNumber += 1

@public
@payable
def sendMessageUser(messageString: bytes32, additionalMessageContent: bytes32):
        self.sendMessage(msg.sender, messageString, additionalMessageContent)

@public
@payable
def sendMessageExternalUser(_sender: address, messageString: bytes32, additionalMessageContent: bytes32):
        assert self.externalSenderAuthorization[msg.sender][_sender]
        self.sendMessage(_sender, messageString, additionalMessageContent: bytes32)

###

@public
def authorizeSender(sender: address):
        self.externalSenderAuthorization[sender][msg.sender] = True

@public
def deauthorizeSender(sender: address):
        self.externalSenderAuthorization[sender][msg.sender] = False

