const Discord = require("discord.js");

module.exports.run = async(bot,message,args) =>{
    let userCurrency = coins[message.author.id].coins;
    if(userCurrency >= 50)
    {
        coins[message.author.id] = {
            coins: userCurrency - 50
        };
        message.reply("you're looking beautiful today :)"); //Sends a heart-warming response
        let m = await message.channel.send(message.author.avatarURL); //Waits until it has sent our avatar icon then reacts to it with the emoji
        m.react('😍')
            .then(console.log)
            .catch(console.error)
        fs.writeFile("./coins.json", JSON.stringify(coins), (err) =>{
            if(err)
            {
                console.log(err)
            }
        });
    }
    else
    {
        message.reply("you currently don't have enough coins to use this command. You only have " + userCurrency + " coins but you need 50 coins to recieve a heartwarming compliment!");
    }

}

module.exports.help = {
    name: "mirror"
}