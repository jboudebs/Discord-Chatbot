const express = require('express');
const router = express.Router();

const User = require('../lib/user')
router.get('/', allUser);
router.get('/:idUser', info);
router.post('/',newUser)
router.delete('/', deleteAll);

async function allUser(req, res) {
    await res.json(await User.getUsers())
    console.log(`Users displayed.`)
}

async function info(req, res) {
    const idUser = req.params.idUser;
    const user = await User.getInfo(idUser);
    if (!user)
    {
        console.log(`The user "${idUser}" doesn't exist.`)
        res.json(`The user "${idUser}" doesn't exist.`);
    }
    else
    {
        console.log(`The user "${idUser}" is displayed`)
        res.json(user);

    }
}


async function newUser(req, res) {
    const login = req.body.login
    if(!login)
    {
        res.send('Veuillez remplir le champ login.')
    }
    else
    {
        await User.newUser(login);
        res.send('new user created');
    }
}


async function deleteAll(req,res)
{
    await User.deleteAll();
    text = `All users was deleted from the DB.`;
    console.log(text);
    res.send(text);
}


module.exports = router