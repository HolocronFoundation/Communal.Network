message: event({messageIndex: indexed(uint256), replyToIndex: indexed(uint256), messageInfo: indexed(uint256)})
# messageIndex is the index of the sent message in C.N.
# messageInfo contains, from most significant to least significant bits/bytes:
#       - 20 bytes: the sender address
#       - 1 bit: a flag to indicate the sender was external

lastMessageNumber: public(uint256)
externalSenderAuthorization: bytes[12][address][address]
# address is the authorizing user
# bytes[12] contains, from most significant to least significant bits/bytes:
#       - 1 bit: blanket authorization
#       - 1 bit: limited message count authorization
#       - 2 bytes: limited message count authorization - remaining messages

authorizationBit: constant(uint256) = shift(1, 95)
authorizationBit_inverted: constant(uint256) = bitwise_not(authorizationBit)
authorizationBit_limitedMessages: constant(uint256) = shift(1, 94)
limitedMessageAuthorization_usedBits: constant(uint256) = shift(2**16, 78)

@private
def sendMessage(sender: address, replyToIndex: uint256, messageInfo: uint256):
        assert replyToIndex <= self.lastMessageNumber
        log.message(self.lastMessageNumber, sender, replyToIndex, messageInfo)
        self.lastMessageNumber += 1

@public
@payable
def sendMessageUser(message: bytes[MAX_UINT256], replyToIndex: uint256 = 0, messageInfo: uint256 = 0):
        self.sendMessage(msg.sender, replyToIndex, messageInfo)

@public
@payable
def sendMessageExternalUser(_sender: address, messageString: bytes[MAX_UINT256], replyToIndex: uint256 = 0, messageInfo: uint256 = 0):
        assert bitwise_and(self.externalSenderAuthorization[msg.sender][_sender], self.blanketAuthorizationBit) == self.blanketAuthorizationBit \
               or \
               (bitwise_and(self.externalSenderAuthorization[msg.sender][_sender], self.authorizationBit_limitedMessages) == self.authorizationBit_limitedMessages and  \
                shift(bitwise_and(self.externalSenderAuthorization[msg.sender][_sender], self.limitedMessageAuthorization_usedBits), -78) > 0)     
        self.sendMessage(_sender, replyToIndex, messageInfo)

###   External sender functionality   ###

@public
def authorizeSender_blanket(sender: address):
        self.externalSenderAuthorization[sender][msg.sender] = bitwise_or(self.externalSenderAuthorization[msg.sender], self.blanketAuthorizationBit)

@public
def deauthorizeSender_blanket(sender: address):
        self.externalSenderAuthorization[sender][msg.sender] = bitwise_and(self.externalSenderAuthorization[msg.sender], self.authorizationBit_inverted)


