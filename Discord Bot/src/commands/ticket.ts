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

    cbFunc = (args: any) => {
        if (args.data == null) {
            args.data = new Array<string>(args.response);
        }
        else {
            args.data.push(args.response);
        }
        console.log(args.data.join(", "))
        return args.data;
    };

    public async process(msg: string, answer: IBotMessage, msgObj: discord.Message, client: discord.Client, config: IBotConfig, commands: IBotCommand[]): Promise<void> {

        let ticketObject: ticket.ticket = new ticket.ticket();
        ticketObject.Applicant = new applicant.applicant();

        let collectedInfo;
        //datacallback

        let test: dialogueHandler.dialogueStep = new dialogueHandler.dialogueStep(answer, this.cbFunc, collectedInfo);
        let test2: dialogueHandler.dialogueStep = new dialogueHandler.dialogueStep(answer, this.cbFunc, collectedInfo);
        let test3: dialogueHandler.dialogueStep = new dialogueHandler.dialogueStep(answer, this.cbFunc, collectedInfo);

        let handler = new dialogueHandler.dialogueHandler([test, test2, test3], collectedInfo);

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