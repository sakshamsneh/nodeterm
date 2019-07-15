const commands = require('./command.js');

process.stdout.write('ip > ');//prompt the user for input

process.stdin.on('data', (userInput) => {// the stdin 'data' event triggers after a user types in a line
  userInput = userInput.toString().trim();
  commands.evaluateCmd(userInput);
}); 