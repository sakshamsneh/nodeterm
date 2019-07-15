const fs = require('fs');
const path = require('path');

const done = function (output) {//write out data
  process.stdout.write(output);
  process.stdout.write('\nip > ');
}

const evaluateCmd = function (userInput) {// where we will store our commands
  const userInputArray = userInput.split(" ");// parses the user input to understand which command was typed
  const command = userInputArray[0];

  switch (command) {
    //we will add the functionality of echo next within the object commandLibrary 
    //slice(1) will slice the first letter and save the rest
    case "echo": commandLibrary.echo(userInputArray.slice(1).join(" ")); break;
    case "cat": commandLibrary.cat(userInputArray.slice(1)); break;
    case "head": commandLibrary.head(userInputArray.slice(1)); break;
    case "tail": commandLibrary.tail(userInputArray.slice(1)); break;
    case "ls": commandLibrary.ls(userInputArray.slice(1)); break;
    case "cls": commandLibrary.cls(); break;
    case "help": commandLibrary.help(userInputArray.slice(1)); break;
    case "exit": commandLibrary.cls(); break;
    default: process.stdout.write('Typed command is not accurate'); done("");
  }
}

const commandLibrary = {
  "echo": function (userInput) {
    done(userInput);
  },
  "cat": function (fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) done("No such file!");
      console.log(data);
      done(data);
    });
  },
  "head": function (fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) done("No such file!");
      var text = data.toString('utf8');// convert string to utf8 
      var slicedText = text.split('\n').slice(0, 10).join('\n');// extract 10 lines of code and join by new line
      var bufferText = Buffer.from(slicedText, 'utf8');// convert sliced text back to Buffer object
      done(bufferText);
    })
  },
  "tail": function (fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) done("No such file!");
      var text = data.toString('utf8');
      var slicedText = text.split('\n').slice(-10).join('\n');
      var bufferText = Buffer.from(slicedText, 'utf8');
      done(bufferText);
    })
  },
  "ls": function (fullPath) {
    if (fullPath[0] === '') fullPath[0] = '';
    const directoryPath = path.join(__dirname, fullPath[0]);
    fs.readdir(directoryPath, function (err, files) {
      if (err) done("No such file!");
      else {
        var text = directoryPath + '\n';
        files.forEach(function (file) {
          text = text + file + '\n';
        });
        done(text);
      }
    });
  },
  "cls": function () {
    console.clear();
    done('');
  },
  "help": function(helpword){
    var text="For more information on a specific command, type HELP command-name\n";
    text+="echo text\tDisplays text.\n";
    text+="cat filename\tDisplays file contents.\n";
    text+="head filename\tDisplays file contents from start\n";
    text+="tails filename\tDisplays file contents from end\n";
    text+="ls folder\tDisplays folder contents\n";
    text+="cls\t\tClears the terminal\n";
    text+="help\t\tDisplays this help\n";
    done(text);
  }
};

module.exports = {
  evaluateCmd: evaluateCmd,
  done: done,
}