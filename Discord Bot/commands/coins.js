const Discord = require("discord.js");
const c = require("../coins.json");

module.exports.run = async(bot,message,args) =>{
    if(!c[message.author.id])
    {
        c[message.author.id] = {
            coins: 0
        };
    }
    let userCoins = c[message.author.id].coins;

    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor('#00ff00')
        .addField("💰", userCoins)
    message.channel.send(embed).then(msg =>{
        message.delete(0)
        msg.delete(5000)
    });
}

module.exports.help = {
    name: "coins"
}