import { IBot, IBotCommand, IBotCommandHelp, IBotMessage, IBotConfig } from '../api'
import { getRandomInt } from '../utils'
import * as discord from 'discord.js'
import * as fs from 'fs'
import * as ticket from '../models/ticket';
import * as applicant from '../models/applicant';
import * as apiRequestHandler from '../apiRequestHandler';
import * as dialogueHandler from '../dialogueHandler';

export default class TicketCommand implements IBotCommand {
    private readonly CMD_REGEXP = /^\?ticket/im

    public getHelp(): IBotCommandHelp {
        return { caption: '?ticket', description: 'Creates a ticket' }
    }

    public init(bot: IBot, dataPath: string): void { }

    public isValid(msg: string): boolean {
        return this.CMD_REGEXP.test(msg)
    }
    
    cbFunc = (response: string, data?: Array<string>) => {
        if(data == null){
            data = new Array<string>(response);
        }
        else{
            data.push(response);
        }
        console.log(data.join(", "))
        return data;
    };

    public async process(msg: string, answer: IBotMessage, msgObj: discord.Message, client: discord.Client, config: IBotConfig, commands: IBotCommand[]): Promise<void> {

        let ticketObject:ticket.ticket = new ticket.ticket();
        ticketObject.Applicant = new applicant.applicant();

        let collectedInfo;
        
        let test:dialogueHandler.dialogueStep = new dialogueHandler.dialogueStep(answer);

        let handler = new dialogueHandler.dialogueHandler([test], collectedInfo);

        handler.GetInput(msgObj.channel as discord.TextChannel);

        

        /*
        let ticketInfo = msg.split('|');
        let ticketSubject = ticketInfo[1];
        let ticketDescription = ticketInfo[2];


        ticketObject.Subject = ticketSubject;
        ticketObject.Description = ticketDescription;
        ticketObject.Applicant = new applicant.applicant();
        ticketObject.Applicant.Username = msgObj.author.username;
        ticketObject.Applicant.DiscordId = msgObj.author.id;
        
        new apiRequestHandler.apiRequestHandler().RequestAPI("POST", ticketObject, 'https://dapperdinoapi.azurewebsites.net/api/ticket', config);
        */
    }
}