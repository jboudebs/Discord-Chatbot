require('dotenv').config();
const Bot = require("./bot")
const mongoose = require('mongoose');

const BotsDB = require("../db/schemas/bot");

const util = require('util');

class Bots
{
    constructor()
    {
        this.test = null;
        this.bots = new Map();
        this.fill().then(console.log('You can start!'))
    }

    async fill()
    {
        await BotsDB.deleteMany({})//.then(()=>{
        //var list = await BotsDB.findOne({})
        //if(!list)
        //{
            await this.fillDB();
        //}
        /*
        mongoose.connection.on('open',async ()=>{
            await this.recover()
            console.log("The data is in the nodeJS API")
        })*/
        
    //})
    }

    async fillDB()
    {
        var id = await this.addBot("Chatbot#1105")
        await this.bots.get(String(id)).addToken(process.env.TOKEN1)
        id = await this.addBot("Chatbot2#0155")
        await this.bots.get(String(id)).addToken(process.env.TOKEN2)
        id = await this.addBot("Chatbot3#7913")
        await this.bots.get(String(id)).addToken(process.env.TOKEN3)
        
        console.log("Bots examples filled in DB.")
    }

    async recover()
    {
        let bots = await BotsDB.find()
        for(let bot of bots){
            var new_bot = new Bot()
            await new_bot.recover(bot)
            this.bots.set(String(new_bot.id), new_bot)
        }
        console.log(util.inspect(this.bots,{depth: 1}));
    }
    
    async addBot(name)
    {
        console.log("Adding a bot to the list of bots.")
        var new_bot = new Bot()
        await new_bot.newBotDB(name)
        this.bots.set(String(new_bot.id),new_bot)
        //console.log(util.inspect(this.bots,{depth: 1}));
        return new_bot.id
    }

    async getBot(id)
    {
        //this.todos.forEach(logMapElements);
        if (!this.bots.get(id))
        {
            return undefined
        }
        return await this.bots.get(id).get();
    }

    async setToken(id,token)
    {
        if (!this.bots.get(id))
        {
            console.log(`This id ${id} doesn't exist.`)
            return undefined
        }
        await this.bots.get(id).addToken(token);
    }

    async setABrain(id, brainPath)
    {        
        if (!this.bots.get(id))
        {
            console.log(`This id ${id} doesn't exist.`)
            return undefined
        }
        await this.bots.get(id).setBrain(brainPath)
    }

    async deleteABot(id)
    {
        if(!this.bots.get(id))
        {
            return "doesn't exist"
        }

        await this.bots.get(id).delete()
        this.bots.delete(id)
    }

    async getBots()
    {
        return await BotsDB.find()
    }

    async startABot(id)
    {
        await this.bots.get(id).start()
    }

    async quitABot(id)
    {
        await this.bots.get(id).quit()
    }

    async newUser(idUser,id)
    {
        await this.bots.get(id).newUser(idUser);
    }
    
    deletebots(){
        this.bots.clear();
    }
    
}

function logMapElements(value, key, map)
{
    console.log("m["+key+"] = "+JSON.stringify(value));
}

module.exports = new Bots()
