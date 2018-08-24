import { IBot, IBotCommand, IBotCommandHelp, IBotMessage, IBotConfig } from '../api'
import { getRandomInt } from '../utils';
import * as discord from 'discord.js';
import { faq } from '../models/faq';
import { resourceLink } from '../models/resourceLink';
import { apiRequestHandler } from '../apiRequestHandler';
import { dialogueHandler, dialogueStep } from '../dialogueHandler';

export default class AddFaqCommand implements IBotCommand {
    private readonly CMD_REGEXP = /^\?addfaq/im

    public getHelp(): IBotCommandHelp {
        return { caption: '?addfaq', description: 'ADMIN ONLY - Creates a new entry to the FAQ channel, follow the prompts' }
    }

    public init(bot: IBot, dataPath: string): void { }

    public isValid(msg: string): boolean {
        return this.CMD_REGEXP.test(msg)
    }

    cbFunc = (response: any, data: any) => {
        if (data == null) {
            data = new Array<string>(response);
        }
        else {
            data.push(response);
        }
        console.log(data.join(", "))
        return data;
    };

    httpFunc = (response: any, data: any, ticketuser: any, config: any) => {
        let faqObject:faq = new faq();

        faqObject.Question = data[0];
        faqObject.Answer = data[1];
        if(data[2] == 'yes' || data[2] == 'Yes'){
            faqObject.ResourceLink = new resourceLink();
            faqObject.ResourceLink.Link = data[3];
            faqObject.ResourceLink.DisplayName = data[4];
        }

        new apiRequestHandler().RequestAPI("POST", faqObject, 'https://dapperdinoapi.azurewebsites.net/api/faq', config);

        return data;
    };
    
    public async process(msg: string, answer: IBotMessage, msgObj: discord.Message, client: discord.Client, config: IBotConfig, commands: IBotCommand[]): Promise<void> {
        if(!msgObj.member.hasPermission("MANAGE_MESSAGES"))
        {
            msgObj.channel.send("You don't have the privileges to add to the FAQ channel!"); //Makes sure the user has the correct permissions to be able to use this command
            return;
        }
  
        let collectedInfo;
        //datacallback

        let test: dialogueStep = new dialogueStep("what would you like the title of your ticket to be?", "Title Successful", "Title Unsuccessful", this.cbFunc, collectedInfo);

        let handler = new dialogueHandler([], collectedInfo);

        collectedInfo = await handler.GetInput(msgObj.channel as discord.TextChannel, msgObj.member, config as IBotConfig);

        let faqEmbed = new discord.RichEmbed()
            .setTitle("-Q: " + collectedInfo[0])
            .setDescription("-A: " + collectedInfo[1])
        if(collectedInfo[2] == 'yes' || collectedInfo == 'Yes')
        {
            faqEmbed.addField("Useful Resource: ", "[" + collectedInfo[4] + "](" + collectedInfo[3] + ")");
        }
        msgObj.channel.send(faqEmbed).then(newMsg =>{
            msgObj.delete(0);
        });
    }
}