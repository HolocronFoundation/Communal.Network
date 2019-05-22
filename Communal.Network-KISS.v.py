message: event({messageIndex: indexed(uint256), replyToIndex: indexed(uint256), messageSender: indexed(address)})
# messageIndex is the index of the sent message in C.N.

lastMessageNumber: public(uint256)

externalSenderAuthorization: map(address, map(address, bool))
# outer address is the authorizing user

owner: constant(address) = 0xd015FB4e0c7f2D0592fa642189a70ce46C90d612

@public
@payable
def sendMessageUser(message: bytes[256], replyToIndex: uint256 = 0, messageInfo: uint256 = 0):
        assert replyToIndex <= self.lastMessageNumber
        log.message(self.lastMessageNumber, replyToIndex, msg.sender)
        self.lastMessageNumber += 1

@public
@payable
def sendMessageExternalUser(_sender: address, message: bytes[256], replyToIndex: uint256 = 0, messageInfo: uint256 = 0):
        assert replyToIndex <= self.lastMessageNumber and self.externalSenderAuthorization[msg.sender][_sender]
        log.message(self.lastMessageNumber, replyToIndex, _sender)
        self.lastMessageNumber += 1

###   External sender functionality   ###

@public
def authorizeSender(sender: address):
        self.externalSenderAuthorization[sender][msg.sender] = True

@public
def deauthorizeSender(sender: address):
        self.externalSenderAuthorization[sender][msg.sender] = False

###   Withdraw donations functionality   ###

@public
def withdraw():
        send(owner, self.balance)
