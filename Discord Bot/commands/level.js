"use strict";

const Discord = require("discord.js");
const xp = require("../xp.json");

module.exports.run = async(bot,message,args) =>{
    if(!xp[message.author.id])
    {
        xp[message.author.id] = {
            xp: 0,
            level: 0
        };
    }
    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvlXp = (curlvl * 200) * 1.2
    let difference = nxtLvlXp - curxp;

    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor("#ff00ff")
        .addField("Level", curlvl, true)
        .addField("XP", curxp, true)
        .setFooter(`${difference} XP until level up`, message.author.displayAvatarURL);

    message.channel.send(embed).then(msg => {
        message.delete(0);
        msg.delete(5000);
    });
}

module.exports.help = {
    name: "level"
}