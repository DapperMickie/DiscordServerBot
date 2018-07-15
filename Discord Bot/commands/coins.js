const Discord = require("discord.js");
const coins = require("../coins.json");

module.exports.run = async(bot,message,args) =>{
    if(!coins[message.author.id])
    {
        coins[message.author.id] = {
            coins: 0
        };
    }
    let userCoins = coins[message.author.id].coins;

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