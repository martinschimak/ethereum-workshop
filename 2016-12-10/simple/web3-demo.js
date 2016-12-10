/* Mist / Metamask support */
window.addEventListener('load', function() {

  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  start()

})

function update() {
  web3.eth.getBalance(web3.eth.accounts[0], function(err, balance) {
    $('#bal').text(balance.toString())
  })

  web3.eth.getBlockNumber(function(err, number) {
    $('#block').text('Block ' + number)

    if(txhash) {
      web3.eth.getTransactionReceipt(txhash, function(err, receipt) {
        if(receipt) {
          $('#txinfo').text(txhash + ' ' + (number - receipt.blockNumber) + ' confirmations')
        } else {
          $('#txinfo').text(txhash + ' not yet mined')
        }
      })    
    }
  })
}

var txhash

function start() {
  var eth = web3.eth

  if(eth.accounts.length == 0) {
    $('#addr').text('No account found')
    return
  }

  $('#addr').text(eth.accounts[0])  

  update()

  $('#sendtx').on('click', function(event) {
    eth.sendTransaction({
      from: eth.accounts[0],
      to: '0x6c7F03ddfDd8a37ca267C88630A4FeE958591De0',
      value: web3.toWei(0.005)
    }, function (err, tx) {
      if(err) {        
        $('#txinfo').text(err)
      } else {        
        txhash = tx
        update()
      }
    })
  })

  web3.eth.filter('latest').watch(function(err, hash) {
    update()
  })

}