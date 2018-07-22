"use strict";

const Discord = require("discord.js"); //Importing the discord.js library to let us do all this wonderful stuff
const config = require("./config.json"); //Importing our .json file with out personal variables such as bot token and channel ID's
const fs = require("fs"); //Importing the fs library to let us use the file system
const bot = new Discord.Client({
    commandPrefix: config.prefix //Change bot prefix from default to our chosen prefix
});

let coins = require("./coins.json");
let xp = require("./xp.json");

bot.commands = new Discord.Collection(); //Creates new collection to store our commands

fs.readdir("./commands/",(err,files) =>{
    if(err) //Makes sure there isn't a problem reading the directory
    {
        console.log(err);
    }
    else
    {
        let jsFile = files.filter(f => f.split(".").pop() == "js"); //Gets all js files in the commands folder
        if(jsFile.length <= 0) //Makes sure that it can actually at least 1 file in the folder
        {
            console.log("Missing path to commands file."); 
            return;
        }
        jsFile.forEach((f,i) => { //Loops for each js file in commands
            let props = require(`./commands/${f}`); //Gets access to the js files
            if(props) //Makes sure that it actuall can access the files and doesn't equal null
            {
                console.log(`${f} loaded!`);
                bot.commands.set(props.help.name, props); //Adds the required data from our files inside the commands folder to the bot.commands collection
            }
        })
    }
});

var botChannel; //A variable to store the channel that the bot works in
var welcomeChannel; //A variable to store the channel where the bot welcomes users
global.reportsChannel; //A variable to store the channel where users can report bad behavior
global.kicksAndBansChannel; //A variable to store the channel that logs all kicks and bans in the server

bot.on("ready", () => {
    bot.user.setActivity('with Dapper Dino', { type: 'PLAYING' }) //Sets the bots' game or whatever status message you want
    botChannel = bot.channels.get(config.botChannel); //Now that the bot is initialized it can find the bot channel
    welcomeChannel = bot.channels.get(config.welcomeChannel); //Now that the bot is initialized it can find the welcome channel
    reportsChannel = bot.channels.get(config.reportsChannel); //Now that the bot is initialized it can find the reports channel
    kicksAndBansChannel = bot.channels.get(config.kicksAndBansChannel); //Now that the bot is initialized it can find the kicks and bans channel
    console.log("Ready to go!");
});

bot.on("guildMemberAdd", async member =>{ //Welcoming the user to the server, sending them a PM with rules and such, then giving them the member role
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
    member.send("Use the command '?commands' to recieve a PM with all my commands and how to use them");
    member.send("(I am currently being tested on by my creator so if someone goes wrong with me, don't panic, i'll be fixed. That's it from me. I'll see you around :)");
    member.addRole(member.guild.roles.find("name", "Member"));
});

bot.on("guildMemberRemove", async member =>{
    welcomeChannel.send(member + ", it's a shame you had to leave us. We'll miss you :("); //Sends a message when a user leaves the server
});

bot.on("message", async(message) => {
    if(message.author.equals(bot.user)) //Makes sure not to reply to itself
    {
        return;
    }
    if(!coins[message.author.id]) //Makes sure the user is part of the coins.json file
    {
        coins[message.author.id] = { //If they aren't then we'll create them a new object with a 'coins' property that starts at 0
            coins: 0
        };
    }
    let coinAmt = Math.floor(Math.random() * 15) + 1; // Picks a coin value between 1 and 15
    let chance = Math.floor(Math.random() * 2) + 1; // Has a 50% chance to give coins
    if(chance == 1) // This number doesn't matter so long as it's between 1 and 2
    {
        coins[message.author.id] = {
            coins: coins[message.author.id].coins + coinAmt // Adds our coin value to our current coin balance
        };
    }
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) =>{
        if(err)
        {
            console.log(err);
        }
    });
    let xpAmt = Math.floor(Math.random() * 10) + 5;
    if(!xp[message.author.id])
    {
        xp[message.author.id] = {
            xp: 0,
            level: 1
        };
    }

    let curxp = xp[message.author.id].xp; // Users current xp
    let curlvl = xp[message.author.id].level; // Users current level
    let nxtLvl = (xp[message.author.id].level * 200) * 1.2; // User's required xp for level up
    xp[message.author.id].xp = curxp + xpAmt; // Increase the user's xp
    if(nxtLvl <= xp[message.author.id].xp) // Check for level up
    {
        xp[message.author.id].level = curlvl + 1; // Incriment level
        let embed = new Discord.RichEmbed()
            .setTitle("Level Up!")
            .setColor("ff00ff")
            .addField("Congratulations", message.author)
            .addField("New Level:", curlvl + 1)
        message.channel.send(embed).then(msg =>{
            msg.delete(5000);
        });
    }
    fs.writeFile("./xp.json", JSON.stringify(xp), (err) =>{
        if(err)
        {
            console.log(err);
        }
    });
    if(message.content.indexOf(config.prefix) != 0) //Makes sure we are using the prefix
    {
        return;
    } 
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g); //Reduces our message string down into a list of each separate word
    const command = args.shift().toLowerCase(); //Takes our actual command word and makes it lowercase to compare later to our commands (not case sensitive)
    console.log(args);
    console.log(command);

    let commandFile = bot.commands.get(command);  //Sets the variable equal to the file in commands that correlates to our inputed command
    if(commandFile) //Makes sure it exists
    {
        commandFile.run(bot,message,args); //Runs the command whilst also passing in our message and arguments to be used in the command itself
    }
});

bot.login(config.token); //Connect out code to our bot account