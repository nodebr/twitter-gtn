var blessed = require('blessed');
var chalk = require('chalk');
var Twit = require('twit');
var moment = require('moment-twitter');
var Chance = require('chance');
var Table = require('cli-table');
var chance = new Chance();
var config = require('./config.js');
var client = new Twit(config.oauth);
var terminal = blessed.program();

// The program internal state
var state = {
  start: new Date(),
  status: 'Initializing',
  winner: null,
  number: chance.integer(config.number).toString(),
  users: {},
  tweets: [],
  total: 0
};

// The main draw loop
(function draw() {

  // Clear the current terminal
  terminal.clear();

  // Print the headers
  console.log(chalk.green.bold('Status: ') + state.status);
  console.log(chalk.green.bold('Running: ') + moment(state.start).twitter());
  console.log(chalk.green.bold('Number: ') +
    (state.winner ? state.number : 'Hidden'));
  console.log(chalk.green.bold('Winner: ') + (state.winner || 'None'));
  console.log(chalk.green.bold('Keyword: ') + config.keyword);
  console.log(chalk.green.bold('Users: ') + Object.keys(state.users).length);
  console.log(chalk.green.bold('Tweets: ') + state.total);
  console.log();

  // Print the table with the last guesses
  console.log(chalk.red.bold('Last guesses'));

  // Create a new table
  var table = new Table({
    head: ['Username', 'Guessed', 'Tries']
  });

  // Add captured tweets to the table and print it
  table.push.apply(table, state.tweets);
  console.log(table.toString());

  // Print the info again
  setTimeout(draw, 100);
})();

// Change the status to active
state.status = 'Active';

// This stream will listen for out keyword
client.stream('statuses/filter', {
  track: config.keyword
}).on('tweet', function(tweet) {

  // We received a tweet with the keyword, now we need to
  // extract some information
  var guess = tweet.text.match(/\d+/);
  var user = tweet.user.screen_name;

  // Add one more tweet to the total
  state.total++;

  // If the user is present on the "tries object", we
  // need to check if he has reached the tries limit
  if (state.users[user]) {
    state.users[user] ++;

    if (state.users[user] > config.tries)
      return;

  } else
    state.users[user] = 1;

  // Add this tweet to the capture table
  state.tweets.unshift([user, guess, state.users[user]]);

  // Remove old tweets
  while (state.tweets.length > 15)
    state.tweets.pop();

  // Test if the tweet have the winning number, otherwise
  // break out from this function
  if (state.winner || !guess || guess[0] !== state.number)
    return;

  // We have a winner!
  state.winner = user;

  // Start stopping the application
  state.status = 'Stopping';

  // Post to the winner, so he knows that he's the winner
  client.post('statuses/update', {
    status: '@' + user + ', you won with the number ' + state.number + '!',
    in_reply_to_status_id: tweet.id_str
  }, function(err) {
    if (err)
      throw err;

    // Stop the process and exit
    state.status = 'Stopped';
    setTimeout(function() {
      process.exit();
    }, 200);
  });
});
