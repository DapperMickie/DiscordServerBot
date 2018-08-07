import { IBot, IBotCommand, IBotCommandHelp, IBotMessage } from '../api'
import { getRandomInt } from '../utils'
import * as discord from 'discord.js'

export default class ServerInfoCommand implements IBotCommand {
    private readonly CMD_REGEXP = /^\?ping/im

    public getHelp(): IBotCommandHelp {
        return { caption: 'Ping Command', description: 'For testing latency and also having a little fun' }
    }

    public init(bot: IBot, dataPath: string): void { }

    public isValid(msg: string): boolean {
        return this.CMD_REGEXP.test(msg)
    }

    public async process(msg: string, answer: IBotMessage, msgObj: discord.Message): Promise<void> {
        let m = await msgObj.channel.send("Ping?") as any; //Sends a temporary message
        m.edit(`Pong! Latency is ${m.createdTimestamp - msgObj.createdTimestamp}ms.`) //Once the message has been sent and recieved it then calcualtes lantency and edits the previous message to inform the user
            .then(console.log)
            .catch(console.error);
    }
}