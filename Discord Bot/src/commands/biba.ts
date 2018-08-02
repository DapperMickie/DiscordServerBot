import { IBot, IBotCommand, IBotCommandHelp, IBotMessage } from '../api'
import { getRandomInt } from '../utils'

export default class RandomNumberCommand implements IBotCommand {
    private readonly CMD_REGEXP = /^\/(biba|b|биба|б)(?: |$)/im

    public getHelp(): IBotCommandHelp {
        return { caption: '/biba /b /биба /б', description: 'Выводит размер бибы.' }
    }

    public init(bot: IBot, dataPath: string): void { }

    public isValid(msg: string): boolean {
        return this.CMD_REGEXP.test(msg)
    }
    public async process(msg: string, answer: IBotMessage): Promise<void> {
        answer.setTextOnly(`размер твоей бибы - ${getRandomInt(1, 50)}см.`)
    }
}