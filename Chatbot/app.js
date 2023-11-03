var express = require("express");

var mongoose = require('mongoose');
var path = require("path");

//var Bots = require("./lib/bots");

const PORT = 3000;
const MDB_PORT = 27017;

var app = express();

mongoose.set('useFindAndModify', false);

mongoose.connect(`mongodb://localhost:${MDB_PORT}/chatbot`, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection
db.on('open', async() => {
    console.log("MongoDB is connected")
        //await Bots.recover()
        //console.log("the data is in the nodeJS API")
})

//module.export = Bots

app.use(express.urlencoded({ extended: true }))

app.get('/', function(req, res) { res.send(`GO TO http://localhost:${PORT}/bot to manage bot or http://localhost:${PORT}/user to manage user.`) });

app.use('/bot', require('./routes/bot.js'));
//app.use('/bots', require('./routes/bots.js'));
app.use('/user', require('./routes/user.js'));


app.listen(PORT, console.log(`Listening on http://localhost:${PORT}/`));