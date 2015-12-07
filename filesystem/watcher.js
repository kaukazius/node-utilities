"use strict";

const
  fs = require('fs'),
  filename = process.argv[2],
  spawn = require('child_process').spawn;

if (!filename) {
  throw Error("A file to watch must be specified!");
}

fs.watch(filename, function() {
  let
    // creating a child process and assigning it to a variable called ls
    ls = spawn('ls', ['-lh', filename]),
    // for output coming from the child process.
    output = '';
  // adds a listener for for data events
  ls.stdout.on('data', function(chunk){
    // convert the buffer’s contents to a string and append to output
    output += chunk.toString();
  });
  // adds a listener for for close events
  ls.on('close', function(){
    // splitting output on sequences of one or more whitespace characters
    let parts = output.split(/\s+/);
    console.dir([parts[0], parts[4], parts[8]]);
  });
});

console.log("Now watching " + filename + " for changes...");
