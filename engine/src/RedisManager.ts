import { createClient, RedisClientType } from "redis"
import { MessageToApi } from "./types/toApi";

export class RedisManager  {
    private client: RedisClientType;
    private static instance: RedisManager;
    
    constructor(){
        this.client = createClient();
        this.client.connect();
    }

    public static getInstance(){
        if(!this.instance){
            this.instance = new RedisManager;
        }
        return this.instance;
    }

    public sendToApi (message: MessageToApi, clientId: string){
        this.client.publish(clientId,JSON.stringify(message));
    }
}