import { WebSocket } from "ws";
import { IncomingMessage, SUBSCRIBE, UNSUBSCRIBE } from "./types/in";
import { SubscriptionManager } from "./SubscriptionManager";
import { OutgoingMessage } from "./types/out";

export class User {
    private id: string
    private ws: WebSocket

    constructor(id: string, ws: WebSocket){
        this.id = id;
        this.ws = ws;
        this.addListeners();
    }

    private addListeners(){
        this.ws.on("message", (message: string) => {
            const parsedMessage: IncomingMessage = JSON.parse(message);
            if (parsedMessage.method === SUBSCRIBE) {
                parsedMessage.params.forEach(s => SubscriptionManager.getInstance().subscribe(this.id, s));
            }
            if (parsedMessage.method === UNSUBSCRIBE) {
                parsedMessage.params.forEach(s => SubscriptionManager.getInstance().unsubscribe(this.id, parsedMessage.params[0]));
            }
        });
    }

    emit(message: OutgoingMessage){
        const parsedMessage = JSON.stringify(message);
        this.ws.send(parsedMessage);
    }
}