import { RedisManager } from "../RedisManager";
import { CREATE_ORDER, MessageFromApi } from "../types/fromApi";


export class Engine {
    process({ message , clientId }:{message: MessageFromApi, clientId: string}){
        switch(message.type){
            case CREATE_ORDER:
                    const orderId = "123";
                    const executedQty = 1;
                    const fills = [
                        { price: "100.50", qty: 10, tradeId: "abc123" }
                    ];
                    RedisManager.getInstance().sendToApi({
                        type: "ORDER_PLACED",
                        payload:{
                            orderId,
                            executedQty,
                            fills
                        }
                    },clientId);
                }
                
    }
}