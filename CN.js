
fallback_provider_urlL = "mainnet.infura.io/v3/c642d10b5ce9473a9d5168cfbe66c708";
window.addEventListener('load', function() {
  // Checking if web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
        web3js = new Web3(web3.currentProvider);
    } else {
      console.log('No web3? You will be running in read-only mode!');
      // fallback - currently falls back to infura
        web3js = new Web3(new Web3.providers.HttpProvider(fallback_provider_url));
    }
  startApp();
});
