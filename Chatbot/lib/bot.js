require('dotenv').config();
const mongoose = require('mongoose');
const Discord = require('discord.js');
var RiveScript = require("rivescript");
const BotDB = require('../db/schemas/bot.js');
const Users = require('./user.js');

class Bot
{
    constructor()
    {
        this.rs = new RiveScript();
        this.mouth = new Discord.Client(); //pas très flex
        //TO DO : voir pour les users
    }

    async newBotDB(name)
    {
        var new_Bot = new BotDB({"name" : name});
        var db = await new_Bot.save();
        this.db = db
        this.id = String(db._id)
        return this.id
    }

    async recover(db)
    {
        this.db = db
        this.id = String(db._id);
        if(this.db.brainPath)
        {
            this.rs.loadFile(db.brainPath).then(()=>this.rs.sortReplies())
            this.brainPath = db.brainPath;
        }
        if(db.status)
        {
            await this.start();
        }
    }

    async get()
    {
        return await BotDB.findById(mongoose.Types.ObjectId(this.id))
    }

    async getName()
    {
        return this.db.name
    }

    async setBrain(brainPath)
    {
        // TO DO : voir comment faire sur rs
        //this.rs.loadFile(brainPath) //voir err
        this.brainPath = brainPath;
        this.rs.loadFile(brainPath);
        await this.rs.sortReplies();
        await BotDB.findByIdAndUpdate(mongoose.Types.ObjectId(this.id),{brainPath : brainPath}, this.notfind);
        console.log("brain saved");
    }

    async delete()
    {
        const suppr_bot = await BotDB.findByIdAndDelete(mongoose.Types.ObjectId(this.id), this.notfind)
		console.log(`The following bot was deleted from the DB :`)
        console.log(suppr_bot)
        
        this.mouth.destroy();
        //this.rs.close();
        // TO DO : close Discord
        // TO DO : close RS
    }

    async setStatus(status)
    {
        await BotDB.findByIdAndUpdate(mongoose.Types.ObjectId(this.id),{"status":status},this.notfind)
    }

    async start()
    {
        await this.mouth.login(String(await this.getToken()));
        //stocker le nom discord
        //stocker le token pris

        this.mouth.on('ready', async () => {
            console.info(`The bot ${this.id} is logged as ${this.mouth.user.tag}!`);
            await this.rs.sortReplies();
            await this.setStatus(true);
        });
        
        this.mouth.on('message', async msg => {
            var username = msg.member.user.tag;
            var isUser = await this.isUser(username);
            //recuperer les info des users
            //if (!this.getChatbot().includes(msg.member.user.tag))// si il est appelé
            if(isUser)
            {
                var info =  await Users.getAllInfo(username);
                // recuperer les infos
                await this.rs._session.set(username, info);
                // ajouter l'utilisateur dans la base
                //await Users.newUser(username);
                // repondre
                this.rs.sortReplies();
                const reply = await this.rs.reply(username, msg.content.toString());
                await msg.channel.send(reply);
                console.log(`The bot ${this.id} is repling to ${username}.`);
                // indiquer qu'on a répondu
                // afficher les infos et les stocker dans la base
                //console.log(info);
                
                //console.log(this.rs._session._users[msg.member.user.tag]);
                await Users.setInfo(username, this.rs._session._users[msg.member.user.tag]);
                // supprimer les infos de rivescript
                await this.rs._session.reset(username);
                //console.log(this.rs._session);
            }
        });
    }

    async quit()
    {
        this.mouth.destroy(err=>{console.err(err);})
        await BotDB.findByIdAndUpdate(mongoose.Types.ObjectId(this.id), {user : ""});
        await this.setStatus(false)
    }

    async newUser(idUser)
    {
        await BotDB.findByIdAndUpdate(mongoose.Types.ObjectId(this.id), {user : (await Users.getInfo(idUser)).login})
    }

    async isUser(username)
    {
        return await BotDB.exists({_id : mongoose.Types.ObjectId(this.id), user : username});
    }

    // gestion erreur
    notfind(err) 
    {
        if (err)
        {
            const text =`The id '${this.id}' doesn't exist. The modification failed.`;
            res.send(text);
            console.log(text)
        }
    }

    // noms des bots (pas tres flex)
    getChatbot()
    {
        return ["Chatbot#1105","Chatbot2#0155","Chatbot3#7913"]
    }

    async addToken(token)
    {
        var bot = await BotDB.findById(mongoose.Types.ObjectId(this.id));
        bot.token = token;
        await bot.save();
    }

    //gestion des tokens (pas tres flex)
    async getToken()
    {
        var bot = await BotDB.findById(this.id);
        console.log(bot.token)
        return bot.token
    }

    getUsername()
    {
        var list=[]
        //recuperer de la db
        return undefined
    }

}



module.exports = Bot