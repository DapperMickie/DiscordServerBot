const Discord = require("discord.js");

module.exports.run = async(bot,message,args) =>{
    let reportedUser = message.guild.member(message.mentions.users.first()) || (message.guild.members.get(args[0]));
    if(!reportedUser)
    {
        message.channel.send("Sorry, I couldn't find that user."); //Makes sure user exists
        return;
    }
    let reason = args.join(" ").slice(22);
    let embed = new Discord.RichEmbed() //Creates embed of report details
        .setDescription("Report Details")
        .setColor("0x191a1c")
        .addField("Reported User:", reportedUser + " with ID: " + reportedUser.id)
        .addField("Reported By:", message.author + " with ID: " + message.author.id)
        .addField("Report in:", message.channel)
        .addField("Reported at:", message.createdAt)
        .addField("Reason for report:", reason)
        
    message.delete(); //Removes the command message
    reportsChannel.send(embed); //Sends the official report embed to the reports channel to be reviewed
}

module.exports.help = {
    name: "report"
}