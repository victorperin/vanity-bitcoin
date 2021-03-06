#! /usr/bin/env node

const { spawn } = require('child_process');
const filter = require('through2-filter');

const processBuffer = require('./process-buffer');

const onlyKeys = filter( (chunk) => {
  const containKey = chunk.includes('Key');

  if(!containKey){
    process.stdout.clearLine();
    process.stdout.write(chunk);
  }

  return containKey;
});

const text = process.argv[2];
const vanitygen = spawn(`${__dirname}/../bin/vanitygen`, ['-i', '-k', `1${text}`]);
vanitygen.stdout
  .pipe(onlyKeys)
  .on('data', processBuffer);

vanitygen.stderr.on('data', console.error);

vanitygen.on(
  'close',
  (code) => console.log(`child process exited with code ${code}`)
);
