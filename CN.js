// Current program flow:
//  check web 3 > check_network() > start_communal_network()
//

// TODO: Add send message JS
//    Useful function - fromUtf8, toUtf8
// TODO: Add reply to message JS
// TODO: Sort out getPastEvents

// Globals
// CN
cn = (function() {
  self = {
    web3: {
      js: undefined, // Loaded via setup_web3
      type: undefined,
      fallback: {
        provider: undefined,
        endpoint: undefined
      }
    },
    abi: undefined,
    contract: {
      address: undefined,
      live: undefined
    },
    items: {
      new: {
        subscription: undefined,
        queue: {}
      },
      old: {
        raw: undefined,
        loaded: undefined
      }
    },
    send: {
      message: async function(to_send) {
        // TODO: Check if message is larger than 32 bytes, if so then hash on IPFS
        if (!self.user.account.available) {
          await self.user.account.load();
        }
        if (self.user.account.available) {
          call = self.contract.live.methods.send_message_user(self.web3.js.utils.utf8ToHex(to_send));
          call.estimateGas({
            from: self.user.account.address
          }).then(function(gas_estimate) {
            call.send({
              from: self.user.account.address,
              gas: gas_estimate
            }).on('transactionHash', function(hash) {
              console.log("Item succesfully sent, tx hash: " + hash);
              // TODO: Alert user it has sent succesfully
            }); //TODO: What happens after the send?
          });
        } else {
          throw "No account"; //TODO: Do more here
        }

      }
    },
    user: {
      account: {
        available: false,
        address: undefined,
        load: async function() {
          try {
            switch (self.web3.type) {
              case 0:
                throw "You are not injecting web3!";
              case 2:
                await ethereum.enable();
                /* falls through */
              case 1:
                accounts = await self.web3.js.eth.getAccounts();
                if (accounts.length != 0) {
                  self.user.account.address = accounts[0];
                  self.user.account.available = true;
                } else {
                  throw "You are not logged in!";
                }
                return true;
            }
          } catch (error) {
            // TODO: catch account not enabled
            // TODO: catch not logged in
            // TODO: catch no injected web3
            console.log(error);
            return false;
          }
        }
      }
    },
    decode: {
      metadata: function(to_decode) {
        return to_decode; //TODO: Decode here
      },
      data: function(to_decode, is_hash) { // TODO: Add encoding param (default is utf-8)
        if (is_hash) {
          return to_decode; //TODO: Decode here
        }
        else {
          return self.web3.js.utils.toUtf8(to_decode);
        }
      }
    }
  };
  return self;
})();

// Setting up basic web3 enviroment
window.addEventListener('load', async function() {
  cn.web3 = setup_web3();
  cn.contract.address = await get_contract_address(cn);
  if (cn.contract.address) { // TODO: Make these more detailed
    console.log("This network has an official Communal.Network contract on it.");
  } else {
    alert("This network is not officially supported.");
    throw "no cn";
  }
  cn.abi = get_cn_abi("main");
  cn.contract.live = new cn.web3.js.eth.Contract(cn.abi, cn.contract.address); // TODO: Consider options
  cn.items.new.subscription = cn.contract.live.events.item(); // TODO: Consider options
  abiDecoder.addABI(cn.abi);
  load_old_items(cn);
  //TODO: Add a refresh thing when new messages come in
  load_new_items(cn);
});

async function load_old_items(cn = window.cn) {
  cn.items.old.raw = await cn.contract.live.getPastEvents("item", {filter: {}, fromBlock: 0, toBlock: 'latest'}); // TODO: Consider options, replace fromblock with deployment block
  // TODO: The optimal way to load items once the network gets larger is to load backwards from the most recent block, waiting only for a page worth of items before displaying.
  cn.items.old.loaded = cn.items.old.raw.map(load_item);
}

async function load_item(item_data) {
  item = {
    index: item_data.returnValues.item_index,// TODO: Use to position
    hash: item_data.transactionHash,
    raw: undefined,
    sender: undefined,
    call: undefined,
    is: {
      hash: undefined,
      external: undefined,
      reply: undefined
    },
    metadata: undefined,
    data: undefined
  };
  console.log(item_data);
  console.log(item.index); //TODO: Use to place in a feed
  console.log(item.hash); // TODO: Get the message via loading the tx from the hash; get the metadata from the hash if light; get the reply to index
  item.raw = await cn.web3.js.eth.getTransaction(item.hash);
  item.metadata = cn.decode.metadata(item.call.params.custom_metadata); // TODO: load metadata from updated version
  console.log(item);
  item.sender = item.raw.from; //TODO: Read from metadata
  item.call = abiDecoder.decodeMethod(item.raw.input);
  item.call.params = item.call.params.reduce(function(map, parameters) {
    map[parameters.name] = parameters.value;
    return map;
  }, {});
  item.is.hash = item.call.name.includes("hash");  //TODO: Replace with a metadata read
  item.is.external = item.call.name.includes("external");  //TODO: Replace with a metadata read
  // TODO: Get and check if item is reply
  return item
}

// TODO: Consider a feed that exists across functions, and merges old + new

function load_new_items(cn = window.cn) {
  cn.items.new.subscription.on("data", async function(new_item_data) {
    item = load_item(new_item_data);
    cn.items.new.queue[item.index] = item;
  });
}

function setup_web3(fallback = {
  provider: "infura",
  endpoint: "mainnet.infura.io/v3/c642d10b5ce9473a9d5168cfbe66c708"
}) {
  web3_js = undefined;
  web3_type = undefined;
  if (window.ethereum) {
    web3_js = new Web3(ethereum);
    web3_type = 2;
  } else if (window.web3) {
    web3_js = new Web3(web3.currentProvider);
    web3_type = 1;
  } else {
    web3_js = new Web3(new Web3.providers.HttpProvider(cn.web3.fallback.endpoint));
    web3_type = 0;
  }

  return {
    js: web3_js,
    type: web3_type,
    fallback: fallback
  };
}

// Utility functions
// Get the ABI for the main communal network
function get_cn_abi(type, name = undefined) {
  //TODO: Load ABI from file
  switch (type) {
    case "main":
      return [{"name": "item", "inputs": [{"type": "uint256", "name": "item_index", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "external_sender_asserts", "outputs": [], "inputs": [{"type": "address", "name": "msg_sender"}, {"type": "address", "name": "sender"}], "constant": true, "payable": false, "type": "function", "gas": 888}, {"name": "prep_custom_metadata", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "custom_metadata"}], "constant": true, "payable": false, "type": "function", "gas": 340}, {"name": "generate_metadata", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "sender"}, {"type": "uint256", "name": "other_metadata"}], "constant": true, "payable": false, "type": "function", "gas": 650}, {"name": "send_message_user", "outputs": [], "inputs": [{"type": "bytes32", "name": "item"}], "constant": false, "payable": true, "type": "function"}, {"name": "send_message_user", "outputs": [], "inputs": [{"type": "bytes32", "name": "item"}, {"type": "uint256", "name": "reply_to_index"}], "constant": false, "payable": true, "type": "function"}, {"name": "send_hash_user", "outputs": [], "inputs": [{"type": "bytes32", "name": "item"}], "constant": false, "payable": true, "type": "function"}, {"name": "send_hash_user", "outputs": [], "inputs": [{"type": "bytes32", "name": "item"}, {"type": "uint256", "name": "reply_to_index"}], "constant": false, "payable": true, "type": "function"}, {"name": "send_item_user_with_metadata", "outputs": [], "inputs": [{"type": "bytes32", "name": "item"}, {"type": "uint256", "name": "custom_metadata"}], "constant": false, "payable": true, "type": "function"}, {"name": "send_item_user_with_metadata", "outputs": [], "inputs": [{"type": "bytes32", "name": "item"}, {"type": "uint256", "name": "custom_metadata"}, {"type": "uint256", "name": "reply_to_index"}], "constant": false, "payable": true, "type": "function"}, {"name": "send_message_external", "outputs": [], "inputs": [{"type": "bytes32", "name": "item"}, {"type": "address", "name": "sender"}], "constant": false, "payable": true, "type": "function"}, {"name": "send_message_external", "outputs": [], "inputs": [{"type": "bytes32", "name": "item"}, {"type": "address", "name": "sender"}, {"type": "uint256", "name": "reply_to_index"}], "constant": false, "payable": true, "type": "function"}, {"name": "send_hash_external", "outputs": [], "inputs": [{"type": "bytes32", "name": "item"}, {"type": "address", "name": "sender"}], "constant": false, "payable": true, "type": "function"}, {"name": "send_hash_external", "outputs": [], "inputs": [{"type": "bytes32", "name": "item"}, {"type": "address", "name": "sender"}, {"type": "uint256", "name": "reply_to_index"}], "constant": false, "payable": true, "type": "function"}, {"name": "send_item_external_with_metadata", "outputs": [], "inputs": [{"type": "bytes32", "name": "item"}, {"type": "address", "name": "sender"}, {"type": "uint256", "name": "custom_metadata"}], "constant": false, "payable": true, "type": "function"}, {"name": "send_item_external_with_metadata", "outputs": [], "inputs": [{"type": "bytes32", "name": "item"}, {"type": "address", "name": "sender"}, {"type": "uint256", "name": "custom_metadata"}, {"type": "uint256", "name": "reply_to_index"}], "constant": false, "payable": true, "type": "function"}, {"name": "authorizeSender", "outputs": [], "inputs": [{"type": "address", "name": "sender"}], "constant": false, "payable": false, "type": "function", "gas": 35887}, {"name": "deauthorizeSender", "outputs": [], "inputs": [{"type": "address", "name": "sender"}], "constant": false, "payable": false, "type": "function", "gas": 20917}, {"name": "withdraw", "outputs": [], "inputs": [], "constant": false, "payable": false, "type": "function", "gas": 35863}, {"name": "last_item_index", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 903}, {"name": "item_metadata", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1066}, {"name": "external_sender_authorization", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}, {"type": "address", "name": "arg1"}], "constant": true, "payable": false, "type": "function", "gas": 1295}];
    default:
      throw "Invalid type";
  }
}

// Checks the network being used, allowing for switching between networks
function get_contract_address(cn = window.cn) {
  return cn.web3.js.eth.net.getId().then(function(netId) {
    network_name = "unknown";
    cn_contract_address = undefined;
    switch (netId) {
      case 1:
        network_name = "mainnet";
        break;
      case 2:
        network_name = "morden";
        break;
      case 3:
        network_name = "ropsten";
        break;
      case 4:
        network_name = "rinkeby";
        cn_contract_address = "0x45EBF845781BAa7934C94CeD7bd4b6D9DA75a957";
        break;
      case 42:
        network_name = "kovan";
        break;
    }
    return cn_contract_address;
    //// TODO: Return or remove network_name
  });
}