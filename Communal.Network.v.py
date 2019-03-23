# [[To do - remove sendMessage method for optimization purposes]]

message: event({messageIndex: indexed(uint256), replyToIndex: indexed(uint256), messageInfo: indexed(uint256)})
# messageIndex is the index of the sent message in C.N.
# messageInfo contains, from most significant to least significant bits/bytes:
#       - 20 bytes: the sender address
#       - 1 bit: a flag to indicate the sender was external
# [[Double check!!!]]
messageInfoMask: constant(uint256) = bitwise_not(shift(2**161, 94))

lastMessageNumber: public(uint256)

externalSenderAuthorization: bytes[12][address][address]
# address is the authorizing user
# bytes[12] contains, from most significant to least significant bits/bytes:
#       - 1 bit: authorization
#       - 1 bit: limited message count authorization
#       - 2 bytes: limited message count authorization - remaining messages

# [[DOUBLE CHECK ALL THIS SHIT]]
authorizationBit: constant(uint256) = shift(1, 95)
authorizationBit_inverted: constant(uint256) = bitwise_not(authorizationBit)
authorizationBit_limitedMessages: constant(uint256) = shift(1, 94)
authorizationBit_limitedMessages_inverted: constant(uint256) = bitwise_not(authorizationBit_limitedMessages)
limitedMessageAuthorization_usedBitsMask: constant(uint256) = shift(2**16, 78)
limitedMessageAuthorization_usedBitsMask_inverted: constant(uint256) = bitwise_not(limitedMessageAuthorization_usedBitsMask)

lastMessageNumber: public(uint256)

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
def sendMessageExternalUser(_sender: address, message: bytes[MAX_UINT256], replyToIndex: uint256 = 0, messageInfo: uint256 = 0):
        assert bitwise_and(self.externalSenderAuthorization[msg.sender][_sender], self.authorizationBit) == self.authorizationBit
        if bitwise_and(self.externalSenderAuthorization[msg.sender][_sender], self.authorizationBit_limitedMessages) == self.authorizationBit_limitedMessages:
                assert shift(bitwise_and(self.externalSenderAuthorization[msg.sender][_sender], self.limitedMessageAuthorization_usedBits), -78) > 0
                self.externalSenderAuthorization[msg.sender][_sender] = bitwise_or(bitwise_and(self.externalSenderAuthorization[msg.sender][_sender], \
                                                                                               self.limitedMessageAuthorization_usedBitsMask_inverted), \
                                                                                   bitwise_and(self.externalSenderAuthorization[msg.sender][_sender], \
                                                                                               self.limitedMessageAuthorization_usedBitsMask) \
                                                                                   - shift(1, 78))
        self.sendMessage(_sender, replyToIndex, messageInfo)

@constant
def prepMessageInfo(sender: address, externalSender: bool, extraInfo: uint256):
        return shift(convert(sender, uint256), 96) + shift(convert(externalSender, uint256), 95) + bitwise_and(extraInfo, messageInfoMask)
        

###   External sender functionality   ###

@public
def authorizeSender(sender: address):
        self.externalSenderAuthorization[sender][msg.sender] = bitwise_or(self.externalSenderAuthorization[sender][msg.sender], self.authorizationBit)

@public
def deauthorizeSender(sender: address):
        self.externalSenderAuthorization[sender][msg.sender] = bitwise_and(self.externalSenderAuthorization[sender][msg.sender], self.authorizationBit_inverted)

@public
def limitSenderMessages(sender: address, limit: uint256):
        self.externalSenderAuthorization[sender][msg.sender] = bitwise_or(bitwise_and(self.externalSenderAuthorization[msg.sender][_sender], \
                                                                                      limitedMessageAuthorization_usedBitsMask_inverted), \
                                                                          authorizationBit_limitedMessages + shift(limit,78))

@public
def delimitSenderMessages(sender: address):
        self.externalSenderAuthorization[sender][msg.sender] = bitwise_and(self.externalSenderAuthorization[sender][msg.sender], self.authorizationBit_limitedMessages_inverted)

@public
def authorizeSenderAndLimitMessages(sender: address, limit: uint256):
        self.authorizeSender(sender)
        self.limitSenderMessages(sender, limit)
