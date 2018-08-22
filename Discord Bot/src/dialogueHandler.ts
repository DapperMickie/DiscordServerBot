import * as discord from 'discord.js'

export class dialogueHandler {

    public async GetInput(channel: discord.TextChannel) {

        const filter = m => m;

        let response;

        channel.awaitMessages(filter, {max: 1, time: 5000, errors: ['time']})
            .then(collected => response = collected.array()[0])
            .catch(collected => channel.send("You didn't respond in time!"))
            
        return response;

    }
}