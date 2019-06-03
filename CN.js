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
      js: null, // Loaded via setup_web3
      type: null,
      fallback: {
        provider: null,
        endpoint: null
      }
    },
    abi: null,
    contract: {
      address: null,
      live: null
    },
    items: {
      new: null,
      old: null
    },
    send: {
      message: async function(to_send) {
        if (self.user.account.available) {
          call = self.contract.live.methods.send_light_message_user(self.web3.js.utils.utf8ToHex(to_send));
          call.estimateGas().then(function(gas_estimate) {
            call.send({
              gas: gas_estimate
            });
          });
        } else {
          switch (self.web3.type) {
            case 0:
              //TODO: Break here, no injected web3
            case 2:
              try {
                await ethereum.enable();
              } catch (error) {
                //TODO: check if error is of proper type
                //TODO: Account was not enabled
              }
            case 1:
              accounts = await self.web3.js.eth.getAccounts();
              if (accounts.length != 0) {
                self.user.account.address = accounts[0];
                self.user.account.available = True;
              } else {
                //TODO: Not logged in.
              }
          }
        }
      }
    },
    user: {
      account: {
        available: false,
        address: null
      }
    }
  };
  return self;
})();

// Setting up basic web3 enviroment
window.addEventListener('load', async function() {
  cn.web3 = setup_web3();
  cn.contract.address = await get_contract_address(cn);
  if (cn.contract.address != null) { // TODO: Make these more detailed
    console.log("This network has an official Communal.Network contract on it.");
  } else {
    alert("This network is not officially supported.");
    throw "no cn";
  }
  cn.abi = get_cn_abi("main");
  cn.contract.live = new cn.web3.js.eth.Contract(cn.abi, cn.contract.address); // TODO: Consider options
  cn.items.new = cn.contract.live.events.item(); // TODO: Consider options
  cn.items.old = cn.contract.live.getPastEvents("item"); // TODO: Consider options
  load_feed(cn);
  //TODO: Add a refresh thing when new messages come in
});

function load_feed(cn = window.cn) {
  // TODO: Load feed
}

function load_item_data(item_event_data) { //TODO: Pass needed params
  item_data = {
    item_index: null, //TODO: load from event
    reply_to_index: null, //TODO: Load from event
    metadata: null,
    item: null
  };
  if (is_light(item_event_data)) {
    item_data = add_light_item_data(item_event_data, item_data);
  } else {
    item_data = add_full_item_data(item_event_data, item_data);
  }
  return item_data;
}

function load_light_item_data(item_event_data, item_data) { //TODO: Add params
  // // TODO: load light item
  // Load metadata
  // Load tx
  //  Load message or hash from tx
  return item_data;
}

function load_full_item_data(item_even_data, item_data) {
  // Load item from contract
  // Load metadata from contract
}

function setup_web3(fallback = {
  provider: "infura",
  endpoint: "mainnet.infura.io/v3/c642d10b5ce9473a9d5168cfbe66c708"
}) {
  web3_js = null;
  web3_type = null;
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
function get_cn_abi(type, name = null) {
  //TODO: Load ABI from file
  switch (type) {
    case "main":
      return [{
        "name": "item",
        "inputs": [{
          "type": "uint256",
          "name": "item_index",
          "indexed": true
        }, {
          "type": "uint256",
          "name": "reply_to_index",
          "indexed": true
        }, {
          "type": "uint256",
          "name": "metadata",
          "indexed": true
        }],
        "anonymous": false,
        "type": "event"
      }, {
        "name": "send_light_message_user",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "message"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_light_message_user",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "message"
        }, {
          "type": "uint256",
          "name": "reply_to_index"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_light_hash_user",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "hash"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_light_hash_user",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "hash"
        }, {
          "type": "uint256",
          "name": "reply_to_index"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_light_message_user_with_metadata",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "message"
        }, {
          "type": "uint256",
          "name": "custom_metadata"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_light_message_user_with_metadata",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "message"
        }, {
          "type": "uint256",
          "name": "custom_metadata"
        }, {
          "type": "uint256",
          "name": "reply_to_index"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_light_hash_user_with_metadata",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "hash"
        }, {
          "type": "uint256",
          "name": "custom_metadata"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_light_hash_user_with_metadata",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "hash"
        }, {
          "type": "uint256",
          "name": "custom_metadata"
        }, {
          "type": "uint256",
          "name": "reply_to_index"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_full_message_user",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "message"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_full_message_user",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "message"
        }, {
          "type": "uint256",
          "name": "reply_to_index"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_full_hash_user",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "hash"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_full_hash_user",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "hash"
        }, {
          "type": "uint256",
          "name": "reply_to_index"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_full_message_user_with_metadata",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "message"
        }, {
          "type": "uint256",
          "name": "custom_metadata"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_full_message_user_with_metadata",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "message"
        }, {
          "type": "uint256",
          "name": "custom_metadata"
        }, {
          "type": "uint256",
          "name": "reply_to_index"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_full_hash_user_with_metadata",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "hash"
        }, {
          "type": "uint256",
          "name": "custom_metadata"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_full_hash_user_with_metadata",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "hash"
        }, {
          "type": "uint256",
          "name": "custom_metadata"
        }, {
          "type": "uint256",
          "name": "reply_to_index"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_full_message_external",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "message"
        }, {
          "type": "address",
          "name": "sender"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_full_message_external",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "message"
        }, {
          "type": "address",
          "name": "sender"
        }, {
          "type": "uint256",
          "name": "reply_to_index"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_full_hash_external",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "hash"
        }, {
          "type": "address",
          "name": "sender"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_full_hash_external",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "hash"
        }, {
          "type": "address",
          "name": "sender"
        }, {
          "type": "uint256",
          "name": "reply_to_index"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_full_message_external_with_metadata",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "message"
        }, {
          "type": "address",
          "name": "sender"
        }, {
          "type": "uint256",
          "name": "custom_metadata"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_full_message_external_with_metadata",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "message"
        }, {
          "type": "address",
          "name": "sender"
        }, {
          "type": "uint256",
          "name": "custom_metadata"
        }, {
          "type": "uint256",
          "name": "reply_to_index"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_full_hash_external_with_metadata",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "hash"
        }, {
          "type": "address",
          "name": "sender"
        }, {
          "type": "uint256",
          "name": "custom_metadata"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_full_hash_external_with_metadata",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "hash"
        }, {
          "type": "address",
          "name": "sender"
        }, {
          "type": "uint256",
          "name": "custom_metadata"
        }, {
          "type": "uint256",
          "name": "reply_to_index"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_light_message_external",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "message"
        }, {
          "type": "address",
          "name": "sender"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_light_message_external",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "message"
        }, {
          "type": "address",
          "name": "sender"
        }, {
          "type": "uint256",
          "name": "reply_to_index"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_light_hash_external",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "hash"
        }, {
          "type": "address",
          "name": "sender"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_light_hash_external",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "hash"
        }, {
          "type": "address",
          "name": "sender"
        }, {
          "type": "uint256",
          "name": "reply_to_index"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_light_message_external_with_metadata",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "message"
        }, {
          "type": "address",
          "name": "sender"
        }, {
          "type": "uint256",
          "name": "custom_metadata"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_light_message_external_with_metadata",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "message"
        }, {
          "type": "address",
          "name": "sender"
        }, {
          "type": "uint256",
          "name": "custom_metadata"
        }, {
          "type": "uint256",
          "name": "reply_to_index"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_light_hash_external_with_metadata",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "hash"
        }, {
          "type": "address",
          "name": "sender"
        }, {
          "type": "uint256",
          "name": "custom_metadata"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "send_light_hash_external_with_metadata",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "hash"
        }, {
          "type": "address",
          "name": "sender"
        }, {
          "type": "uint256",
          "name": "custom_metadata"
        }, {
          "type": "uint256",
          "name": "reply_to_index"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "edit_full_item_user_with_metadata",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "new_item"
        }, {
          "type": "uint256",
          "name": "item_index"
        }, {
          "type": "uint256",
          "name": "new_metadata"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "edit_full_item_user_with_metadata",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "new_item"
        }, {
          "type": "uint256",
          "name": "item_index"
        }, {
          "type": "uint256",
          "name": "new_metadata"
        }, {
          "type": "bool",
          "name": "is_hash"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "edit_full_item_external_with_metadata",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "new_item"
        }, {
          "type": "uint256",
          "name": "item_index"
        }, {
          "type": "address",
          "name": "sender"
        }, {
          "type": "uint256",
          "name": "new_metadata"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "edit_full_item_external_with_metadata",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "new_item"
        }, {
          "type": "uint256",
          "name": "item_index"
        }, {
          "type": "address",
          "name": "sender"
        }, {
          "type": "uint256",
          "name": "new_metadata"
        }, {
          "type": "bool",
          "name": "is_hash"
        }],
        "constant": false,
        "payable": true,
        "type": "function"
      }, {
        "name": "edit_full_item_user",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "new_item"
        }, {
          "type": "uint256",
          "name": "item_index"
        }],
        "constant": false,
        "payable": true,
        "type": "function",
        "gas": 37964
      }, {
        "name": "edit_full_item_external",
        "outputs": [],
        "inputs": [{
          "type": "bytes32",
          "name": "new_item"
        }, {
          "type": "uint256",
          "name": "item_index"
        }, {
          "type": "address",
          "name": "sender"
        }],
        "constant": false,
        "payable": true,
        "type": "function",
        "gas": 39055
      }, {
        "name": "authorizeSender",
        "outputs": [],
        "inputs": [{
          "type": "address",
          "name": "sender"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 36457
      }, {
        "name": "deauthorizeSender",
        "outputs": [],
        "inputs": [{
          "type": "address",
          "name": "sender"
        }],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 21487
      }, {
        "name": "withdraw",
        "outputs": [],
        "inputs": [],
        "constant": false,
        "payable": false,
        "type": "function",
        "gas": 36433
      }, {
        "name": "last_item_index",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1473
      }, {
        "name": "items__reply_to_index",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "arg0"
        }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1708
      }, {
        "name": "items__item",
        "outputs": [{
          "type": "bytes32",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "arg0"
        }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1744
      }, {
        "name": "items__metadata",
        "outputs": [{
          "type": "uint256",
          "name": "out"
        }],
        "inputs": [{
          "type": "uint256",
          "name": "arg0"
        }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1774
      }, {
        "name": "external_sender_authorization",
        "outputs": [{
          "type": "bool",
          "name": "out"
        }],
        "inputs": [{
          "type": "address",
          "name": "arg0"
        }, {
          "type": "address",
          "name": "arg1"
        }],
        "constant": true,
        "payable": false,
        "type": "function",
        "gas": 1925
      }];
    default:
      throw "Invalid type";
  }
}

// Checks the network being used, allowing for switching between networks
function get_contract_address(cn = window.cn) {
  return cn.web3.js.eth.net.getId().then(function(netId) {
    network_name = "unknown";
    cn_contract_address = null;
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
        cn_contract_address = "0xFc8703e6BfAc77cDF25736005DcCE4a6c49d415D";
        break;
      case 42:
        network_name = "kovan";
        break;
    }
    return cn_contract_address;
  });
}