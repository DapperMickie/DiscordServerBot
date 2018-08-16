import { IBot, IBotCommand, IBotCommandHelp, IBotMessage, IBotConfig } from '../api'
import { getRandomInt } from '../utils'
import * as discord from 'discord.js'
import * as fs from 'fs'

const SuperAgent = require("superagent");
const SuperAgent2 = require("superagent");

export default class GifCommand implements IBotCommand {
    private readonly CMD_REGEXP = /^\?gif/im

    public getHelp(): IBotCommandHelp {
        return { caption: '?gif', description: '(?gif [searchterm] Sends a gif from giphy with your search term' }
    }

    public init(bot: IBot, dataPath: string): void { }

    public isValid(msg: string): boolean {
        return this.CMD_REGEXP.test(msg)
    }
    
    public async process(msg: string, answer: IBotMessage, msgObj: discord.Message, client: discord.Client, config: IBotConfig, commands: IBotCommand[]): Promise<void> {
        let words = msg.split(' ');
        let q = words[1];

        let{body} = await SuperAgent //Grabs the body element of the HTML on the webpage
        .get(`https://api.giphy.com/v1/gifs/search?api_key=3eFQvabDx69SMoOemSPiYfh9FY0nzO9x&q=${q}&offset=1&limit=0`);

        let rand = Math.floor(Math.random() * Math.floor(body.pagination.total_count));
    
        let full = await SuperAgent2
        .get(`https://api.giphy.com/v1/gifs/search?api_key=3eFQvabDx69SMoOemSPiYfh9FY0nzO9x&q=${q}&offset=${rand}&limit=0`);

        console.log(full)
        
        let embed = new discord.RichEmbed()
            .setColor("#ff0000")
            .setTitle("The gif you asked for!")
            .setDescription("Here you go :)")
            .setImage(full.body.data[0].images.original.url) //Since the URL of the body is going to be an image from a json file it will actually show a picture inside the embed

        msgObj.channel.send(embed)
            .then(console.log)
            .catch(console.error);
    }
}