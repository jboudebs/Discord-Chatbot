const express = require('express');
const router = express.Router();

var Bots = require("../lib/bots")
//Bots.fill();

router.get('/', status);
router.post('/', newBot);
router.patch('/', modify);
router.delete('/', deleteBot);
router.patch('/activity', activity);

/**
 * Create a new bot
 * @param {*} req 
 * @param {*} res 
 */
async function newBot(req, res)
{
	const name = req.body.name
	
	if(!name)
	{
		res.send('veuiller remplir le champ "name"')
	}
	else
	{
		console.log(`Creating a new bot named ${name}...`)
		let idBot = await Bots.addBot(name);
		console.log(`A bot named ${name} was created.`)

		let bot = await Bots.getBot(idBot)
		console.log(bot)
		res.json(bot)
	}
	
}

async function modify(req,res)
{
	const idBot = req.body.idBot;
	const idUser = req.body.idUser;
	const token = req.body.token;
	const brainPath = req.body.brain

	if(!idBot)
	{
		res.json("Veuillez remplir les champs 'idUser' et 'idBot' pour assigner un bot à un utilisateur, les champs 'idBot' et 'token' pour donner un le token à son bot, les champs 'idBot' et 'brain' pour mettre un nouveau cerveau au bot.")
	}
	else {if((token!=undefined)&(idBot!=undefined))
	{
		await newToken(req,res)
	}
	if((idUser!=undefined)&(idBot!=undefined))
	{
		await newUser(req,res)
	}
	if((brainPath!=undefined)&(idBot!=undefined))
	{
		await newBrain(req,res)
	}}
}

async function newToken(req,res)
{
	const idBot = req.body.idBot;
	const token = req.body.token;
	await Bots.setToken(String(idBot),token)

	let bot = await Bots.getBot(idBot)
	res.json(bot)

}

async function newUser(req,res)
{
	const idUser = req.body.idUser;
	const idBot = req.body.idBot;
	
	if(!idUser|!idBot)
	{
		res.json("Veuillez remplir les champs 'idUser' et 'idBot'.")
	}
	else
	{
		await Bots.newUser(idUser,String(idBot));
	}
	let bot = await Bots.getBot(idBot)
	console.log(bot)
	res.json(bot)

}

/**
 * Add a new brain or change the current brain
 * @param {*} req 
 * @param {*} res 
 */
async function newBrain(req, res)
{
	const brainPath = req.body.brain
	const idBot = req.body.idBot

	if(!brainPath | !idBot)
	{
		res.send('veuillez remplir les champs "brain" et "idBot"')
	}
	else
	{
		let bot1 = await Bots.getBot(String(idBot))
		if(!bot1)
		{
			text=`The bot ${idBot} doesn't exist.`
		}
		else
		{
			console.log(`The bot ${idBot} is going to have a new brain : ${brainPath}.`)
			Bots.setABrain(String(idBot), brainPath);
			console.log(`The bot ${idBot} has a new brain.`)
			
			text = await Bots.getBot(String(idBot))
		}
		console.log(text)
		res.json(text)
		
	}
}

/**
 * Delete a bot
 * @param {*} req 
 * @param {*} res 
 */
async function deleteBot(req, res)
{
	const idBot = req.body.idBot

	if(!idBot)
	{
		res.send('veuillez remplir le champ "idBot"')
	}
	else
	{
		console.log(`Removing the bot ${idBot} ...`)
		let bot = await Bots.getBot(String(idBot))
		Bots.deleteABot(idBot)
		if(!bot)
		{
			text=`The bot ${idBot} doesn't exist.`
		}
		else
		{
			text=bot
		}
		console.log(text)
		res.json(text)
	}
}
/**
 * change a bot state
 * @param {*} req 
 * @param {*} res 
 */
async function activity(req,res)
{
	var status = req.body.status
	const idBot = req.body.idBot
	console.log(status)
	
	if(!status|!idBot)
	{
		res.send('Veuillez remplir les champs "status" et "idBot". "status" peut être "start" ou "quit".')
	}
	else {
		if (status=="start")
		{
			start(req,res)
		}
		if (status=="quit")
		{
			quit(req,res)
		}
	}
}
/**
 * start a bot
 * @param {*} req 
 * @param {*} res 
 */
async function start(req, res)
{
	const idBot = req.body.idBot
	Bots.startABot(idBot)

	res.send(`start`)
}
/**
 * quit a bot
 * @param {*} req 
 * @param {*} res 
 */
async function quit(req, res)
{
	// API
	// recuperer le bot dans la liste de bots
	// fermer le client discord
	// supprimer l'instance discord du bot
	// supprimer le token du bot

	// DB
	// changer le statut
	// supprimer le token du bot

	const idBot = req.body.idBot

	Bots.quitABot(idBot)

	res.send(`quit`)
}
/**
 * display the bots and their states
 * @param {*} req 
 * @param {*} res 
 */
async function status(req, res)
{
	res.json(await Bots.getBots())
	
	console.log(`Bots displayed`)
}

module.exports = router;