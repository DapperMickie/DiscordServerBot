import { IBot, IBotCommand, IBotCommandHelp, IBotMessage, IBotConfig } from '../api'
import { getRandomInt } from '../utils';
import * as discord from 'discord.js';
import * as faq from '../models/faq';
import * as resourceLink from '../models/resourceLink';

export default class AddFaqCommand implements IBotCommand {
    private readonly CMD_REGEXP = /^\?addfaq/im

    public getHelp(): IBotCommandHelp {
        return { caption: '?addfaq', description: 'ADMIN ONLY - (?addfaq [question] [answer] [url(optional)] [url_displayname(optional)]) to add to the FAQ channel which is sync\'d to our website' }
    }

    public init(bot: IBot, dataPath: string): void { }

    public isValid(msg: string): boolean {
        return this.CMD_REGEXP.test(msg)
    }
    
    public async process(msg: string, answer: IBotMessage, msgObj: discord.Message, client: discord.Client, config: IBotConfig, commands: IBotCommand[]): Promise<void> {
        let faqInfo = msg.split('|');
        let faqQuestion = faqInfo[1];
        let faqAnswer = faqInfo[2];
        let faqURL = faqInfo[3];
        let faqURLDisplayname = faqInfo[4];
        let faqEmbed = new discord.RichEmbed()
            .setTitle("-Q: " + faqQuestion)
            .setDescription("-A: " + faqAnswer)
        if(faqURL)
        {
            faqEmbed.addField("Useful Resource: ", "[" + faqURLDisplayname + "](" + faqURL + ")");
        }
        msgObj.channel.send(faqEmbed).then(newMsg =>{
            msgObj.delete(0);
        });

        let faqObject:faq.faq = new faq.faq();

        faqObject.Question = faqQuestion;
        faqObject.Answer = faqAnswer;
        if(faqURL){
            console.log(faqURL);
            console.log(faqURLDisplayname);
            faqObject.ResourceLink = new resourceLink.resourceLink();
            faqObject.ResourceLink.Link = faqURL;
            faqObject.ResourceLink.DisplayName = faqURLDisplayname;
            console.log(faqObject);
        }

        var request = require('request');

        var headers = {
            'User-Agent':       'DapperBot/0.0.1',
            'Content-Type':     'application/json'
        }

        var options = {
            url: 'http://dapperdinoapi.azurewebsites.net/api/faq',
            method: 'POST',
            headers: headers,
            json: faqObject
        }

        request(options, (error:any, response:any, body:any) => {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                console.log(body)
            }
        })
    }
}