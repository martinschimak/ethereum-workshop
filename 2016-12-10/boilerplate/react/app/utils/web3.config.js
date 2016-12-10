import Web3 from 'web3'

var web3 = new Web3()

web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'))

module.exports = {
	web3,
	eth: web3.eth
}