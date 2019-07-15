const fs = require('fs');//import fs library

const done = function (output) {//write out data
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

const evaluateCmd = function(userInput) {// where we will store our commands
  const userInputArray = userInput.split(" ");// parses the user input to understand which command was typed
  const command = userInputArray[0];

  switch (command) {
    //we will add the functionality of echo next within the object commandLibrary 
    //slice(1) will slice the first letter and save the rest
    case "echo":  commandLibrary.echo(userInputArray.slice(1).join(" ")); break;
    case "cat": commandLibrary.cat(userInputArray.slice(1));  break;
    case "head":  commandLibrary.head(userInputArray.slice(1)); break;
    case "tail":  commandLibrary.tail(userInputArray.slice(1)); break;
    default:  process.stdout.write('Typed command is not accurate');  done("");
  }
}

const commandLibrary = {
  "echo": function (userInput) {
    done(userInput);
  },
  "cat": function (fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err)  done("No such file!");
      console.log(data);
      done(data);
    });
  },
  "head": function (fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err)  done("No such file!");
      var text = data.toString('utf8');// convert string to utf8 
      var slicedText = text.split('\n').slice(0, 10).join('\n');// extract 10 lines of code and join by new line
      var bufferText = Buffer.from(slicedText, 'utf8');// convert sliced text back to Buffer object
      done(bufferText);
    })
  },
  "tail": function (fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err)  done("No such file!");
      var text = data.toString('utf8');
      var slicedText = text.split('\n').slice(-10).join('\n');
      var bufferText = Buffer.from(slicedText, 'utf8');
      done(bufferText);
    })
  },
  "ls": function (fullPath) {
    ;
  }
};

module.exports = {
  evaluateCmd:evaluateCmd,
  done: done,
}