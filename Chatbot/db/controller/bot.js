const Bot = require('../db/schemas/bot.js')

async function newBot(name)
{
    const new_Bot = await new Bot({"name" : name})
    await new_Bot.save()
    return new_Bot
}



module.exports = Bot;