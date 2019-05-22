
// Current program flow:
//  check web 3 > check_network() > start_communal_network()

// Globals
  // web3
    cn_web3 = {
      js: null, // Loaded via // TODO:
      injected_web3: null, // Loaded via // TODO:
      fallback: {
        provider: "infura",
        endpoint: "mainnet.infura.io/v3/c642d10b5ce9473a9d5168cfbe66c708"
      }
    };
  // Ethereum network info
    eth_network = {
      cn_contract_address: null, // Loaded via // TODO:
      name: null // Loaded via // TODO:
    };
  // CN
    cn = {
      abi: null,
      contract: null,
      messages: {
        live: null,
        old: null
      }
    };


// Setting up basic web3 enviroment
  window.addEventListener('load', function() {
    // Checking if web3 has been injected by the browser (Mist/MetaMask)
      if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
          cn_web3.js = new Web3(web3.currentProvider);
          cn_web3.injected_web3 = true;
      } else {
        console.log('No web3? You will be running in read-only mode!');
        // fallback - currently falls back to infura
          cn_web3.js = new Web3(new Web3.providers.HttpProvider(cn_web3.fallback.endpoint));
          cn_web3.injected_web3 = false;
      }
    check_network();
  });

// Checks the network which will be used
  function check_network() {
    eth_network = get_eth_network();
    if (eth_network.cn_contract_address != null){
      console.log("You are using " + eth_network.name + " as your current Ethereum network. This network has an official Communal.Network contract on it.");
      start_communal_network(eth_network);
    } else {
      alert("You are using " + eth_network.name + " as your current Ethereum network. This network is not officially supported, and will not launch.");
      throw "unknown network";
    }
  }

// Starts Communal.Network
  function start_communal_network(eth_network = window.eth_network) {
    cn = load_cn(eth_network);
  }

// Utility functions
  // Get the ABI for the main communal network
    function get_cn_abi(type, name = null) {
      switch (type) {
        case "main":
            return [{"name": "message", "inputs": [{"type": "uint256", "name": "messageIndex", "indexed": true}, {"type": "uint256", "name": "replyToIndex", "indexed": true}, {"type": "address", "name": "messageSender", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "sendMessageUser", "outputs": [], "inputs": [{"type": "bytes", "name": "message"}], "constant": false, "payable": true, "type": "function"}, {"name": "sendMessageUser", "outputs": [], "inputs": [{"type": "bytes", "name": "message"}, {"type": "uint256", "name": "replyToIndex"}], "constant": false, "payable": true, "type": "function"}, {"name": "sendMessageUser", "outputs": [], "inputs": [{"type": "bytes", "name": "message"}, {"type": "uint256", "name": "replyToIndex"}, {"type": "uint256", "name": "messageInfo"}], "constant": false, "payable": true, "type": "function"}, {"name": "sendMessageExternalUser", "outputs": [], "inputs": [{"type": "address", "name": "_sender"}, {"type": "bytes", "name": "message"}], "constant": false, "payable": true, "type": "function"}, {"name": "sendMessageExternalUser", "outputs": [], "inputs": [{"type": "address", "name": "_sender"}, {"type": "bytes", "name": "message"}, {"type": "uint256", "name": "replyToIndex"}], "constant": false, "payable": true, "type": "function"}, {"name": "sendMessageExternalUser", "outputs": [], "inputs": [{"type": "address", "name": "_sender"}, {"type": "bytes", "name": "message"}, {"type": "uint256", "name": "replyToIndex"}, {"type": "uint256", "name": "messageInfo"}], "constant": false, "payable": true, "type": "function"}, {"name": "authorizeSender", "outputs": [], "inputs": [{"type": "address", "name": "sender"}], "constant": false, "payable": false, "type": "function", "gas": 35617}, {"name": "deauthorizeSender", "outputs": [], "inputs": [{"type": "address", "name": "sender"}], "constant": false, "payable": false, "type": "function", "gas": 20647}, {"name": "withdraw", "outputs": [], "inputs": [], "constant": false, "payable": false, "type": "function", "gas": 35593}, {"name": "lastMessageNumber", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 633}];
        default:
          throw "Invalid type";
      }
    }
  // Load Communal Network
    function load_cn(eth_network = window.eth_network){
      abi = get_cn_abi("main");
      contract = new cn_web3.js.eth.Contract(abi, eth_network.cn_contract_address); // TODO: Consider options
      live_subscription = contract.events.message(); // TODO: Consider options
      old_messages = contract.getPastEvents("message"); // TODO: Consider options
      return {
        abi: abi,
        contract: contract,
        messages: {
          live: live_subscription,
          old: old_messages
        }
      };
    }
  // Checks the network being used, allowing for switching between networks
    function get_eth_network() {
      cn_web3.js.version.getNetwork((err, netId) => {
        network_name = "unknown";
        cn_contract_address = null;
        switch (netId) {
          case "1":
            network_name = "mainnet";
            break;
          case "2":
            network_name = "morden";
            break;
          case "3":
            network_name = "ropsten";
            break;
          case "4":
            network_name = "rinkeby";
            cn_contract_address = "0x1635c211354931b4e58CBc359020651BCe8a3621";
            break;
          case "42":
            network_name = "kovan";
            break;
        }
        return {
          cn_contract_address: cn_contract_address,
          name: network_name
        };
      });
    }
