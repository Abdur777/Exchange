import { Ticker } from "./types"

export const BASE_URL = "ws://localhost:3001"

export class SignalingManager {
    private static instance: SignalingManager
    private ws: WebSocket
    private BufferedMessages: any[] = []
    private id: number
    private initialised: boolean = false
    private CallBack: any = {}

    private constructor () {
        this.ws = new WebSocket(BASE_URL);
        this.BufferedMessages = []
        this.id = 1;
        this.init();
    }

    public static getInstance() {
        if (!this.instance)  {
            this.instance = new SignalingManager();
        }
        return this.instance;
    }

    private init(){
        this.ws.onopen = () => {
            this.initialised = true;
            this.BufferedMessages.forEach( message => {
                this.ws.send(JSON.stringify(message));
            });
            this.BufferedMessages = []
        }
        this.ws.onmessage = (event) => {
            const parsedMessage = JSON.parse(event.data)
            const type = parsedMessage.data.e;
            if(this.CallBack[type]){
                //@ts-ignore
                this.CallBack[type].forEach(({ callBack })=>{
                    const newTicker: Partial<Ticker> = {
                        lastPrice: parsedMessage.data.c,
                        high: parsedMessage.data.h,
                        low: parsedMessage.data.l,
                        volume: parsedMessage.data.v,
                        quoteVolume: parsedMessage.data.V,
                        symbol: parsedMessage.data.s,
                    }
                    callBack(newTicker)
                })
            }
            
        }
    }

    sendMessage(message: any){
        const finalMessage = {
            ...message,
            id: this.id++
        }
        if(!this.initialised){
            this.BufferedMessages.push(finalMessage);
            return;
        }
        this.ws.send(JSON.stringify(finalMessage))
    }

    public registerCallBack(type: string, callback: any, id: string){
        this.CallBack[type] = this.CallBack[type] || []
        this.CallBack[type].push({callback, id});
    }

    public deRegisterCallback(type: string, id: string){
        if(this.CallBack[type]){
            //@ts-ignore
            const index = this.CallBack[type].findIndex(callback => callback.id === id);
            if (index !== -1) {
                this.CallBack[type].splice(index, 1);
            }
        }
    }

}