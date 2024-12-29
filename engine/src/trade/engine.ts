import { RedisManager } from "../RedisManager";
import { CREATE_ORDER, MessageFromApi } from "../types/fromApi";
import { Order, OrderBook } from "./OrderBook";

export const BASE_CURRENCY = "USD";

interface UserBalances {
    [key: string] : {
        available: number,
        locked: number
    }
}

export class Engine {
    private orderBook: OrderBook[] = [];
    private balances: Map< string, UserBalances> = new Map();

    constructor (){
        this.orderBook = [new OrderBook([], [], `SOL`, 0, 0)];
        this.balances.set("1", {
            [BASE_CURRENCY]: {
                available: 10000000,
                locked: 0
            }
        });

        this.balances.set("2", {
            "SOL": {
                available: 10000000,
                locked: 0
            }
        });
    }

    process({ message , clientId }:{message: MessageFromApi, clientId: string}){
        switch(message.type){
            case CREATE_ORDER:
                    const { orderId, executedQty, fills } = this.createOrder(message.data.market, message.data.price, message.data.quantity, message.data.userId, message.data.side);
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
            createOrder(market: string, price: string, quantity: string, userId: string, side: "buy" | "sell") {
                const orderbook = this.orderBook.find(o => o.ticker() === market);
                const baseAsset = market.split("_")[0];
                const quoteAsset = market.split("_")[1];

                if (!orderbook) {
                    throw new Error("No orderbook found");
                }
                const order: Order =  {
                    price: Number(price),
                    side,
                    filled: 0,
                    quantity: 0,
                    orderId: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                    userId
                }

                this.checkandLockBalance(price, side, baseAsset, quoteAsset, quantity, userId);

                const {executedQty, fills} = orderbook.addOrder(order);

                return {orderId: order.orderId, executedQty, fills};
            }

            checkandLockBalance(price: string, side: "buy" | "sell", baseAsset: string, quoteAsset: string, quantity: string, userId: string){
                if(side==="buy"){
                    console.log(this.balances.get(userId)?.[quoteAsset]?.available);
                    if(((this.balances.get(userId)?.[quoteAsset]?.available) || 0) < Number(price) * Number(quantity)){
                        throw new Error("Insufficient funds");
                    }
                    //@ts-ignore
                    this.balances.get(userId)[quoteAsset].available = this.balances.get(userId)?.[quoteAsset].available - (Number(quantity) * Number(price));
                    //@ts-ignore
                    this.balances.get(userId)[quoteAsset].locked = this.balances.get(userId)?.[quoteAsset].locked + (Number(quantity) * Number(price));
                }
                else{
                    if(((this.balances.get(userId)?.[baseAsset]?.available) || 0) < Number(quantity)){
                        throw new Error("Insufficient funds");
                    }
                    //@ts-ignore
                    this.balances.get(userId)[baseAsset].available = this.balances.get(userId)?.[baseAsset].available - (Number(quantity));
                    //@ts-ignore
                    this.balances.get(userId)[baseAsset].locked = this.balances.get(userId)?.[baseAsset].locked + (Number(quantity));
                }
            }
}