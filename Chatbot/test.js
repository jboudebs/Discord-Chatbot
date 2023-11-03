//DISCORD

/*
require('dotenv').config();
const Discord = require('discord.js');
const mouth = new Discord.Client();
const TOKEN = process.env.TOKEN;

mouth.login(TOKEN);

mouth.on('ready', () => {
  console.info(`Logged in as ${mouth.user.tag}!`);
});

mouth.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
    msg.channel.send('pong');

  } else if (msg.content.startsWith('!kick')) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else {
      msg.reply('Please tag a valid user!');
    }
  }
});
*/

//RIVESCRIPT
/*
var RiveScript = require("rivescript")

var bot = new RiveScript();
 
// Load a directory full of RiveScript documents (.rive files). This is for
// Node.JS only: it doesn't work on the web!
//bot.loadDirectory("brain").then(loading_done).catch(loading_error);
 
// Load an individual file.
bot.loadFile("brains/standard.rive").then(loading_done).catch(loading_error);
 
// Load a list of files all at once (the best alternative to loadDirectory
// for the web!)
//bot.loadFile([
//  "brain/begin.rive",
//  "brain/admin.rive",
//  "brain/clients.rive"
//]).then(loading_done).catch(loading_error);

// All file loading operations are asynchronous, so you need handlers
// to catch when they've finished. If you use loadDirectory (or loadFile
// with multiple file names), the success function is called only when ALL
// the files have finished loading.

function loading_done() {
  console.log("Bot has finished loading!");
 
  // Now the replies must be sorted!
  bot.sortReplies();
 
  // And now we're free to get a reply from the brain!
 
  // RiveScript remembers user data by their username and can tell
  // multiple users apart.
  let username = "local-user";
 
  // NOTE: the API has changed in v2.0.0 and returns a Promise now.
  bot.reply(username, "Hello, bot!").then(function(reply) {
    console.log("The bot says: " + reply);
  });
}
 
// It's good to catch errors too!
function loading_error(error, filename, lineno) {
  console.log("Error when loading files: " + error);
}
*/
// CONNEXION FAITE ENTRE DISCORD ET RIVESCRIPT

require('dotenv').config();
const Discord = require('discord.js');
const mouth = new Discord.Client();
const TOKEN = process.env.TOKEN;
var RiveScript = require("rivescript");
var bot = new RiveScript();
var replied = false


mouth.login(TOKEN);

mouth.on('ready', () => {
  console.info(`Logged in as ${mouth.user.tag}!`);
  bot.loadFile("brains/standard.rive");
  bot.sortReplies();
});

mouth.on('message', msg => {
  if(replied)
  {
    replied=false
  }
  else
  {
    bot.sortReplies();
    let user="toto";
    bot.reply(user, msg.content.toString()).then(function(reply) {
      msg.channel.send(reply);
    });
    replied=true
  }
  
});

