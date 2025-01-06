import { SubscriptionManager } from "./SubscriptionManager";
import { User } from "./User";
import { WebSocket } from "ws";

export class UserManger {
    private static instance: UserManger
    private users: Map<string, User> = new Map();

    public static getInstance(){
        if(!this.instance){
            this.instance = new UserManger
        }
        return this.instance
    }

    public addUser(ws: WebSocket){
        const id = this.getRandomId();
        const user = new User(id, ws);
        this.users.set(id,user)
        this.registerOnClose(ws, id);
    }

    public getUser(id: string){
        return this.users.get(id);
    }

    private registerOnClose(ws: WebSocket, id: string) {
        ws.on("close", () => {
            this.users.delete(id);
            SubscriptionManager.getInstance().userLeft(id);
        });
    }

    private getRandomId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}