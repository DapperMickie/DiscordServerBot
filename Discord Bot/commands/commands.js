const Discord = require("discord.js");

module.exports.run = async(bot,message,args) =>{
    message.reply("I have send you a PM with a list of my commands, I hope this helps :D");
    embed = new Discord.RichEmbed()
        .setTitle("Dapper Dino Coding Server Commands")
        .setColor("#ff0000")
        .addField("?ban '@user'","Bans the mentioned user. (Admin Only).")
        .addField("?botinfo","Dapper Bot will introduce himself to you.")
        .addField("?commands","That's how you got here.")
        .addField("?doggo","Dapper Bot will send a random Doggo picture to the channel because you've been such a good boy just like you Doggo you're about to recieve :D.")
        .addField("?kick '@user'","Kicks the mentioned user. (Admin Only).")
        .addField("?mirror","Dapper Bot will try and make you feel better about yourself, he's a good friend.")
        .addField("?ping","Plays ping-pong with the bot excpet the only difference is that he then feels the need to tell you the speed of the hit afterwards. Oh well.")
        .addField("?report '@user' 'reason'","Reports the mentioned user so that the admins can decide their fate. Do not abuse this command.")
        .addField("?serverinfo","Useless information about the server that you probably don't care about. But hey. It's here if you want to know. Just in case")
    message.author.send(embed)
        .then(console.log)
        .catch(console.error);
}

module.exports.help = {
    name: "commands"
}