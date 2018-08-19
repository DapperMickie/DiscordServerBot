import { IBot, IBotCommand, IBotCommandHelp, IBotMessage, IBotConfig } from '../api'
import { getRandomInt } from '../utils'
import * as discord from 'discord.js'
import * as fs from 'fs'
import * as suggest from '../models/suggest';
import * as discordUser from '../models/discordUser';

export default class ServerInfoCommand implements IBotCommand {
    private readonly CMD_REGEXP = /^\?suggest/im

    public getHelp(): IBotCommandHelp {
        return { caption: '?suggest', description: '(?suggest [type] [example_suggestion]) Replace [type] with either "Bot", "Website", "General" or "Youtube" depending on what you are leaving a suggesion for. "Bot" is  referring to Dapper Bot. If you are giving a suggestion for Discord Bot tutorials then use "Youtube" for type. ' }
    }

    public init(bot: IBot, dataPath: string): void { }

    public isValid(msg: string): boolean {
        return this.CMD_REGEXP.test(msg)
    }
    
    public async process(msg: string, answer: IBotMessage, msgObj: discord.Message, client: discord.Client, config: IBotConfig, commands: IBotCommand[]): Promise<void> {
        let suggestObject:suggest.suggest = new suggest.suggest();
        let words = msg.split(' ');
        let suggestType = words[1];
        let suggestion = words.slice(2).join(' ');
        switch(suggestType){
            case "Bot":
                suggestObject.Type = suggest.SuggestionTypes.Bot;
                break;
            case "Website":
                suggestObject.Type = suggest.SuggestionTypes.Website;
                break;
            case "General":
                suggestObject.Type = suggest.SuggestionTypes.General;
                break;
            case "Youtube":
                suggestObject.Type = suggest.SuggestionTypes.Youtube;
                break;
            default:
                let wrongFormatEmbed = new discord.RichEmbed()
                    .setTitle("Incorrect Format")
                    .setColor("#ff0000")
                    .addField("Please enter a suggestion category related to your request", "eg. ?suggest Bot Please add a music command to your bot",false)
                    .addField("Replace Bot with either 'Bot', 'Website', 'General' or 'Youtube'","eg. ?suggest Youtube make a video about sprite shaders ",false)
                msgObj.channel.send(wrongFormatEmbed);
                return;
        }
        fs.appendFile('../suggestions.txt', "ID: " + msgObj.author + ", Username: " + msgObj.author.username + ", Suggestion: " + suggestion + "\n", function(err){
            if(err)
            {
                throw err;
            }
            console.log('Updated!');
        })
        msgObj.delete(0);
        answer.setTitle("Thank You For Leaving A Suggestion");
        answer.setColor("#ff0000");
        answer.addField(msgObj.author.username, "Suggested Dapper Dino to: " + suggestion, false);
        answer.addField("Your request has been added to Dapper's video ideas list", "Thanks for your contribution", false);
        answer.setFooter("Sit tight and I might get around to your idea... eventually :D");

        suggestObject.Description = suggestion;
        suggestObject.DiscordUser = new discordUser.discordUser();
        suggestObject.DiscordUser.Username = msgObj.author.username;
        suggestObject.DiscordUser.DiscordId = msgObj.author.id;

        var request = require('request');

        var headers = {
            'User-Agent':       'DapperBot/0.0.1',
            'Content-Type':     'application/json'
        }

        var options = {
            url: 'http://dapperdinoapi.azurewebsites.net/api/suggestion',
            method: 'POST',
            headers: headers,
            json: suggestObject
        }

        console.log(suggestObject);

        request(options, (error:any, response:any, body:any) => {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        })
    }
}