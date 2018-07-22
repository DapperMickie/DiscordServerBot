"use strict";

const Discord = require("discord.js");
const SuperAgent = require("superagent");
const fs = require("fs");

let coins = require("../coins.json");

module.exports.run = async(bot,message,args) =>{
    let userCurrency = coins[message.author.id].coins;
    if(userCurrency >= 50)
    {
        coins[message.author.id] = {
            coins: userCurrency - 50
        };

        let{body} = await SuperAgent //Grabs the body element of the HTML on the webpage
            .get(`https://random.dog/woof.json`);

        let embed = new Discord.RichEmbed()
            .setColor("#ff0000")
            .setTitle("Here's a good doggo for youuuu")
            .setDescription("You really deserved this :)")
            .setImage(body.url) //Since the URL of the body is going to be an image from a json file it will actually show a picture inside the embed

        message.channel.send(embed)
            .then(console.log)
            .catch(console.error);
            
        fs.writeFile("../coins.json", JSON.stringify(coins), (err) =>{
            if(err)
            {
                console.log(err)
            }
        });
    }
    else
    {
        message.reply("you currently don't have enough coins to use this command. You only have " + userCurrency + " coins but you need 50 coins to summon a doggo!");
    }
}

module.exports.help = {
    name: "doggo"
}