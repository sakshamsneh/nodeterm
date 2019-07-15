const fs = require('fs');
const path = require('path');

const done = function (output) {
  process.stdout.write(output);
  process.stdout.write('\nip > ');
}

const evaluateCmd = function (userInput) {
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch (command) {
    case "echo": commandLibrary.echo(userInputArray.slice(1).join(" ")); break;
    case "cd": commandLibrary.cd(userInputArray.slice(1)); break;
    case "cat": commandLibrary.cat(userInputArray.slice(1)); break;
    case "head": commandLibrary.head(userInputArray.slice(1)); break;
    case "tail": commandLibrary.tail(userInputArray.slice(1)); break;
    case "ls": commandLibrary.ls(userInputArray.slice(1)); break;
    case "cls": commandLibrary.cls(); break;
    case "help": commandLibrary.help(userInputArray.slice(1)); break;
    case "cp": commandLibrary.cp(userInputArray.slice(1)); break;
    case "exit": commandLibrary.cls(); break;
    default: process.stdout.write('Typed command is not accurate'); done("");
  }
}

var currentdir='';

const commandLibrary = {
  "echo": function (userInput) {
    done(userInput);
  },
  "cd": function (userInput) {
    if (userInput.length == 0)  done(path.join(__dirname, currentdir));
    else {
      // currentdir += '\\' + userInput[0];
      if (fs.existsSync(currentdir)) done("No such file!");
      else {
        currentdir = userInput[0];
        done(path.join(__dirname, userInput[0]));
      }

      // fs.access(currentdir, fs.F_OK, (err) => {
      //   if (err) done("No such file!");
      //   else{
      //     currentdir=__dirname;
      //     done(__dirname);
      //   }
      // });
    }
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
    if (fullPath.length == 0) fullPath[0] = '';
    fullPath[0]+=currentdir+'\\';
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
  "help": function (helpword) {
    var text = "For more information on a specific command, type HELP command-name\n";
    text += "echo text\tDisplays text.\n";
    text += "cat filename\tDisplays file contents.\n";
    text += "head filename\tDisplays file contents from start\n";
    text += "tails filename\tDisplays file contents from end\n";
    text += "ls folder\tDisplays folder contents\n";
    text += "cls\t\tClears the terminal\n";
    text += "help\t\tDisplays this help\n";
    done(text);
  },
  "cp": function (filepaths) {
    fs.copyFile(filepaths[0], filepaths[1], (err) => {
      if (err) done("No such file!");
      done("1 file copied");
    });
  },
};

module.exports = {
  evaluateCmd: evaluateCmd,
}
