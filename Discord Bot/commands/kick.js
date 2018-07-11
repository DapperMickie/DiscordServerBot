const Discord = require("discord.js");

module.exports.run = async(bot,message,args) =>{
    let kickedUser = message.guild.member(message.mentions.users.first()) || (message.guild.members.get(args[0]));
    if(!kickedUser)
    {
        message.channel.send("Sorry, I couldn't find that user."); //Makes sure the user exists
        return;
    }
    if(!message.member.hasPermission("MANAGE_MESSAGES"))
    {
        message.channel.send("You don't have the privileges to kick other users!"); //Makes sure the user has the correct permissions to be able to kick other users
        return;
    }
    if(kickedUser.hasPermission("MANAGE_MESSAGES"))
    {
        message.channel.send("That user can't be kicked. Nice try."); //Makes sure the user doesn't kick other (in my case) admins or above
        return;
    }
    let reason = args.join(" ").slice(22);
    let embed = new Discord.RichEmbed() //Creates embed of kick details
        .setDescription("Kick Details")
        .setColor("0xdd6f1a")
        .addField("Kicked User:", kickedUser + " with ID: " + kickedUser.id)
        .addField("Kicked By:", message.author + " with ID:" + message.author.id)
        .addField("Kicked in:", message.channel)
        .addField("Kicked at:", message.createdAt)
        .addField("Reason for kick:", reason)
    
    message.delete(); //Removes the command message
    kicksAndBansChannel.send(embed); //Sends the official kick report to the kicks and bans channel to be logged for reference
    message.guild.member(kickedUser).kick(reason); //Actually kick the user from the server
}

module.exports.help = {
    name: "kick"
}