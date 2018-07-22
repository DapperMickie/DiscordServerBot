"use strict";

const Discord = require("discord.js");
const SuperAgent = require("superagent");
const SuperAgent2 = require("superagent");
const fs = require("fs");

let coins = require("../coins.json");

module.exports.run = async(bot,message,args) =>{
    let userCurrency = coins[message.author.id].coins;
    if(userCurrency >= 50)
    {
        coins[message.author.id] = {
            coins: userCurrency - 50
        };

        let q = args[0];

        let{body} = await SuperAgent //Grabs the body element of the HTML on the webpage
            .get(`https://api.giphy.com/v1/gifs/search?api_key=3eFQvabDx69SMoOemSPiYfh9FY0nzO9x&q=${q}&offset=1&limit=0`);

        let rand = Math.floor(Math.random() * Math.floor(body.pagination.total_count));
        
        let full = await SuperAgent2 //Grabs the body element of the HTML on the webpage
            .get(`https://api.giphy.com/v1/gifs/search?api_key=3eFQvabDx69SMoOemSPiYfh9FY0nzO9x&q=${q}&offset=${rand}&limit=0`);

        let embed = new Discord.RichEmbed()
            .setColor("#ff0000")
            .setTitle("The gif you asked for!")
            .setDescription("You really deserved this :)")
            .setImage(full.body.data[0].images.original.url) //Since the URL of the body is going to be an image from a json file it will actually show a picture inside the embed

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
        message.reply("you currently don't have enough coins to use this command. You only have " + userCurrency + " coins but you need 50 coins to summon a gif!");
    }
}

module.exports.help = {
    name: "gif"
}