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
        return { caption: '?ticket', description: '(?ticket |[Subject]|[Description]) Creates a ticket' }
    }

    public init(bot: IBot, dataPath: string): void { }

    public isValid(msg: string): boolean {
        return this.CMD_REGEXP.test(msg)
    }
    
    public async process(msg: string, answer: IBotMessage, msgObj: discord.Message, client: discord.Client, config: IBotConfig, commands: IBotCommand[]): Promise<void> {

        let handler = new dialogueHandler.dialogueHandler();

        let x = await handler.GetInput(msgObj.channel as discord.TextChannel);
        console.log(x);


        /*
        let ticketInfo = msg.split('|');
        let ticketSubject = ticketInfo[1];
        let ticketDescription = ticketInfo[2];

        let ticketObject:ticket.ticket = new ticket.ticket();
        ticketObject.Subject = ticketSubject;
        ticketObject.Description = ticketDescription;
        ticketObject.Applicant = new applicant.applicant();
        ticketObject.Applicant.Username = msgObj.author.username;
        ticketObject.Applicant.DiscordId = msgObj.author.id;
        
        new apiRequestHandler.apiRequestHandler().RequestAPI("POST", ticketObject, 'https://dapperdinoapi.azurewebsites.net/api/ticket', config);
        */
    }
}