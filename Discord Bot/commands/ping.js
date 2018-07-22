"use strict";

const Discord = require("discord.js");

module.exports.run = async(bot,message,args) =>{
    let m = await message.channel.send("Ping?"); //Sends a temporary message
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`)
        .then(console.log)
        .catch(console.error);
    
    //Once the message has been sent and recieved it then calcualtes lantency and edits the previous message to inform the user
}

module.exports.help = {
    name: "ping"
}