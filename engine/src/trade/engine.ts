import { RedisManager } from "../RedisManager";
import { CANCEL_ORDER, CREATE_ORDER, GET_DEPTH, GET_OPEN_ORDERS, MessageFromApi } from "../types/fromApi";
import { Fill, Order, OrderBook } from "./OrderBook";

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
            },
            "SOL": {
                available: 0,
                locked: 0
            }
        });

        this.balances.set("2", {
            "SOL": {
                available: 10000000,
                locked: 0
            },
            [BASE_CURRENCY]: {
                available: 0,
                locked: 0
            }
        });
    }

    process({ message , clientId }:{message: MessageFromApi, clientId: string}){
        switch(message.type){
            case CREATE_ORDER:
                    try {
                        const { orderId, executedQty, fills } = this.createOrder(message.data.market, message.data.price, message.data.quantity, message.data.userId, message.data.side);
                            RedisManager.getInstance().sendToApi({
                            type: "ORDER_PLACED",
                            payload:{
                                orderId,
                                executedQty,
                                fills
                            }
                        }, clientId);
                    }
                    catch (e) {
                            RedisManager.getInstance().sendToApi({
                            type: "ORDER_CANCELLED",
                            payload:{
                                orderId: "",
                                executedQty: 0,
                                remainingQty: 0
                            }
                        }, clientId);
                    }
                    break;
            case CANCEL_ORDER:
                    try {
                        const orderId = message.data.orderId;
                        const cancelMarket =  message.data.market;
                        const cancelOrderbook = this.orderBook.find((e)=> e.ticker()===cancelMarket);
                        const quoteAsset = cancelMarket.split("_")[1];
                        const baseAsset = cancelMarket.split("_")[0];
                        console.log(quoteAsset," ", baseAsset);
                        if(!cancelOrderbook){
                            throw new Error("OrderBook not present");
                        }
                        const order = cancelOrderbook.asks.find(o => o.orderId === orderId) || cancelOrderbook.bids.find(o => o.orderId === orderId);
                        if (!order) {
                            console.log("No order found");
                            throw new Error("No order found");
                        }
                        if(order.side==="buy"){
                            const price = cancelOrderbook.cancelBid(order);
                            //@ts-ignore
                            this.balances.get(order.userId)[quoteAsset].available += price*(order.quantity-order.filled);
                            //@ts-ignore
                            this.balances.get(order.userId)[quoteAsset].locked -= price*(order.quantity-order.filled);
                        }
                        else{
                            cancelOrderbook.cancelAsk(order);
                            //@ts-ignore
                            this.balances.get(order.userId)[baseAsset].available += (order.quantity-order.filled);
                            //@ts-ignore
                            this.balances.get(order.userId)[baseAsset].locked -= (order.quantity-order.filled);
                        }
                        RedisManager.getInstance().sendToApi({
                            type: "ORDER_CANCELLED",
                            payload: {
                                orderId,
                                executedQty: 0,
                                remainingQty: 0
                            }
                        }, clientId)
                    }
                    catch (e){
                        console.log("Error cancelling order");
                        console.log(e);
                    }
                    break;
            case GET_OPEN_ORDERS:
                try {
                    const orderbook = this.orderBook.find(o=>o.ticker()===message.data.market);
                    if(!orderbook){
                        throw new Error("OrderBook not present");
                    }
                    const openOrders = orderbook.getOpenOrders(message.data.userId);
                    RedisManager.getInstance().sendToApi({
                        type: "OPEN_ORDERS",
                        payload: openOrders
                    }, clientId)
                } catch(e) {
                    console.log(e);
                }
                break;        
            case GET_DEPTH:
                try {
                    const orderbook = this.orderBook.find(o=>o.ticker()===message.data.market);
                    if(!orderbook){
                        throw new Error("OrderBook not present");
                    }
                    RedisManager.getInstance().sendToApi({
                        type: "DEPTH",
                        payload: orderbook.getDepth()
                    }, clientId)
                } catch (e) {
                    console.log(e);
                    RedisManager.getInstance().sendToApi({
                        type: "DEPTH",
                        payload: {
                            market: message.data.market,
                            bids: [],
                            asks: []
                        }
                    }, clientId);
                }
                break;            
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
                    quantity: Number(quantity),
                    orderId: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                    userId
                }

                this.checkandLockBalance(price, side, baseAsset, quoteAsset, quantity, userId);

                const {executedQty, fills} = orderbook.addOrder(order);

                this.updateBalance(executedQty, side, baseAsset, quoteAsset, fills, userId);

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

            updateBalance(executedQty: number, side: "buy" | "sell", baseAsset: string, quoteAsset: string, fills: Fill[], userId: string){
                if(side=="buy"){
                    fills.forEach((o) => {
                        //@ts-ignore
                        this.balances.get(userId)[baseAsset].available = this.balances.get(userId)?.[baseAsset].available + o.qty;
                        //@ts-ignore
                        this.balances.get(userId)[quoteAsset].locked = this.balances.get(userId)?.[quoteAsset].locked - o.qty * Number(o.price);
                        //@ts-ignore
                        this.balances.get(o.otherUserId)[baseAsset].locked = this.balances.get(o.otherUserId)?.[baseAsset].locked - o.qty;
                        //@ts-ignore
                        this.balances.get(o.otherUserId)[quoteAsset].available = this.balances.get(o.otherUserId)?.[quoteAsset].available + o.qty * Number(o.price);
                    })
                }else{
                    fills.forEach((o) => {
                        //@ts-ignore
                        console.log(o.otherUserId, this.balances.get(o.otherUserId)[baseAsset]);
                        //@ts-ignore
                        this.balances.get(o.otherUserId)[baseAsset].available = this.balances.get(o.otherUserId)?.[baseAsset].available + o.qty;
                        //@ts-ignore
                        console.log(o.otherUserId, this.balances.get(o.otherUserId)[baseAsset]);
                        //@ts-ignore
                        this.balances.get(o.otherUserId)[quoteAsset].locked = this.balances.get(o.otherUserId)?.[quoteAsset].locked - o.qty * Number(o.price);
                        //@ts-ignore
                        this.balances.get(userId)[baseAsset].locked = this.balances.get(userId)?.[baseAsset].locked - o.qty;
                        //@ts-ignore
                        this.balances.get(userId)[quoteAsset].available = this.balances.get(userId)?.[quoteAsset].available + o.qty * Number(o.price);
                    })
                }
            }
}