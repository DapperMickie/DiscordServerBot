import { IBot, IBotCommand, IBotCommandHelp, IBotMessage } from '../api'
import { getRandomInt } from '../utils'
import * as discord from 'discord.js'
import { createSecurePair } from 'tls';
import * as fs from "fs"

const xp = require("../../xp.json");

export default class LevelCommand implements IBotCommand {
    private readonly CMD_REGEXP = /^\?level/im

    public getHelp(): IBotCommandHelp {
        return { caption: 'Level Command', description: 'Lets you know your level and exp in the server' }
    }

    public init(bot: IBot, dataPath: string): void { }

    public isValid(msg: string): boolean {
        return this.CMD_REGEXP.test(msg)
    }
    
    public async process(msg: string, answer: IBotMessage, msgObj: discord.Message, client: discord.Client): Promise<void> {
        if(!xp[msgObj.author.id]){
            xp[msgObj.author.id] = {
                xp: 0,
                level: 1
            };
        }
        let curXp = xp[msgObj.author.id].xp;
        let curLvl = xp[msgObj.author.id].level;
        let nxtLvlXp = (curLvl * 200) * 1.2;
        let difference = nxtLvlXp - curXp;

        let levelEmbed = new discord.RichEmbed()
            .setTitle(msgObj.author.username)
            .setColor("#ff00ff")
            .addField("Level", curLvl, true)
            .addField("XP", curXp, true)
            .setFooter(`${difference} XP until level up`, msgObj.author.displayAvatarURL)

        fs.writeFile("../../xp.json", JSON.stringify(xp), (err) =>{
            if(err)
            {
                console.log(err);
            }
        })
    }
}