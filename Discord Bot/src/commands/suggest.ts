import { IBot, IBotCommand, IBotCommandHelp, IBotMessage, IBotConfig } from '../api'
import { getRandomInt } from '../utils'
import * as discord from 'discord.js'
import * as fs from 'fs'

export default class ServerInfoCommand implements IBotCommand {
    private readonly CMD_REGEXP = /^\?suggest/im

    public getHelp(): IBotCommandHelp {
        return { caption: '?suggest', description: '(?suggest "example suggestion") Saves your suggestions to a text file on Dapper Dino\'s PC to refer to when in need of video ideas' }
    }

    public init(bot: IBot, dataPath: string): void { }

    public isValid(msg: string): boolean {
        return this.CMD_REGEXP.test(msg)
    }
    
    public async process(msg: string, answer: IBotMessage, msgObj: discord.Message, client: discord.Client, config: IBotConfig, commands: IBotCommand[]): Promise<void> {
        let words = msg.split(' ');
        let suggestion = words.slice(1).join(' ');
        fs.appendFile('../suggestions.txt', "ID: " + msgObj.author + ", Username: " + msgObj.author.username + ", Suggestion: " + suggestion + "\n", function(err){
            if(err)
            {
                throw err;
            }
            console.log('Updated!');
        })
        msgObj.delete(0);
        answer.setTitle("Thank You For Leaving A Suggestion");
        answer.setColor("0xff0000");
        answer.addField(msgObj.author.username, "Suggested Dapper Dino to: " + suggestion, false);
        answer.addField("Your request has been added to Dapper's video ideas list", "Thanks for your contribution", false);
        answer.setFooter("Sit tight and I might get around to your idea... eventually :D");
    }
}