message: event({messageIndex: indexed(uint256), sender: indexed(address), messageContent: bytes[32]})

lastMessageNumber: public(uint256)
externalSenderAuthorization: bool[address][address] # bool - T if authorized external sender | address - external address | address - user address

@private
def sendMessage(sender: address, messageContent: bytes[32]):
        log.message(self.lastMessageNumber, sender, messageContent)
        self.lastMessageNumber += 1

@public
@payable
def sendMessageUser(messageString: bytes[32]):
        self.sendMessage(msg.sender, messageString)

@public
@payable
def sendMessageExternalUser(_sender: address, messageString: bytes[32]):
        assert self.externalSenderAuthorization[msg.sender][_sender]
        self.sendMessage(_sender, messageString)

###

@public
def authorizeSender(sender: address):
        self.externalSenderAuthorization[sender][msg.sender] = True

@public
def deauthorizeSender(sender: address):
        self.externalSenderAuthorization[sender][msg.sender] = False
