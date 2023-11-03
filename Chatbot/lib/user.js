const mongoose = require('mongoose');
const UserDB = require('../db/schemas/user.js')

class Users
{
    constructor(){}

    async newUser(login)
    {
        const res = await UserDB.exists({login: login})
        console.log(res)
        if(!res)
        {
            var user = new UserDB({login: login})
            await user.save();
            console.log(`User ${login} created.`);
        }
    }

    async getUsers()
    {
        return await UserDB.find()
    }

    async getInfo(idUser)
    {
        var user = UserDB.exists({_id: idUser});
        if(!user)
        {
            return undefined
        }
        else
        {
            var user = await UserDB.findById(idUser);
            return user
        }

    }

    async getAllInfo(login)
    {
        var user = await UserDB.findOne({login: login }, function (err) {
            if (err) {
                user = `The login '${login}' doesn't exist. The dispayed failed.`;
            }
        })
        if(user)
        {
            return user.all_info
        }
        else
        {
            return undefined
        }
    }
        

    async setInfo(login, info)
    {
        var user = await UserDB.findOne({login: login});
        user.all_info = info;
        await user.save();
        //await UserDB.findOneAndUpdate({login : login}, {all_info: info});
    }

    async getListUser()
    {
        var list=[]
        (await UserDB.find()).forEach(user=>list.push(user))
        return list
    }

    async deleteAll()
    {
        await UserDB.deleteMany({})
    }

}

module.exports = new Users