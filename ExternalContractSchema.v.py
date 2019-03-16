# External contract schema

# # Commonalities # #

contract CommunalNetwork:
        def getLastMessageNumber() -> uint256: constant
        def getSenderAddress(messageIndex: uint256) -> address: constant

CommunalNetwork: Communal.Network

###   Transfer Functionality   ###

totalAmount: wei_value[uint256]

@public
@payable
def transfer(messageIndex: uint256):
        assert messageIndex <= self.CommunalNetwork.getLastMessageNumber()
        self.totalAmount[messageIndex] += msg.value
        send(self.CommunalNetwork.getSenderAddress(messageIndex), msg.value)

