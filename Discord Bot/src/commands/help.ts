import { IBot, IBotCommand, IBotCommandHelp, IBotMessage } from "../api"
import { getRandomInt } from "../utils"

export default class HelpCommand implements IBotCommand {
    private readonly CMD_REGEXP = /^\/help/im;

    public getHelp(): IBotCommandHelp {
        return { caption: "Help Command", description: "This is our help command" };
    }

    public init(bot: IBot, dataPath: string): void { }

    public isValid(msg: string): boolean {
        return this.CMD_REGEXP.test(msg);
    }
    public async process(msg: string, answer: IBotMessage): Promise<void> {
        answer.setTextOnly(`Testing.`);
    }
}