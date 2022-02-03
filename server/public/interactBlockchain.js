// import requirejs from "requirejs"
import * as ABI from './contractABI.json';
// const ABI = requirejs("./contractABI.json")
// const contract = new web3.eth.Contract([abi], address)

const contractAddress = "0x71CF1e20763F5A933B24166443A067e2168cE893"
console.log(ABI)
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