const contractAddress = "0x9EE25D3E7e46Dc7720897762928D9cbcB41BAC82"

let waitForLoad = () => {
    return new Promise((resolve, reject) => {
        window.addEventListener('load', resolve)
    })
}

let mintButtonFunc = async (contract,account) => {
    let uri = document.getElementById("mint").value
    let result = await contract.methods.mint(uri).send({from: account, value: 1000000000000000}, (error,transactionHash) =>{
    })
    console.log(result)
}

let getBalanceButtonFunc = async contract => {
    let address = document.getElementById('balanceOf').value
    try{
        let result = await contract.methods.balanceOf(address).call()
        document.getElementById("balanceOfOutput").innerHTML = "\t The owner " + address+ " has " + result + " NFT";
        console.log(result)
    }catch(err){

    }
}

let getOwnerButtonFunc = async contract => {
    let token = document.getElementById('ownerOf').value
    try{
        let result = await contract.methods.ownerOf(token).call()
        document.getElementById("ownerOfOutput").innerHTML = "\t The owner of " + token+ " is " + result;
        console.log(result)
    }catch(err){

    }
}



let main = async () => {
    await waitForLoad()

    // Verify if metamask is connected
    if(typeof web3 !== 'undefined') document.getElementById('metamaskMissing').classList.add('displayNone')
    else return
    // Get the current account
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    
    const Provider = new Web3(web3.currentProvider)
    // Connect to the contract
    const myContract = new Provider.eth.Contract(window.mainABI, contractAddress)

    document.getElementById('mintButton').addEventListener('click', () => { mintButtonFunc(myContract,account) })
    document.getElementById('balanceOfButton').addEventListener('click', () => { getBalanceButtonFunc(myContract) })
    document.getElementById('ownerOfButton').addEventListener('click', () => { getOwnerButtonFunc(myContract) })

    let result
    try{
        result = await myContract.methods.getBalance().call()
    }catch(err){

    }
    console.log(account)
}

main()