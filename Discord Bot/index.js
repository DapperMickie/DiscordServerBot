const Discord = require("discord.js");
const config = require("./config.json");

const bot = new Discord.Client({
    commandPrefix: config.prefix
});

var botChannel; //A variable to store the channel that the bot works in

bot.on("ready", () => {
    bot.user.setActivity('with Dapper Dino', { type: 'PLAYING' }) //Sets the bots' game or whatever status message you want
    botChannel = bot.channels.get(config.botChannel); //Now that the bot is initialized it can find the bot channel
    console.log("Ready to go!");
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
        const m = await message.channel.send("Ping?"); //Sends a temporary message
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`); 
        //Once the message has been sent and recieved it then calcualtes lantency and edits the previous message to inform the user
    }
});

bot.login(config.token);