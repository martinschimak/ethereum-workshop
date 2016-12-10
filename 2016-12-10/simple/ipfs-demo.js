var ipfs = window.IpfsApi()

ipfs.cat('QmWP8DHyQN9sifsHj91zCn7VS1gUpUhMJn3UjsHKxC75ka').then(function (stream) {
  if(stream.readable) {
    stream.on('data', function (data) {
      console.log(data.toString())
    })
  }
}).catch(function (err) {
  console.log(err)
})

ipfs.files.createAddStream(function (err, stream) {
  stream.on('data', function (file) {
    // 'file' will be of the form
    // {
    //   path: '/tmp/myfile.txt',
    //   hash: 'QmHash' // base58 encoded multihash
    //   size: 123
    // }
    console.log('got', file)
  })

  stream.write({path: 'abc', content: '321'})
  

  stream.end()
})