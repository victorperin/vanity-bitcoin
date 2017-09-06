module.exports = (buffer) =>
  Promise.resolve(buffer)
    .then( (buffer) => buffer.toString() )
    .then( text => text.match(/Private Key\:\s+(\w+)\s+Address:\s+(\w+)/i) )
    .then( ([string, privateKey, publicKey]) => ({ privateKey, publicKey }) )
    .then(console.log)
