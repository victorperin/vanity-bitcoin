const { spawn } = require('child_process');
const filter = require('through2-filter');

const processBuffer = require('./process-buffer');

const onlyKeys = filter( (chunk) => chunk.toString().includes('Key') );

const text = process.argv[2];
const vanitygen = spawn('bin/vanitygen', ['-i', '-k', `1${text}`]);
vanitygen.stdout
  .pipe(onlyKeys)
  .on('data', processBuffer);

vanitygen.stderr.on('data', console.error);

vanitygen.on(
  'close',
  (code) => console.log(`child process exited with code ${code}`)
);
