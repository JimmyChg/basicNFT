const contractAddress = "0x9EE25D3E7e46Dc7720897762928D9cbcB41BAC82"

let waitForLoad = () => {
    return new Promise((resolve, reject) => {
        window.addEventListener('load', resolve)
    })
}

let mintButtonFunc = async (contract, account) => {
    let uri = document.getElementById("mint").value
    let result = await contract.methods.mint(uri).send({ from: account, value: 1000000000000000 }, (error, transactionHash) => {
    })
}

let transferButtonFunc = async (contract, account) => {
    let to = document.getElementById("to").value
    let whichToken = document.getElementById("whichToken").value
    try {
        let result = await contract.methods.safeTransferFrom(account, to, whichToken).send({ from: account }, (error, transactionHash) => {
        })
    } catch (err) {
        alert("Couldn't perform the transfer, verify you are the owner of the token")
    }
}
let getBalanceButtonFunc = async contract => {
    let address = document.getElementById('balanceOf').value
    try {
        let result = await contract.methods.balanceOf(address).call()
        document.getElementById("balanceOfOutput").innerHTML = "\t The owner " + address + " has " + result + " NFT";
    } catch (err) {

    }
}

let getOwnerButtonFunc = async contract => {
    let token = document.getElementById('ownerOf').value
    try {
        let result = await contract.methods.ownerOf(token).call()
        document.getElementById("ownerOfOutput").innerHTML = "\t The owner of " + token + " is " + result;
    } catch (err) {
    
    }
}

let main = async () => {
    await waitForLoad()
    // Verify if metamask is connected
    if (typeof web3 !== 'undefined') document.getElementById('metamaskMissing').classList.add('displayNone')
    else return
    // Get the current account
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    const Provider = new Web3(web3.currentProvider)
    // Connect to the contract
    const myContract = new Provider.eth.Contract(window.mainABI, contractAddress)

    // Connect all the button to the function associated
    document.getElementById('mintButton').addEventListener('click', () => { mintButtonFunc(myContract, account) })
    document.getElementById('balanceOfButton').addEventListener('click', () => { getBalanceButtonFunc(myContract) })
    document.getElementById('ownerOfButton').addEventListener('click', () => { getOwnerButtonFunc(myContract) })
    document.getElementById('transferButton').addEventListener('click', () => { transferButtonFunc(myContract, account) })

    let ownerOfContract = await myContract.methods.owner().call()
    document.getElementById("ownerOfContract").innerHTML = "The owner of the contract is " + ownerOfContract

    let addressOfContract = await myContract.options.address
    document.getElementById("addressOfContract").innerHTML = "The address of the contract is " + addressOfContract
}

main()