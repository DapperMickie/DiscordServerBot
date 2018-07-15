const Discord = require("discord.js");

module.exports.run = async(bot,message,args) =>{
    message.reply("I have send you a PM with a list of my commands, I hope this helps :D");
    message.author.send("Our server has a currency system where you can earn from being active in the chats and helping others out. Currently you can spend the currency on using the 'fun' commands and you will be able to spend them on upcoming features.")
    embed = new Discord.RichEmbed()
        .setTitle("Dapper Dino Coding Server Commands")
        .setColor("#ff0000")
        .addField("?ban '@user'","Bans the mentioned user. (Admin Only).")
        .addField("?botinfo","Dapper Bot will introduce himself to you.")
        .addField("?coins","With this you can view your current coin balance.")
        .addField("?commands","That's how you got here.")
        .addField("?doggo","(Price: 50 coins) Dapper Bot will send a random Doggo picture to the channel because you've been such a good boy just like you Doggo you're about to recieve :D.")
        .addField("?kick '@user'","Kicks the mentioned user. (Admin Only).")
        .addField("?mirror","(Price: 50 coins) Dapper Bot will try and make you feel better about yourself, he's a good friend.")
        .addField("?ping","Plays ping-pong with the bot excpet the only difference is that he then feels the need to tell you the speed of the hit afterwards. Oh well.")
        .addField("?report '@user' 'reason'","Reports the mentioned user so that the admins can decide their fate. Do not abuse this command.")
        .addField("?serverinfo","Useless information about the server that you probably don't care about. But hey. It's here if you want to know. Just in case.")
    message.author.send(embed)
        .then(console.log)
        .catch(console.error);
}

module.exports.help = {
    name: "commands"
}