import * as discord from 'discord.js'
import * as api from './api.js'
import { compactDiscordUser } from './models/compactDiscordUser.js';
import { apiRequestHandler } from './apiRequestHandler.js';
import { email } from './models/email.js';

export class websiteBotService {

    private _serverBot:discord.Client
    private _config:api.IBotConfig

    constructor(serverBot:discord.Client, config:api.IBotConfig) {
        this._serverBot = serverBot;
        this._config = config;        
    }

    public GetServerPopulation(){
        return this._serverBot.users.array().length;
    }

    public GetDiscordUserByUsername(username:string){
        let allUsers = this._serverBot.users.array();
        let user;
        for(let i = 0; i < allUsers.length; i++){
            if(allUsers[i].username == username){
                user = allUsers[i];
                break;
            }
        }
        let userObject = new compactDiscordUser()
        userObject.Username = user.username;
        userObject.DiscordId = user.id;

        return userObject;
    }

    public GetDiscordUserById(id:string){
        let allUsers = this._serverBot.users.array();
        let user;
        for(let i = 0; i < allUsers.length; i++){
            if(allUsers[i].id == id){
                user = allUsers[i];
                break;
            }
        }
        let userObject = new compactDiscordUser()
        userObject.Username = user.username;
        userObject.DiscordId = user.id;

        return userObject;
    }

    public GetDiscordUserByEmail(emailAddress:string){
        let emailObject = new email();
        emailObject.Email = emailAddress;
        let responseData = new apiRequestHandler().RequestAPI("POST", emailObject, "https://dapperdinoapi.azurewebsites.net/api/search/user", this._config);
        console.log(responseData);
    }
}