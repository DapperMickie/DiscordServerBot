const Discord = require("discord.js");

module.exports.run = async(bot,message,args) =>{
    let embed = new Discord.RichEmbed() //Creates an embed with info about the server
        .setDescription("Server Information")
        .setColor("0xff0000")
        .setThumbnail(message.guild.iconURL)
        .addField("The best server ever:", message.guild.name)
        .addField("Was created on:", message.guild.createdAt)
        .addField("You joined us on:", message.member.joinedAt)
        .addField("Our member count is currently at:", message.guild.memberCount)
    message.channel.send(embed)
        .then(console.log)
        .catch(console.error);
}

module.exports.help = {
    name: "serverinfo"
}