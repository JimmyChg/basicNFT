import ABI from "./contractABI.json"
// const contract = new web3.eth.Contract([abi], address)


if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }

// Connect Metamask
const ethereumButton = document.getElementById('enableEthereumButton');
function connect() {
    //Will Start the metamask extension
    ethereum.request({ method: 'eth_requestAccounts' });
}
ethereumButton.addEventListener('click', connect());

if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
}

const contract = new window.web3.eth.Contract(ABI, contractAddress)