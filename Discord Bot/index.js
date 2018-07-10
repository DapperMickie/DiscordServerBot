const Discord = require("discord.js"); //Importing the discord.js library to let us do all this wonderful stuff
const config = require("./config.json"); //Importing our .json file with out personal variables such as bot token and channel ID's

const bot = new Discord.Client({
    commandPrefix: config.prefix //Change bot prefix from default to our chosen prefix
});

var botChannel; //A variable to store the channel that the bot works in
var welcomeChannel; //A variable to store the channel where the bot welcomes users
var reportsChannel; //A variable to store the channel where users can report bad behavior
var kicksAndBansChannel; //A variable to store the channel that logs all kicks and bans in the server

bot.on("ready", () => {
    bot.user.setActivity('with Dapper Dino', { type: 'PLAYING' }) //Sets the bots' game or whatever status message you want
    botChannel = bot.channels.get(config.botChannel); //Now that the bot is initialized it can find the bot channel
    welcomeChannel = bot.channels.get(config.welcomeChannel); //Now that the bot is initialized it can find the welcome channel
    reportsChannel = bot.channels.get(config.reportsChannel); //Now that the bot is initialized it can find the reports channel
    kicksAndBansChannel = bot.channels.get(config.kicksAndBansChannel); //Now that the bot is initialized it can find the kicks and bans channel
    console.log("Ready to go!");
});

bot.on("guildMemberAdd", function(member){ //Welcoming the user to the server, sending them a PM with rules and such, then giving them the member role
    welcomeChannel.send(member + " welcome to the server :D I've just send you a PM with some details about the server, it would mean a lot if you were to give them a quick read.");
    welcomeChannel.send("Your friend, DapperBot.");
    member.send("Hello " + member.displayName + ". Thanks for joining the server. Here are the server rules:");
    let embed = new Discord.RichEmbed()
        .addField("Rule 1", "Keep the chat topics relevant to the channel you're using")
        .addField("Rule 2", "No harassing others (we're all here to help and to learn)")
        .addField("Rule 3", "No spam advertising (if there's anything you're proud of and you want it to be seen then put it in the showcase channel, but only once)")
        .addField("Rule 4", "Don't go around sharing other people's work claiming it to be your own")
        .addField("Rule 5", "You must only use ?report command for rule breaking and negative behaviour. Abusing this command will result if you being the one who is banned")
        .setThumbnail(bot.user.displayAvatarURL)
        .setColor("0xff0000")
        .setFooter("If these rules are broken then don't be surprised by a ban")
    member.send(embed);
    member.send("If you are happy with these rules then feel free to use the server as much as you like. The more members the merrier :D");
    member.send("That's it from me. I'll see you around :)");
    member.addRole(member.guild.roles.find("name", "Member"));
});

bot.on("message", async(message) => {
    if(message.author.equals(bot.user)) //Makes sure not to reply to itself
    {
        return;
    }
    if(message.content.indexOf(config.prefix) != 0)  //Makes sure we are using the prefix
    {
        return;
    }
    if(message.channel != botChannel)  //Makes sure we are in the correct channel
    {
        return;
    }
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g); //Reduces our message string down into a list of each separate word
    const command = args.shift().toLowerCase();  //Takes our actual command word and makes it lowercase to compare later to our commands (not case sensitive)
    console.log(args);
    console.log(command);
    if(command == "ping")
    {
        let m = await message.channel.send("Ping?"); //Sends a temporary message
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`); 
        //Once the message has been sent and recieved it then calcualtes lantency and edits the previous message to inform the user
        return;
    }
    if(command == "commands")
    {
        message.reply("I have send you a PM with a list of my commands, I hope this helps :D");
        message.author.send("I haven't set this up yet but feel free to chat to me as much as you like. P.S I'll probably be too busy to respond."); //To-do
        return;
    }
    if(command == "mirror")
    {
        message.reply("you're looking beautiful today :)"); //Sends a heart-warming response
        let m = await message.channel.send(message.author.avatarURL); //Waits until it has sent our avatar icon then reacts to it with the emoji
        m.react('😍')
            .then(console.log)
            .catch(console.error)
        return;
    }
    if(command == "botinfo")
    {
        let embed = new Discord.RichEmbed() //Creates an embed with info about the bot
            .setDescription("Bot Information")
            .setColor("0xff0000")
            .setThumbnail(bot.user.displayAvatarURL)
            .addField("My name is DapperBot", "My goal in life is to make your life easier, and more fun :D")
            .addField("I was born on:", bot.user.createdAt)
        message.channel.send(embed);
        return;
    }
    if(command == "serverinfo")
    {
        let embed = new Discord.RichEmbed() //Creates an embed with info about the server
            .setDescription("Server Information")
            .setColor("0xff0000")
            .setThumbnail(message.guild.iconURL)
            .addField("The best server ever:", message.guild.name)
            .addField("Was created on:", message.guild.createdAt)
            .addField("You joined us on:", message.member.joinedAt)
            .addField("Our member count is currently at:", message.guild.memberCount)
        message.channel.send(embed);
        return;
    }
    if(command == "report")
    {
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
        return;
    }
    if(command == "kick")
    {
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
        return;
    }
    if(command == "ban")
    {
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
        
        message.delete(); //Removes the command message
        kicksAndBansChannel.send(embed); //Sends the official ban report to the kicks and bans channel to be logged for reference
        message.guild.member(bannedUser).kick(reason); //Actually kick the user from the server
        return;
    }
});

bot.login(config.token); //Connect out code to our bot account