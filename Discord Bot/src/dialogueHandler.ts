import * as discord from 'discord.js'
import * as api from './api.js'

export class dialogueHandler {
    private _steps: dialogueStep[] | dialogueStep;
    private _data: any;

    /**
     *
     */
    constructor(steps: dialogueStep[] | dialogueStep, data: any) {
        this._steps = steps;
        this._data = data;
    }

    public async GetInput(channel: discord.TextChannel, ticketUser: discord.GuildMember) {
        // Create array for single dialogueStep to prevent extra checks + coding
        if (!Array.isArray(this._steps)) {
            this._steps = [this._steps];
        }
        for (const step of this._steps) {
            const filter = m => (m.member == ticketUser);
            
            let response;

            await channel.awaitMessages(filter, { max: 1 })
                .then(collected => {
                    response = collected.array()[0];

                    if (step.callback != null)
                        this._data = step.callback(response, this._data);

                    if (step.httpCallback != null)
                        this._data = step.httpCallback(response, this._data);

                    channel.send(step.returnMessage);
                })
                .catch(collected => {
                    console.log(collected);
                    channel.send(`You didn't respond in time!`)
                });

            
        }


        return;

    }
}

export class dialogueStep implements dialogueStep {
    /**
     *
     */
    constructor(returnMessage: api.IBotMessage, callback?: Function, httpCallback?: Function,editMessage?:Function) {
        this.callback = callback;
        this.httpCallback = httpCallback;
        this.returnMessage = returnMessage;
        this.editMessage = editMessage;
    }
}

export interface dialogueStep {
    callback?: Function;
    httpCallback?: Function;
    editMessage?:Function;
    returnMessage: api.IBotMessage;

}