import * as discord from 'discord.js'

export class dialogueHandler {
    private _steps: dialogueStep[] | dialogueStep;

    /**
     *
     */
    constructor(steps: dialogueStep[] | dialogueStep) {
        this._steps = steps;
    }

    public async GetInput(channel: discord.TextChannel) {
        // Create array for single dialogueStep to prevent extra checks + coding
        if (!Array.isArray(this._steps)) {
            this._steps = [this._steps];
        }

        this._steps.forEach(step => {
            const filter = m => m;

            let response;

            channel.awaitMessages(filter, { max: 1, time: 5000, errors: ['time'] })
                .then(collected => {
                    response = collected.array()[0];
                    
                    if(step.callback!= undefined)
                        step.callback(response);
                    if(step.httpCallback!= undefined)
                        step.httpCallback(response);
                })
                .catch(collected => channel.send("You didn't respond in time!"))

             
        });


        return;

    }
}

export interface dialogueStep {
    callback?: Function;
    data: any;
    httpCallback?: Function;
}