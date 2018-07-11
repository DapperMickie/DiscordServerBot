const Discord = require("discord.js");

module.exports.run = async(bot,message,args) =>{
    let embed = new Discord.RichEmbed() //Creates an embed with info about the bot
        .setDescription("Bot Information")
        .setColor("0xff0000")
        .setThumbnail(bot.user.displayAvatarURL)
        .addField("My name is DapperBot", "My goal in life is to make your life easier, and more fun :D")
        .addField("I was born on:", bot.user.createdAt)
    message.channel.send(embed);    
}

module.exports.help = {
    name: "botinfo"
}