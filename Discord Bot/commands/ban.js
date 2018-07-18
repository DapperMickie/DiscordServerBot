const Discord = require("discord.js");

module.exports.run = async(bot,message,args) =>{
    let bannedUser = message.guild.member(message.mentions.users.first()) || (message.guild.members.get(args[0]));
    if(!bannedUser)
    {
        message.channel.send("Sorry, I couldn't find that user."); //Makes sure the user exists
        return;
    }
    if(!message.member.hasPermission("MANAGE_MESSAGES"))
    {
        message.channel.send("You don't have the privileges to ban other users!"); //Makes sure the user has the correct permissions to be able to ban other users
        return;
    }
    if(bannedUser.hasPermission("MANAGE_MESSAGES"))
    {
        message.channel.send("That user can't be banned. Nice try."); //Makes sure the user doesn't ban other (in my case) admins or above
        return;
    }
    let reason = args.join(" ").slice(22);
    let embed = new Discord.RichEmbed() //Creates an embed of ban details
        .setDescription("Ban Details")
        .setColor("0xff0000")
        .addField("Banned User:", bannedUser + " with ID: " + bannedUser.id)
        .addField("Banned By:", message.author + " with ID:" + message.author.id)
        .addField("Banned in:", message.channel)
        .addField("Banned at:", message.createdAt)
        .addField("Reason for ban:", reason)
    
    message.delete() //Removes the command message
        .then(console.log)
        .catch(console.error);
    
    kicksAndBansChannel.send(embed) //Sends the official ban report to the kicks and bans channel to be logged for reference
        .then(console.log)
        .catch(console.error);
    message.guild.member(bannedUser).kick(reason) //Actually kick the user from the server
        .then(console.log)
        .catch(console.error);
}

module.exports.help = {
    name: "ban"
}