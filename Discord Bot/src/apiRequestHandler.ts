const request = require('request');
import { IBotConfig } from './api'
import * as fs from 'fs'

export class apiRequestHandler {

    private _headers = {
        'User-Agent':        'DapperBot/0.0.1',
        'Content-Type':        'application/json',
        'Authorization':        ``
    }

    public async RequestAPI(httpType: 'POST'|'DELETE'|'PUT'|'PATCH'|'GET'|'HEAD'|'OPTIONS'|'CONNECT'|'TRACE', data: any, requestUrl: string, config: IBotConfig) {

        this._headers.Authorization = `Bearer ${config.apiBearerToken}`;

        var options = {
            url: requestUrl,
            method: httpType,
            headers: this._headers,
            json: data
        }
    
        request(options, (error:any, response:any, body:any) => {
            console.log(response.statusCode);
            if (!error && response.statusCode == 200) {
                return body;
            }
            else if(!error && response.statusCode == 401){
                return this.GenerateNewToken(options, config);
            }
            else if(!error && response.statusCode == 403){
                console.log("Unauthorized");
            }
        })
    }

    public GenerateNewToken(first_options: any, config: IBotConfig){

        var options = {
            url: "https://dapperdinoapi.azurewebsites.net/api/account/login",
            method: "POST",
            headers: this._headers,
            json: {
                "Email": config.apiEmail,
                "Password": config.apiPassword
            }
        }

        request(options, (error:any, response:any, body:any) => {
            if (!error && response.statusCode == 200) {
                console.log(body);
                config.apiBearerToken = body;

                fs.writeFile("../bot.prod.json", JSON.stringify(config), (err) =>{
                    if(err)
                    {
                        console.log(err);
                    }
                })
            }
        })

        request(first_options, (error:any, response:any, body:any) =>{
            if (!error && response.statusCode == 200) {
                return body;
            }
            else if (!error && response.statusCode == 401){
                console.log("Not authenticated ");
            }
        })
    }
}