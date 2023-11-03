# Chatbot

Projet de Services Web en NodeJS : création et administration de Chatbot avec Rivescript (https://www.rivescript.com/), Discord (https://discord.js.org/#/) et mongoose (https://mongoosejs.com/).

### How to lauch

* getting the libraries :
> $root/directory> npm install

* on windows :
MongoDB has to be install : https://www.mongodb.com/fr, and an instance must be up.

* starting the API : 
> $root/directory> npm run run

### How to use

When you start the API, the DB is filled with bots examples from the following server :
https://discord.gg/yPXwY3f
(This is an invitation link.)

The API works only in this server.

* Bot manager :
> http://localhost:3000/bot 

You can :
1) GET : display all the bot in the DB.
2) POST : add in the body the following keys :
    * name to add a new bot to the API. The name should be the name of the Discord bot, for instance Chatbot#1111.
3) PATCH : add in the body the following keys :
    * idBot and idUser to assign a user to a bot. These has to be the id from the DB.
    * idBot and token in order to connect the bot. The idBot has to be the id from the DB and the token must be the one given for the bot by Discord
    * idBot and brain in order to add or change the brain of the bot. The idBot has to be the id from the DB and the brain must be a real path.
4) DELETE : add in the body the following keys :
    * idBot to delete the bot. The idBot has to be the id from the DB.

> http://localhost:3000/bot/activity

You can :
1) PATCH : add in the body the following keys :
    * idBot and status to start or disconnect a bot. The idBot has to be the id from the DB and status must be start, to start the bot, or quit, to disconnect the bot.

* User manager :
> http://localhost:3000/user

You can :
1) GET : display all the user and their info collected by the bots.
2) GET : add in the params the following keys :
    * idUser to display the user's info. The idUser must be the one from the DB.
3) POST : add in the body the following keys :
    * login to add a Discord user to the DB. The login must be the Discord login, for instance Julie#1111.
4) DELETE : delete all the users.

### Not Handle

1) Be careful not to assign multiple bots to a single user, otherwise the the bots will respond at the same time.
2) When changing brains, instead of overwriting the current brain, he concats the new with the older one.
3) ...