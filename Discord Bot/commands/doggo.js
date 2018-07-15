const Discord = require("discord.js");
const SuperAgent = require("superagent");

module.exports.run = async(bot,message,args) =>{
    let{body} = await SuperAgent //Grabs the body element of the HTML on the webpage
        .get(`https://random.dog/woof.json`);

    let embed = new Discord.RichEmbed()
        .setColor("#ff0000")
        .setTitle("Here's a good doggo for youuuu")
        .setDescription("You really deserved this :)")
        .setImage(body.url) //Since the URL of the body is going to be an image from a json file it will actually show a picture inside the embed

    message.channel.send(embed)
        .then(console.log)
        .catch(console.error);
}

module.exports.help = {
    name: "doggo"
}