import { IBot, IBotCommand, IBotCommandHelp, IBotMessage } from '../api'
import { getRandomInt } from '../utils'
import * as discord from 'discord.js'

export default class ServerInfoCommand implements IBotCommand {
    private readonly CMD_REGEXP = /^\?serverinfo/im

    public getHelp(): IBotCommandHelp {
        return { caption: 'Server Info Command', description: 'Here is some information about our server' }
    }

    public init(bot: IBot, dataPath: string): void { }

    public isValid(msg: string): boolean {
        return this.CMD_REGEXP.test(msg)
    }
    public async process(msg: string, answer: IBotMessage, msgObj: discord.Message): Promise<void> {
        answer.addField("The best server ever:", msgObj.guild.name);
    }
}