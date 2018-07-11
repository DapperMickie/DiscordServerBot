const Discord = require("discord.js");

module.exports.run = async(bot,message,args) =>{
    message.reply("you're looking beautiful today :)"); //Sends a heart-warming response
    let m = await message.channel.send(message.author.avatarURL); //Waits until it has sent our avatar icon then reacts to it with the emoji
    m.react('😍')
        .then(console.log)
        .catch(console.error)
}

module.exports.help = {
    name: "mirror"
}