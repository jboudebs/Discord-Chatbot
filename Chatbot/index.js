var RiveScript = require("rivescript");

var express = require("express");
var app = express();
var path = require("path");

let bot = new RiveScript();
bot.loadFile("./brains/standard.rive").then(() => {
  bot.sortReplies();
  getReply();
}).catch((err) => {
  console.log("RIVE ON-LOAD ERROR : ", err);
});

function getReply() {
  bot.reply("user", "hello").then((rep) => {
    console.log("BOT SAYS : ", rep);
  }).catch((err) => {
    console.log("ERREUR : ", err);
  });
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/home/index.html'));
});

app.get('/home/index.css', function (req, res) {
  res.sendFile(path.join(__dirname + '/home/index.css'));
});

app.get('/home/index.js', function (req, res) {
  res.sendFile(path.join(__dirname + '/home/index.js'));
});

app.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname + '/home/index.html'));
});

app.get('/chatbots/index.css', function (req, res) {
  res.sendFile(path.join(__dirname + '/chatbots/index.css'));
});

app.get('/chatbots/index.js', function (req, res) {
  res.sendFile(path.join(__dirname + '/chatbots/index.js'));
});

app.get('/chatbots', function (req, res) {
  res.sendFile(path.join(__dirname + '/chatbots/index.html'));
});

app.get('/brain.js', function (req, res) {
  res.sendFile(path.join(__dirname + '/brain.js'));
});

app.listen(3000);
