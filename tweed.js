// JavaScript Document

//[{Add replies and retweeding of retweeds]]

function clearDefaultText(element, defaultText) {
	"use strict";
	if(element.value === defaultText){
		element.value = "";
	}
}

function getMainContractJSON(){
	"use strict";
	return [{"name": "authorizeSender", "outputs": [], "inputs": [{"type": "address", "name": "sender"}], "constant": false, "payable": false, "type": "function", "gas": 35739}, {"name": "deauthorizeSender", "outputs": [], "inputs": [{"type": "address", "name": "sender"}], "constant": false, "payable": false, "type": "function", "gas": 20769}, {"name": "banFollower", "outputs": [], "inputs": [{"type": "address", "name": "toBan"}], "constant": false, "payable": false, "type": "function", "gas": 35695}, {"name": "unbanFollower", "outputs": [], "inputs": [{"type": "address", "name": "toUnban"}], "constant": false, "payable": false, "type": "function", "gas": 20725}, {"name": "favoriteTweed", "outputs": [], "inputs": [{"type": "uint256", "name": "tweedIndex"}], "constant": false, "payable": false, "type": "function", "gas": 144142}, {"name": "unfavoriteTweed", "outputs": [], "inputs": [{"type": "uint256", "name": "tweedIndex"}], "constant": false, "payable": false, "type": "function", "gas": 57460}, {"name": "withdrawSpentFees", "outputs": [], "inputs": [{"type": "uint256", "name": "amount"}], "constant": false, "payable": false, "type": "function", "gas": 71554}, {"name": "withdrawAllSpentFees", "outputs": [], "inputs": [], "constant": false, "payable": false, "type": "function", "gas": 55998}, {"name": "setFee", "outputs": [], "inputs": [{"type": "uint256", "name": "newFee"}], "constant": false, "payable": false, "type": "function", "gas": 35828}, {"name": "claimUsername", "outputs": [], "inputs": [{"type": "bytes32", "name": "username"}], "constant": false, "payable": true, "type": "function", "gas": 72287}, {"name": "deleteTweed", "outputs": [], "inputs": [{"type": "uint256", "name": "tweedIndex"}], "constant": false, "payable": false, "type": "function", "gas": 36271}, {"name": "undeleteTweed", "outputs": [], "inputs": [{"type": "uint256", "name": "tweedIndex"}], "constant": false, "payable": false, "type": "function", "gas": 21301}, {"name": "follow", "outputs": [], "inputs": [{"type": "address", "name": "toFollow"}], "constant": false, "payable": false, "type": "function", "gas": 215212}, {"name": "unfollow", "outputs": [], "inputs": [{"type": "address", "name": "toUnfollow"}], "constant": false, "payable": false, "type": "function", "gas": 113837}, {"name": "banTweed", "outputs": [], "inputs": [{"type": "uint256", "name": "tweedIndex"}], "constant": false, "payable": false, "type": "function", "gas": 36192}, {"name": "unbanTweed", "outputs": [], "inputs": [{"type": "uint256", "name": "tweedIndex"}], "constant": false, "payable": false, "type": "function", "gas": 21222}, {"name": "transfer", "outputs": [], "inputs": [{"type": "uint256", "name": "tweedIndex"}], "constant": false, "payable": true, "type": "function", "gas": 72163}, {"name": "sendTweedEth", "outputs": [], "inputs": [{"type": "bytes", "name": "tweedString"}, {"type": "uint256", "name": "replyToIndex"}, {"type": "uint256", "name": "fileType"}], "constant": false, "payable": true, "type": "function", "gas": 1631804}, {"name": "sendTweedExternal", "outputs": [], "inputs": [{"type": "address", "name": "_sender"}, {"type": "bytes", "name": "tweedString"}, {"type": "uint256", "name": "replyToIndex"}, {"type": "uint256", "name": "fileType"}], "constant": false, "payable": false, "type": "function", "gas": 1595916}, {"name": "reTweed", "outputs": [], "inputs": [{"type": "uint256", "name": "tweedIndex"}], "constant": false, "payable": true, "type": "function", "gas": 327514}, {"name": "setDisplayname", "outputs": [], "inputs": [{"type": "bytes", "name": "displayname"}], "constant": false, "payable": true, "type": "function", "gas": 1667271}, {"name": "unReTweed", "outputs": [], "inputs": [{"type": "uint256", "name": "tweedIndex"}], "constant": false, "payable": false, "type": "function", "gas": 73639}, {"name": "deactivateAccount", "outputs": [], "inputs": [], "constant": false, "payable": false, "type": "function", "gas": 36153}, {"name": "reactivateAccount", "outputs": [], "inputs": [], "constant": false, "payable": false, "type": "function", "gas": 21183}, {"name": "__init__", "outputs": [], "inputs": [], "constant": false, "payable": false, "type": "constructor"}, {"name": "changeManagementAddress", "outputs": [], "inputs": [{"type": "address", "name": "newAddress"}], "constant": false, "payable": false, "type": "function", "gas": 36588}, {"name": "changeBackupAddress", "outputs": [], "inputs": [{"type": "address", "name": "newAddress"}], "constant": false, "payable": false, "type": "function", "gas": 36407}, {"name": "setFilename", "outputs": [], "inputs": [{"type": "uint256", "name": "index"}, {"type": "bytes", "name": "name"}], "constant": false, "payable": false, "type": "function", "gas": 1631387}, {"name": "currentFee", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1323}, {"name": "filing__resource", "outputs": [{"type": "bytes", "name": "out"}], "inputs": [{"type": "uint256", "name": "arg0"}, {"type": "uint256", "name": "arg1"}], "constant": true, "payable": false, "type": "function", "gas": 173022}, {"name": "filing__numberOfFiles", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1588}, {"name": "filing__readableFileType", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1624}, {"name": "lastTweedNumber", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1443}, {"name": "tweed__deleted", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "uint256", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1684}, {"name": "tweed__banned", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "uint256", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1708}, {"name": "tweed__mature", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "uint256", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1744}, {"name": "tweed__timeSent", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1774}, {"name": "tweed__senderAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "uint256", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1804}, {"name": "tweed__resourceIndex", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1834}, {"name": "tweed__fileType", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1864}, {"name": "tweed__originalIndex", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1894}, {"name": "tweed__reTweedCount", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1924}, {"name": "tweed__replyToIndex", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1954}, {"name": "tweed__favoriteCount", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 1984}, {"name": "tweed__numberOfReplies", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 2014}, {"name": "tweed__replyIndex", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "arg0"}, {"type": "uint256", "name": "arg1"}], "constant": true, "payable": false, "type": "function", "gas": 2165}, {"name": "tweed__totalAmount", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 2074}, {"name": "user__username", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 2143}, {"name": "user__displayName", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 2173}, {"name": "user__autoBan", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 2197}, {"name": "user__filings__fileIndices", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}, {"type": "uint256", "name": "arg1"}, {"type": "uint256", "name": "arg2"}], "constant": true, "payable": false, "type": "function", "gas": 2547}, {"name": "user__filings__numberOfFiles", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}, {"type": "uint256", "name": "arg1"}], "constant": true, "payable": false, "type": "function", "gas": 2462}, {"name": "user__originalToRetweed", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}, {"type": "uint256", "name": "arg1"}], "constant": true, "payable": false, "type": "function", "gas": 2414}, {"name": "user__numberOfFavorites", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 2323}, {"name": "user__favorites", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}, {"type": "uint256", "name": "arg1"}], "constant": true, "payable": false, "type": "function", "gas": 2474}, {"name": "user__currentlyFavorited", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}, {"type": "uint256", "name": "arg1"}], "constant": true, "payable": false, "type": "function", "gas": 2504}, {"name": "user__deactivated", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 2413}, {"name": "user__numberFollowed", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 2443}, {"name": "user__following", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}, {"type": "uint256", "name": "arg1"}], "constant": true, "payable": false, "type": "function", "gas": 2594}, {"name": "user__numberUnfollowed", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 2503}, {"name": "user__currentlyFollowing", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}, {"type": "address", "name": "arg1"}], "constant": true, "payable": false, "type": "function", "gas": 2693}, {"name": "user__numberFollowers", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 2563}, {"name": "user__followers", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}, {"type": "uint256", "name": "arg1"}], "constant": true, "payable": false, "type": "function", "gas": 2714}, {"name": "user__numberUnfollowers", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 2623}, {"name": "user__currentlyFollower", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}, {"type": "address", "name": "arg1"}], "constant": true, "payable": false, "type": "function", "gas": 2813}, {"name": "user__banned", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}, {"type": "address", "name": "arg1"}], "constant": true, "payable": false, "type": "function", "gas": 2843}, {"name": "user__verified", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 2713}, {"name": "usernameToAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "bytes32", "name": "arg0"}], "constant": true, "payable": false, "type": "function", "gas": 2626}];
}

function delay(t, v) {
   return new Promise(function(resolve) { 
       setTimeout(resolve.bind(null, v), t)
   });
}

function callAndRetry(toCall, callType='0', retryCount=100){
	return toCall.call().catch(function(error){
		console.log(callType);
		console.log("Caught error when using web3:" + error);
		if(retryCount != 0){
			console.log("Retrying...")
			return delay(500).then(function(){return callAndRetry(toCall, callType, retryCount-1);})
		}
	})
}

var blankBytes32 = "0x0000000000000000000000000000000000000000000000000000000000000000";

mainContractJSON = getMainContractJSON();
mainContractAddress = "0xaA7Ef5950b654F0d79acCA7698b2C971EF824Ff9"; //Mainnet
mainContract = null;

//Variables pulled via calls

var lastTweedNumber = null; //default to something?
var currentFee = null; //defaults to the last sent fee...

var account = null;

async function startApp(page){
	if(userAccountAvailable){
		getaccounts = await window.web3.eth.getAccounts();
		if(getaccounts.length != 0){
			account = getaccounts[0]
		}
		else{
			document.getElementById("settingsDisplay").innerHTML = "<div class=\"center padded textBoxReplacement\">You aren't logged in! Log into an account to change your settings!<\div>";
			document.getElementById("newString").innerHTML = "You aren't logged in! Log in to send a Tweed!";
		}
		var accountInterval = setInterval(function() {
			window.web3.eth.getAccounts().then(function(accounts){
				if(accounts.length == 0){
					userAccountAvailable = false;
				}
				else if (accounts[0] != account) {
					location.reload();
				}
			});
		}, 250);
	}
	else{
		document.getElementById("settingsDisplay").innerHTML = "<div class=\"center padded textBoxReplacement\">You aren't logged in! Log into an account to change your settings!<\div>";
	}
	mainContract = new window.web3.eth.Contract(mainContractJSON, mainContractAddress);
	calls = await Promise.all([callAndRetry(mainContract.methods.lastTweedNumber(), "lastTweedNumber"), callAndRetry(mainContract.methods.currentFee(), "currentFee")]);
	lastTweedNumber = calls[0];
	currentFee = calls[1];
	if(page==null){
		loadGeneralFeed();
	}
	else{
		var pageType = page.substring(0, page.indexOf('-'));
		var pageInfo = page.substring(page.indexOf('-')+1);
		if(pageType == 'user'){
			loadUserPage(pageInfo, true);
		}
		if(pageType == 'about'){
			document.getElementById("aboutText").style.display = "block";
			document.getElementById("newTweed").style.display = "none";
		}
		if(pageType == 'tweed'){
			loadIndividualTweed(pageInfo);
		}
	}
}

function setDisplayName(){
	newName = prompt("Please enter your desired display name:", "");
	newName = window.web3.utils.utf8ToHex(newName);
	mainContract.methods.setDisplayname(newName).estimateGas({
					from: account,
					value: currentFee
				})
		.then(function(gas){
			mainContract.methods.setDisplayname(newName).send(
			{
				from: account,
				value: currentFee,
				gas: gas
			}).on('transactionHash', function(hash){
    			nameSent(hash);
			});
		}
	);
}

function setUsername(){
	newName = prompt("Warning: You can only set your username once! Please enter your desired username (Max 32 Bytes):", "");
	newName = window.web3.utils.utf8ToHex(newName);
	//[{Check if username is in use]]
	mainContract.methods.claimUsername(newName).estimateGas({
					from: account,
					value: currentFee
				})
		.then(function(gas){
			mainContract.methods.claimUsername(newName).send(
			{
				from: account,
				value: currentFee,
				gas: gas
			}).on('transactionHash', function(hash){
    			nameSent(hash);
			});
		}
	);
}

function nameSent(hash){
	alert("Your new name has been sent!");
}

function sendTweed(){
	if(account == null){
		alert("You aren't logged in! Please sign in to an account!")
	}
	else{
		toSend = window.web3.utils.utf8ToHex(document.getElementById("newString").value);
		mainContract.methods.sendTweedEth(toSend, 0, 0).estimateGas({
					from: account,
					value: currentFee
				})
			.then(function(gas){
				mainContract.methods.sendTweedEth(toSend, 0, 0).send(
				{
					from: account,
					gas: gas,
					value: currentFee
				}).on('transactionHash', function(hash){
					tweedSent(hash);
				});
			}
		);
	}
}

function tweedSent(hash){
	document.getElementById("newString").value = "Enter your tweed here!";
	alert("Your tweed was succesfully sent!");
}

var web3Type = null;
var userAccountAvailable = false;

//sets up web3
window.addEventListener('load', async () => {
	
	var url_string = window.location.href;
	var url = new URL(url_string);
	var page = url.searchParams.get("page");
	
    // Modern dapp browsers...
    if (window.ethereum) {
		web3Type = "modern";
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
			userAccountAvailable = true;
			startApp(page);
        } catch (error) {
            userAccountAvailable = false;
			startApp(page);
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
		web3Type = "legacy";
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        userAccountAvailable = true;
		startApp(page);
    }
    // Non-dapp browsers...
    else {
		web3Type = "none";
        noWeb3();
    }
});

function noWeb3(){
	document.body.innerHTML = '<br><br><br>Wow, this is dull... You can\'t connect to the new web.<br>Check out <a href=https://metamask.io/>Metamask</a> on PC<br>or<br><img class="miniLogo" src="Resources/coinbaseWallet.png"> Coinbase Wallet (<a href=https://play.google.com/store/apps/details?id=org.toshi>Android</a> | <a href=https://itunes.apple.com/app/coinbase-wallet/id1278383455?ls=1&mt=8>iOS</a>), <a href=https://www.cipherbrowser.com/>Cipher</a>, or <a href=https://status.im/>Status</a> on mobile.';
	document.body.style.textAlign = "center";
}

async function loadUserPage(userID, isAddress){
	document.getElementById("feed").innerHTML = '';
	var address = userID
	if(!isAddress){
		address = await callAndRetry(mainContract.methods.usernameToAddress(userID), "userNameAdr"); //TEST
	}
	history.pushState(null, '', '/?page=user-' + address);
	var userInfo = await loadUserInfo(address);
	//HTML generation
	var userDiv = document.createElement("div");
	var headed = false;
	if(userInfo[1] != null){
		var h = document.createElement("H1");
    	var displayName = document.createTextNode(window.web3.utils.hexToUtf8(userInfo[1]));
    	h.appendChild(displayName);
		headed = true;
		userDiv.append(h);
	}
	if(userInfo[0] != blankBytes32){
		var toDisplay = '@' +  window.web3.utils.hexToUtf8(userInfo[0])
		var h = document.createElement("H3");
		if(!headed){
			h = document.createElement("H1");
			headed = true;
		}
		var userNameDisplay = document.createTextNode(toDisplay);
    	h.appendChild(userNameDisplay);
		userDiv.append(h);
	}
	var h = document.createElement("H3");
	if(!headed){
		h = document.createElement("H1");
		headed = true;
	}
    var addressDisplay = document.createTextNode(address);
    h.appendChild(addressDisplay);
	userDiv.append(h);
	
	//Follower Count
	var total = userInfo[3] - userInfo[4];
	var totalFollowers = document.createTextNode(total + " Followers")
	h = document.createElement("H3");
	h.appendChild(totalFollowers);
	userDiv.append(h);
	
	//Tweed Count
	var totalTweeds = document.createTextNode(userInfo[2] + " Tweeds")
	h = document.createElement("H3");
	h.appendChild(totalTweeds);
	userDiv.append(h);
	
	userDiv.classList.add('userInfo');
	document.getElementById("feed").append(userDiv);
	loadUserFeed(userID);
}

var num_display = 10

async function loadIndividualTweed(tweedIndex){
	document.getElementById("feed").innerHTML = '';
	var tweed = [loadTweed(tweedIndex, account)];
	checked = await checkTweed(tweedIndex, 0);
	if(!checked){
		document.getElementById("feed").innerHTML = "<h1>Sorry, this Tweed either does not exist, has been deleted, or has been banned from our site.</h1>"
	}
	else{
		results = await Promise.all(tweed);
		populateFeed(results);
	}
}

var num_replies = 5

async function loadReplyFeed(parentDiv, parentIndex, numberToLoad=num_replies, startIndex=-1){
	if(startIndex == -1){
		startIndex = await callAndRetry(mainContract.methods.tweed__numberOfReplies(parentIndex), "replyCount");
	}
	var tweeds = [];
	var tweedsLoaded = 0;
	var nextLoadIndex = startIndex;
	while(tweedsLoaded < numberToLoad && nextLoadIndex > 0){
		checked = await callAndRetry(mainContract.methods.tweed__replyIndex(parentIndex, nextLoadIndex), 1).then(function(tweedIndex){return Promise.all([checkTweed(tweedIndex, 0), tweedIndex]);});
		//[{load a chunk equal to the amount left to load e.g. load ten and then load 10-x more where x is the number that are good]]
		if(checked[0]){
			tweedsLoaded++;
			tweeds.push(loadTweed(checked[1], account));
		}
		nextLoadIndex--;
	}
	results = await Promise.all(tweeds);
	populateFeed(results, parentDiv);
	if(nextLoadIndex != 0){
		var loadMoreDiv = document.createElement("div");
		loadMoreDiv.classList.add("center");
			var loadMore = document.createElement("button");
			loadMore.innerHTML = "Load More!"
			loadMore.onclick = function(){loadMore.outerHTML=''; loadReplyFeed(parentDiv, parentIndex, numberToLoad, nextLoadIndex);}
		loadMoreDiv.appendChild(loadMore);
		parentDiv.appendChild(loadMoreDiv);
	}
}

async function loadGeneralFeed(numberToLoad=num_display, startIndex=lastTweedNumber){
	var tweeds = [];
	var indices = [];
	var tweedsLoaded = 0;
	var nextLoadIndex = startIndex;
	while(tweedsLoaded < numberToLoad && nextLoadIndex > 0){
		checked = await checkTweed(nextLoadIndex, 0);
		//[{load a chunk equal to the amount left to load e.g. load ten and then load 10-x more where x is the number that are good]]
		if(checked){
			indices.push(nextLoadIndex);
			tweedsLoaded++;
			tweeds.push(loadTweed(nextLoadIndex, account));
		}
		nextLoadIndex--;
	}
	results = await Promise.all(tweeds);
	populateFeed(results);
	if(nextLoadIndex != 0){
		var loadMoreDiv = document.createElement("div");
		loadMoreDiv.classList.add("center");
			var loadMore = document.createElement("button");
			loadMore.innerHTML = "Load More!"
			loadMore.onclick = function(){loadMore.outerHTML=''; loadGeneralFeed(numberToLoad, nextLoadIndex);}
		loadMoreDiv.appendChild(loadMore);
		document.getElementById("feed").appendChild(loadMoreDiv);
	}
}

function populateFeed(tweeds, div="feed"){
	if(div == "feed"){
		div = document.getElementById("feed");
	}
	for (var i = 0; i < tweeds.length; i++) {
		loadedTweed = tweeds[i];
		div.appendChild(generateTweedHTML(loadedTweed[0], loadedTweed[1], loadedTweed[2], loadedTweed[3], loadedTweed[4], loadedTweed[5], loadedTweed[6], loadedTweed[7], loadedTweed[8], account, loadedTweed[9], loadedTweed[10], loadedTweed[11], loadedTweed[12]));
	}
}

function checkTweed(tweedIndex, fileType){
	return callAndRetry(mainContract.methods.tweed__originalIndex(tweedIndex), 2).then(function(originalIndex){
		var retweedDeleted = false;
		if(originalIndex == 0){
			originalIndex = tweedIndex;
		}
		else{
			retweedDeleted = callAndRetry(mainContract.methods.tweed__deleted(tweedIndex), 3);
		}
		return Promise.all([
						callAndRetry(mainContract.methods.tweed__deleted(originalIndex), 4),
						callAndRetry(mainContract.methods.tweed__banned(originalIndex), 5),
						callAndRetry(mainContract.methods.tweed__fileType(originalIndex), 6),
						retweedDeleted
					]).then(function(resultsPromise){
						return (!(resultsPromise[0] || resultsPromise[1])) && fileType == resultsPromise[2] && !resultsPromise[3];
					});
	});
}

function checkTweed_user(userAddress, fileIndex, fileType){
	return callAndRetry(mainContract.methods.user__filings__fileIndices(userAddress, 0, fileIndex),7).then(function(tweedIndex){
		return checkTweed(tweedIndex, fileType);
	});
}

function loadTweed(tweedIndex, readerAccount){
	//[[Check local storage for a tweed with tweedIndex, if it is there return it]]
	var localCheck = localStorage.getItem("t"+tweedIndex);
	var loadedTweed = null
	if(localCheck == null){
		loadedTweed = callAndRetry(mainContract.methods.tweed__originalIndex(tweedIndex),8).then(function(originalIndex){
			retweedInfo = []
			if(originalIndex == 0){
				originalIndex = tweedIndex;
			}
			else {
				retweedInfo = [
								callAndRetry(mainContract.methods.tweed__senderAddress(tweedIndex),9).then(function(rawAddress){
									return Promise.all([
										rawAddress,
										callAndRetry(mainContract.methods.user__username(rawAddress),10),
										callAndRetry(mainContract.methods.user__displayName(rawAddress),11).then(function(displaynameIndex){
											return callAndRetry(mainContract.methods.tweed__resourceIndex(displaynameIndex),12).then(function(displayFileIndex){
												return callAndRetry(mainContract.methods.filing__resource(1, displayFileIndex),13);
											});
										}),
										callAndRetry(mainContract.methods.user__currentlyFollowing(readerAccount, rawAddress),14)
									]);
								}),
								callAndRetry(mainContract.methods.tweed__timeSent(tweedIndex),15)
							];
			}

			return Promise.all([
							Promise.all([
								callAndRetry(mainContract.methods.tweed__resourceIndex(originalIndex),16),
								callAndRetry(mainContract.methods.tweed__fileType(originalIndex),17)
							]).then(function(fileDetails){
								return callAndRetry(mainContract.methods.filing__resource(fileDetails[1], fileDetails[0]),18);
							}),
							callAndRetry(mainContract.methods.tweed__senderAddress(originalIndex),19).then(function(rawAddress){
								return Promise.all([
									rawAddress,
									callAndRetry(mainContract.methods.user__username(rawAddress),20),
									callAndRetry(mainContract.methods.user__displayName(rawAddress),21).then(function(displaynameIndex){
										return callAndRetry(mainContract.methods.tweed__resourceIndex(displaynameIndex),22).then(function(displayFileIndex){
												return callAndRetry(mainContract.methods.filing__resource(1, displayFileIndex),23);
										});
									}),
									callAndRetry(mainContract.methods.user__currentlyFollowing(readerAccount, rawAddress),24)
								]);
							}),
							callAndRetry(mainContract.methods.tweed__timeSent(originalIndex),25),
							callAndRetry(mainContract.methods.tweed__favoriteCount(originalIndex),26),
							callAndRetry(mainContract.methods.tweed__reTweedCount(originalIndex),27),
							originalIndex,
							callAndRetry(mainContract.methods.user__currentlyFavorited(readerAccount, originalIndex),28),
							callAndRetry(mainContract.methods.user__originalToRetweed(readerAccount, originalIndex),29).then(function(retweedIndex){
								if(retweedIndex == tweedIndex){
									return true;
								}
								if(retweedIndex == 0){
									return false;
								}
								return callAndRetry(mainContract.methods.tweed__deleted(retweedIndex),30).then(function(deleted){
									return !deleted;
								})
							}),
							Promise.all(retweedInfo),
							callAndRetry(mainContract.methods.tweed__replyToIndex(originalIndex),31),
							tweedIndex,
							callAndRetry(mainContract.methods.tweed__totalAmount(originalIndex),32),
							callAndRetry(mainContract.methods.tweed__numberOfReplies(originalIndex),33)
			]);
		});
	}
	else {
		console.log("Loading portions locally!");
		var localCopy = JSON.parse(localCheck);
		console.log(localCopy);
		var originalIndex = localCopy[5];
			retweedInfo = []
			if(originalIndex != tweedIndex){
				retweedInfo = [
								Promise.all([
									localCopy[8][0][0],
									callAndRetry(mainContract.methods.user__username(localCopy[8][0][0]),10),
									callAndRetry(mainContract.methods.user__displayName(localCopy[8][0][0]),11).then(function(displaynameIndex){
										return callAndRetry(mainContract.methods.tweed__resourceIndex(displaynameIndex),12).then(function(displayFileIndex){
											return callAndRetry(mainContract.methods.filing__resource(1, displayFileIndex),13);
										});
									}),
									callAndRetry(mainContract.methods.user__currentlyFollowing(readerAccount, localCopy[8][0][0]),14)
								]),
								localCopy[8][1]
							];
			}

			loadedTweed = Promise.all([
							localCopy[0],
							Promise.all([
									localCopy[1][0],
									callAndRetry(mainContract.methods.user__username(localCopy[1][0]),20),
									callAndRetry(mainContract.methods.user__displayName(localCopy[1][0]),21).then(function(displaynameIndex){
										return callAndRetry(mainContract.methods.tweed__resourceIndex(displaynameIndex),22).then(function(displayFileIndex){
												return callAndRetry(mainContract.methods.filing__resource(1, displayFileIndex),23);
										});
									}),
									callAndRetry(mainContract.methods.user__currentlyFollowing(readerAccount, localCopy[1][0]),24)
							]),
							localCopy[2],
							callAndRetry(mainContract.methods.tweed__favoriteCount(originalIndex),26),
							callAndRetry(mainContract.methods.tweed__reTweedCount(originalIndex),27),
							originalIndex,
							callAndRetry(mainContract.methods.user__currentlyFavorited(readerAccount, originalIndex),28),
							callAndRetry(mainContract.methods.user__originalToRetweed(readerAccount, originalIndex),29).then(function(retweedIndex){
								if(retweedIndex == tweedIndex){
									return true;
								}
								if(retweedIndex == 0){
									return false;
								}
								return callAndRetry(mainContract.methods.tweed__deleted(retweedIndex),30).then(function(deleted){
									return !deleted;
								})
							}),
							Promise.all(retweedInfo),
							localCopy[9],
							tweedIndex,
							callAndRetry(mainContract.methods.tweed__totalAmount(originalIndex),32),
							callAndRetry(mainContract.methods.tweed__numberOfReplies(originalIndex),33)
			]);
		}
	return loadedTweed.then(function(loadedResults){
		console.log(loadedResults);
		localStorage.setItem('t'+tweedIndex, JSON.stringify(loadedResults));
		return loadedResults;
	});
}

function loadTweed_user(userAddress, fileIndex, readerAccount){
	return callAndRetry(mainContract.methods.user__filings__fileIndices(userAddress, 0, fileIndex),34).then(function(tweedIndex){
		return loadTweed(tweedIndex, readerAccount);
	});
}

var today = new Date();

function selectUserString(sender){
	if(sender[2]!=null){
		if(sender[1] != blankBytes32){
			return window.web3.utils.hexToUtf8(sender[2]).link("javascript:loadUserPage(\"" + sender[1] + "\", false);");
		}
		else{
			return window.web3.utils.hexToUtf8(sender[2]).link("javascript:loadUserPage(\"" + sender[0] + "\", true);");
		}
	}
	else if(sender[1] != blankBytes32){
		return window.web3.utils.hexToUtf8(sender[1]).link("javascript:loadUserPage(\"" + sender[1] + "\", false);");
	}
	return sender[0].link("javascript:loadUserPage(\"" + sender[0] + "\", true);");
}

function parseDate(unixdate){
	if(unixdate.toDateString() !== today.toDateString()){
		if(unixdate.getFullYear() !== today.getFullYear()){
			return unixdate.toLocaleDateString("en-us", {hour: "numeric", minute:"numeric", month: "short", day:"numeric", year:"numeric"});
		}
		else{
			return unixdate.toLocaleDateString("en-us", {hour: "numeric", minute:"numeric", month: "short", day:"numeric"});
		}
	}
	return unixdate.toLocaleDateString("en-us", {hour: "numeric", minute:"numeric"});
}

function displayParentTweed(replyToIndex, parentNode){
	loadTweed(replyToIndex, account).then(function(loadedTweed){
		newNode = generateTweedHTML(loadedTweed[0], loadedTweed[1], loadedTweed[2], loadedTweed[3], loadedTweed[4], loadedTweed[5], loadedTweed[6], loadedTweed[7], loadedTweed[8], account, loadedTweed[9], loadedTweed[10], loadedTweed[11], loadedTweed[12]);
		newNode.classList.add("reply_disp");
		parentNode.insertBefore(newNode, parentNode.childNodes[0]);
	})
}

function loadUserInfo(address){
	return Promise.all([
		callAndRetry(mainContract.methods.user__username(address),35),
		callAndRetry(mainContract.methods.user__displayName(address),36).then(function(displaynameIndex){
										return callAndRetry(mainContract.methods.tweed__resourceIndex(displaynameIndex),37).then(function(displayFileIndex){
											return callAndRetry(mainContract.methods.filing__resource(1, displayFileIndex),38);
										});
									}),
		callAndRetry(mainContract.methods.user__filings__numberOfFiles(address, 0),39),
		callAndRetry(mainContract.methods.user__numberFollowers(address),40),
		callAndRetry(mainContract.methods.user__numberUnfollowers(address),41)
	])
}

async function loadUserFeed(address, numberToLoad=num_display, nextLoadIndex=lastTweedNumber){
	
	var tweeds = [];
	var tweedsLoaded = 0;
	if(nextLoadIndex == lastTweedNumber){
		var toLoad = await Promise.all([callAndRetry(mainContract.methods.user__filings__numberOfFiles(address, 0)),2222]);
		nextLoadIndex = toLoad[0] - 1;
	}
	while(tweedsLoaded < numberToLoad && nextLoadIndex >= 0){
		checked = await checkTweed_user(address, nextLoadIndex, 0);
		//[{load a chunk equal to the amount left to load e.g. load ten and then load 10-x more where x is the number that are good]]
		if(checked){
			tweedsLoaded++;
			tweeds.push(loadTweed_user(address, nextLoadIndex, account));
		}
		nextLoadIndex--;
	}
	results = await Promise.all(tweeds);
	populateFeed(results);
	
	if(nextLoadIndex >= 0){
		var loadMoreDiv = document.createElement("div");
		loadMoreDiv.classList.add("center");
			var loadMore = document.createElement("button");
			loadMore.innerHTML = "Load More!"
			loadMore.onclick = function(){loadMore.outerHTML=''; loadUserFeed(address, numberToLoad, nextLoadIndex);}
		loadMoreDiv.appendChild(loadMore);
		document.getElementById("feed").appendChild(loadMoreDiv);
	}
}

function generateTweedHTML(tweedString, sender, timeSent, favoriteCount, reTweedCount, tweedIndex, favorited, retweeded, retweederInfo, readerAccount, replyToIndex, fileIndex, ethCount, totalReplies){
	var parent = document.createElement("div");
	parent.classList.add("tweed");
	parent.classList.add(tweedIndex);
	
	if(replyToIndex != 0){
		parent.classList.add("displayReply");
		var replyToText = document.createElement("div");
		replyToText.classList.add("replyToNote");
		replyToText.classList.add("metadata");
		replyToText.innerHTML = "This is a reply. Click to see the original Tweed!";
		replyToText.onclick = function(){
			replyToText.style.visibility = "hidden";
			displayParentTweed(replyToIndex, parent);
		};
		parent.appendChild(replyToText);
		var br = document.createElement("BR");
		parent.appendChild(br);
	}
	
	if(retweederInfo.length != 0){
		retweedText = document.createElement("div");
		retweedText.classList.add("retweedtext");
		retweedText.classList.add("metadata");
		firstText = document.createElement("div");
		firstText.innerHTML = "reTweeded by " + selectUserString(retweederInfo[0]);
		retweedText.appendChild(firstText);
		retweedText.appendChild(genFollowButton(retweederInfo[0][3]), retweederInfo[0][0]);
		secondText = document.createElement("div");
		secondText.innerHTML = "on " + parseDate(new Date(retweederInfo[1]*1000));
		retweedText.appendChild(secondText);
		parent.appendChild(retweedText);
	}
	
	//Adding the text
	tweedText = document.createElement("div");
	tweedText.classList.add("text");
	if(tweedString==null){
		tweedString = "0x";
	}
	//[{Turn image into viewable item with a button}]
	tweedText.innerHTML = anchorme(window.web3.utils.hexToUtf8(tweedString));
	parent.appendChild(tweedText);
	
	//Adding metadata
	metaData = document.createElement("div");
	metaData.classList.add("metadata");
	
	//Sender info
	user = document.createElement("div");
	user.classList.add("user");
	user.innerHTML = "From: " + selectUserString(sender);
	user.appendChild(genFollowButton(sender[3], sender[0]));
	metaData.appendChild(user);
	
	readableDate = parseDate(new Date(timeSent*1000));
	timeNode = document.createElement("div");
	timeNode.classList.add("time");
	timeNode.appendChild(document.createTextNode("Sent: " + readableDate));
	metaData.appendChild(timeNode);
	
	//Favorites!
	favoriteNode = document.createElement("div");
	favoriteNode.classList.add("favorite");
	var img_fav = document.createElement('img');
	img_fav.classList.add("iconUsable");
	img_fav.id = 'img_fav' + tweedIndex;
	if(favorited){
		img_fav.src = "Resources/heartFull.png";
		favoriteNode.onclick = function(){
			unFavoriteTweed(tweedIndex);
		};
	}
	else{
		img_fav.src = "Resources/heartOutline.png";
		favoriteNode.onclick = function(){
			favoriteTweed(tweedIndex);
		};
	}
	favoriteNode.appendChild(img_fav);
	favcounter = document.createElement("div");
	favcounter.innerHTML = ' x ' + favoriteCount;
	favcounter.id = 'favCount' + tweedIndex;
	favoriteNode.appendChild(favcounter);
	metaData.appendChild(favoriteNode);
	
	//reTweeds!
	reTweedNode = document.createElement("div");
	reTweedNode.classList.add("retweed");
	var img_reTweed = document.createElement('img');
	img_reTweed.classList.add("iconUsable")
	img_reTweed.id = 'img_rt' + tweedIndex;
	if(retweeded){
		img_reTweed.src = "Resources/reTweedSent.png";
		reTweedNode.onclick = function(){
			unretweed(tweedIndex);
		};
	}
	else{
		img_reTweed.src = "Resources/reTweed.png";
		reTweedNode.onclick = function(){
			retweed(tweedIndex);
		};
	}
	reTweedNode.appendChild(img_reTweed);
	rtcounter = document.createElement("div");
	rtcounter.innerHTML = ' x ' + reTweedCount;
	rtcounter.id = 'rtCount' + tweedIndex;
	reTweedNode.appendChild(rtcounter);
	metaData.appendChild(reTweedNode);
	
	//ETH Transfer
	var transferNode = document.createElement("div");
	transferNode.classList.add("transfer");
	var img_eth = document.createElement('img');
	img_eth.src = "Resources/eth.png";
	img_eth.classList.add("iconUsable")
	transferNode.appendChild(img_eth);
	transferNode.onclick = function(){
		transfer(tweedIndex, parent);
	}
	ethcounter = document.createElement("div");
	ethCount = web3.utils.fromWei(ethCount);
	if(ethCount.length > 5){
		ethCount = ethCount.substring(0, 5);
	}
	ethString = ' x ' + ethCount;
	ethcounter.innerHTML = ethString;
	ethcounter.id = 'ethCount' + tweedIndex;
	transferNode.appendChild(ethcounter);
	metaData.appendChild(transferNode);
	
	var shareNode = document.createElement("div");
	shareNode.classList.add("share");
	var img_share = document.createElement('img')
	img_share.src = "Resources/share.png";
	img_share.classList.add("iconUsable");
	shareNode.appendChild(img_share);
	shareNode.onclick = function(){
		var shareLink = document.createElement('textarea');
		shareLink.value = "tweed.social/?page=tweed-" + fileIndex;
		document.body.appendChild(shareLink);
		shareLink.select();
		document.execCommand("copy");
		document.body.removeChild(shareLink);
		alert("Copied URL!");
	}
	metaData.append(shareNode);
	
	var replyNode = document.createElement("div");
	replyNode.classList.add("reply");
	var img_reply = document.createElement('img');
	img_reply.src = "Resources/reply.png";
	img_reply.classList.add("iconUsable")
	replyNode.appendChild(img_reply);
	replyNode.onclick = function(){
		img_reply.src = "Resources/cancelReply.png";
		replyIDNode = replyTo(replyNode, img_reply, fileIndex, parent);
		replyNode.onclick = function(){
			hideReply(replyNode, img_reply, replyIDNode, fileIndex, parent);
		}
	}
	metaData.appendChild(replyNode);
	
	if(sender[0] == readerAccount){
		trashNode = document.createElement("div");
		trashNode.classList.add("trash");
		var img_trash = document.createElement('img');
		img_trash.src = "Resources/trash.png";
		img_trash.classList.add("iconUsable")
		trashNode.appendChild(img_trash);
		trashNode.onclick = function(){
			deleteTweed(tweedIndex);
		};
		metaData.appendChild(trashNode);
	}
	
	parent.appendChild(metaData);
	
	if(totalReplies != 0){
		parent.classList.add("displayReplies");
		var repliesText = document.createElement("div");
		repliesText.classList.add("replies");
		repliesText.classList.add("metadata");
		if(totalReplies == 1){
			repliesText.innerHTML = "This Tweed has " + totalReplies + " reply! Click to view it!";
		}
		else{
			repliesText.innerHTML = "This Tweed has " + totalReplies + " replies! Click to view them!";
		}
		repliesText.onclick = function(){
			repliesText.style.visibility = "hidden";
			loadReplyFeed(parent, tweedIndex);
		};
		parent.appendChild(repliesText);
	}
	
	return parent;
}

function hideReply(replyID, img_reply, replyNode, fileIndex, parent){
	replyNode.classList.add("reply_disp_hide");
	window.setTimeout(function(){replyNode.outerHTML='';},1000);
	img_reply.src = "Resources/reply.png";
	replyID.onclick = function(){
		img_reply.src = "Resources/cancelReply.png";
		var replyNode2 = replyTo(replyID, img_reply, fileIndex, parent);
		replyID.onclick = function(){
			hideReply(replyID, img_reply, replyNode2, fileIndex, parent);
		}
	}
}

function genFollowButton(following, address){
	var followUserDiv = document.createElement("div");
	followUserDiv.classList.add("followUser");
	followUserDiv.classList.add("metadata");
	if(!following){
		followUserDiv.innerHTML = "+ Follow";
		followUserDiv.onclick = function(){
			followUser(address, followUserDiv);
		};
	}
	else{
		followUserDiv.innerHTML = "- Follow";
		followUserDiv.onclick = function(){
			unfollowUser(address, followUserDiv);
		};
	}
	return followUserDiv;
}

function followUser(address, div){
	if(account == null){
		alert("You aren't logged in! Please sign in to an account!")
	}
	else{
		mainContract.methods.follow(address).estimateGas({
					from: account
		}).then(function(gas){
				mainContract.methods.follow(address).send(
				{
					from: account,
					gas: gas
				}).on('transactionHash', function(hash){
					div.innerHTML = "- Follow";
					div.onclick = function(){
						unfollowUser(address, div);
					};
				});
			}
		);
	}
}

function transfer(index, div){
	if(account == null){
		alert("You aren't logged in! Please sign in to an account!")
	}
	else {
		amount = prompt("Please enter the amount you wish to transfer, in ETH:", ""); //[{Add option for units change]]
				mainContract.methods.transfer(index).estimateGas({
					from: account,
					value: window.web3.utils.toWei(amount)
			}).then(function(gasEstimate){
				mainContract.methods.transfer(index).send({
					from: account,
					gas: gasEstimate,
					value: window.web3.utils.toWei(amount)
				}).on('transactionHash', function(hash){
					document.getElementById('ethCount' + index).innerHTML = changeCount(document.getElementById('ethCount' + index).innerHTML, amount);
				});
			});
	}
}

function unfollowUser(address, div){
		mainContract.methods.unfollow(address).estimateGas(
		{
			from: account
		}).then(function(gasEstimate){
			mainContract.methods.unfollow(address).send(
			{
				from: account,
				gas: gasEstimate
			}).on('transactionHash', function(hash){
				div.innerHTML = "+ Follow";
				div.onclick = function(){
					followUser(address, div);
				};
			});
		});
}


function replyTo(replyIDNode, img_reply, index, parentDiv){
	var replyNode = document.createElement("div");
	replyNode.classList.add("replyEntry");
	
	var replyBoxDiv = document.createElement("div");
	replyBoxDiv.classList.add("stringInput");
	replyBoxDiv.classList.add("center");
	
		var textEntry = document.createElement("textarea");
		textEntry.id = "newString" + index;
		textEntry.classList.add("stringInputBox");
		textEntry.onfocus = function(){clearDefaultText(textEntry, 'Enter your reply here!');}
		textEntry.maxLength = 1024;
		textEntry.value = "Enter your reply here!";
	
	replyBoxDiv.appendChild(textEntry);
	
		var submitText = document.createElement("div");
		submitText.classList.add("center");
			var newButton = document.createElement("button");
			newButton.classList.add("center");
			newButton.onclick = function(){reply(replyIDNode, img_reply, replyNode, index, parentDiv, textEntry);}
			newButton.innerHTML = "Reply";
		submitText.appendChild(newButton);
	
	replyBoxDiv.appendChild(submitText);
	
	replyNode.appendChild(replyBoxDiv);
	
	parentDiv.appendChild(replyNode);
	return replyNode;
}


//GOOOD
function reply(replyID, img_reply, replyNode, fileIndex, parent, stringNode){
	var toSend = window.web3.utils.utf8ToHex(stringNode.value);
	if(account == null){
				alert("You aren't logged in! Please sign in to an account!")
			}
	mainContract.methods.sendTweedEth(toSend, fileIndex, 0).estimateGas({
					from: account,
					value: currentFee
				})
		.then(function(gas){
				mainContract.methods.sendTweedEth(toSend, fileIndex, 0).send(
				{
					from: account,
					gas: gas,
					value: currentFee
				}).on('transactionHash', function(hash){
					hideReply(replyID, img_reply, replyNode, fileIndex, parent);
				});
			});
}

function deleteTweed(tweedID){
		mainContract.methods.deleteTweed(tweedID).estimateGas(
		{
			from: account
		}).then(function(gasEstimate){
			mainContract.methods.deleteTweed(tweedID).send(
			{
				from: account,
				gas: gasEstimate
			}).on('transactionHash', function(hash){
				toRemove = document.getElementsByClassName(tweedID);
				for (i = 0; i < toRemove.length; i++) { 
					toRemove[i].style.display = "none";
				}
			});
		});
}
	
function processLink(link){
	return link;
}
			   
function loadResource(start, length){
	bytesPromises = [];
	for(var i = 0; i<length; i++){
		bytePromises.push(callAndRetry(mainContract.methods.resourceBytes(i)),"bytes");
	}
	return Promise.all(bytesPromises).then(function(res){
		return uintToString(Uint8Array.from(res));
	});
}

function uintToString(uintArray) {
    var encodedString = String.fromCharCode.apply(null, uintArray),
        decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
}

function favoriteTweed(tweedID){
	if(account == null){
		alert("You aren't logged in! Please sign in to an account!")
	}
	else{
		mainContract.methods.favoriteTweed(tweedID).estimateGas()
			.then(function(gas){
				mainContract.methods.favoriteTweed(tweedID).send(
				{
					from: account,
					gas: gas
				}).on('transactionHash', function(hash){
					document.getElementById("img_fav" + tweedID).src = "Resources/heartFull.png";
					document.getElementById('favCount' + tweedID).innerHTML = changeCount(document.getElementById('favCount' + tweedID).innerHTML, 1);
				});
			}
		);
	}
}

function retweed(tweedID){
	if(account == null){
		alert("You aren't logged in! Please sign in to an account!")
	}
	else{
		mainContract.methods.reTweed(tweedID).estimateGas({
					from: account,
					value: currentFee
				})
			.then(function(gas){
				mainContract.methods.reTweed(tweedID).send(
				{
					from: account,
					value: currentFee,
					gas: gas
				}).on('transactionHash', function(hash){
					document.getElementById("img_rt" + tweedID).src = "Resources/reTweedSent.png";
					document.getElementById('rtCount' + tweedID).innerHTML = changeCount(document.getElementById('rtCount' + tweedID).innerHTML, 1);
				});
			}
		);
	}
}

function unretweed(tweedID){
	if(account == null){
		alert("You aren't logged in! Please sign in to an account!")
	}
	else{
		mainContract.methods.unReTweed(tweedID).estimateGas({
					from: account
				})
			.then(function(gas){
				mainContract.methods.unReTweed(tweedID).send(
				{
					from: account,
					gas: gas
				}).on('transactionHash', function(hash){
					document.getElementById("img_rt" + tweedID).src = "Resources/reTweed.png";
					document.getElementById('rtCount' + tweedID).innerHTML = changeCount(document.getElementById('rtCount' + tweedID).innerHTML, -1); //[{Have changecount loop through all elements of a class]]
				});
			}
		);
	}
}

function unFavoriteTweed(tweedID){
		mainContract.methods.unfavoriteTweed(tweedID).estimateGas(
		{
			from: account
		}).then(function(gasEstimate){
			mainContract.methods.unfavoriteTweed(tweedID).send(
			{
				from: account,
				gas: gasEstimate
			}).on('transactionHash', function(hash){
				document.getElementById("img_fav" + tweedID).src = "Resources/heartOutline.png";
				document.getElementById('favCount' + tweedID).innerHTML = 			changeCount(document.getElementById('favCount' + tweedID).innerHTML, -1);
			});
		});
}

function changeCount(original, amount){
	if (original.indexOf('~') > -1){
		changedCount = parseFloat(original.slice(4)) + parseFloat(amount);
		newString = " x ~" + changedCount;
		while(newString.length < 9){
			newString = newString + '0';
		}
		return newString;
	}
	changedCount = parseFloat(original.slice(3)) + parseFloat(amount);
	return " x " + changedCount;
}

var footerItems = ["userSettings", "genFeed", "userFeed", "yourFeed", "about"];
var footerItems_correspondingDiv = ["settingsDisplay", "feed", "feed", "feed", "aboutText"];
var footerItems_allowSend = [false, true, true, true, false];

function footerClick(clickedElement) {
	var visibleDiv = '';
	for (var i = 0; i < footerItems.length; i++) {
		if(footerItems[i] != clickedElement){
			if(footerItems_correspondingDiv[i] != visibleDiv){
				document.getElementById(footerItems_correspondingDiv[i]).style.display = "none";
			}
		}
		else{
			visibleDiv = footerItems_correspondingDiv[i];
			document.getElementById(footerItems_correspondingDiv[i]).style.display = "block";
			if(footerItems_allowSend[i]){
				document.getElementById("newTweed").style.display = "block";
			}
			else{
				document.getElementById("newTweed").style.display = "none";
			}
		}
	}
	if(clickedElement == 'yourFeed' || clickedElement == 'userFeed'){
		if(account == null){
			document.getElementById("feed").innerHTML = "<div class=\"center padded\">You aren't logged in! Log into an account to see your feed!<\div>"
		}
		else if(clickedElement == 'yourFeed'){
			loadUserPage(account, true);
		}
		else{
			loadUserFollowingFeed(account);
		}
	}
	else if(clickedElement == "genFeed"){
		history.pushState(null, '', '/');
		document.getElementById("feed").innerHTML = '';
		loadGeneralFeed();
	}
	else if(clickedElement == "about"){
		history.pushState(null, '', '/?page=about-');
	}
}

function loadUserFollowingFeed(accountToLoad){
	document.getElementById("feed").innerHTML = '<br><br><div class="center">You came early! Tweed will be launching Your Feed shortly... For now participate in the general feed and start following cool users!</div>';
	//[{Load a users feed here]]
	
	//Pull one tweed from all people being followed
	//Sort said tweeds by time
	
	//Load more tweeds by following up on the most recent tweeds
	
	//Do this until max amount is loaded or no tweeds present
}