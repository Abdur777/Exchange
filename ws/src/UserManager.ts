import { User } from "./User";
import { WebSocket } from "ws";

export class UserManger {
    private static instance: UserManger

    public static getInstance(){
        if(!this.instance){
            this.instance = new UserManger
        }
        return this.instance
    }

    addUser(ws: WebSocket){
        const id = this.getRandomId();
        const user = new User(id, ws);
    }

    private getRandomId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}