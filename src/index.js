const { spawn } = require('child_process');
const filter = require('through2-filter');

const vanitygen = spawn('bin/vanitygen', ['-i', '-k', '1Perin']);

const processAddress = (buffer) =>
  Promise.resolve(buffer)
    .then( (buffer) => buffer.toString() )
    // .then( text => text.match(/Private Key\:\s+(\w+)\s+Address:\s+(\w+)/i) )
    // .then( ([string, privateKey, publicKey]) => ({ privateKey, publicKey }) )
    .then(console.log)


const onlyKeys = filter( (chunk) => chunk.toString().includes('Key') );

vanitygen.stdout
  .pipe(onlyKeys)
  .on('data', processAddress);

vanitygen.stderr.on('data', console.error);

vanitygen.on(
  'close',
  (code) => console.log(`child process exited with code ${code}`)
);
