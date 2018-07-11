const Discord = require("discord.js");

module.exports.run = async(bot,message,args) =>{
    message.reply("I have send you a PM with a list of my commands, I hope this helps :D");
    message.author.send("I haven't set this up yet but feel free to chat to me as much as you like. P.S I'll probably be too busy to respond."); //To-do
}

module.exports.help = {
    name: "commands"
}