import { BASE_CURRENCY } from "./engine";

export interface Order {
    price: number,
    side: "buy" | "sell",
    quantity: number,
    filled: number,
    userId: string,
    orderId: string
}

export interface Fill {
    price: string;
    qty: number;
    tradeId: number;
    otherUserId: string;
    markerOrderId: string;
}


export class OrderBook {
    bids: Order[];
    asks: Order[];
    baseAsset: string;
    quoteAsset: string = BASE_CURRENCY;
    lastTradeId: number;
    currentPrice: number;
    
    constructor(bids: Order[], asks: Order[], baseAsset: string, lastTradeId: number, currentPrice: number){
        this.bids = bids;
        this.asks = asks;
        this.baseAsset = baseAsset;
        this.lastTradeId = lastTradeId || 0;
        this.currentPrice = currentPrice ||0;
    }

    ticker() {
        return `${this.baseAsset}_${this.quoteAsset}`;
    }

    addOrder(order: Order) : {
        executedQty: number,
        fills: Fill[]
    } {
        if(order.side==="buy"){
            const { executedQty, fills } = this.matchBids(order);
            order.filled = executedQty;
            if (executedQty === order.quantity) {
                order.quantity = 0;
                return {
                    executedQty,
                    fills
                }
            }
            order.quantity -= executedQty;
            this.bids.push(order);
            return {executedQty, fills};
        }else {
            const { executedQty, fills } = this.matchAsks(order);
            order.filled = executedQty;
            if (executedQty === order.quantity) {
                order.quantity = 0;
                return {
                    executedQty,
                    fills
                }
            }
            order.quantity -= executedQty;
            this.asks.push(order);
            return {executedQty, fills};
        }
    }

    matchBids(order: Order): {fills: Fill[], executedQty: number} {
        const fills: Fill[] = [];
        let executedQty = 0;

        for (let i = 0; i < this.asks.length; i++) {
            if (this.asks[i].price <= order.price && executedQty < order.quantity) {
                const filledQty = Math.min((order.quantity - executedQty), this.asks[i].quantity);
                executedQty += filledQty;
                this.asks[i].filled += filledQty;
                fills.push({
                    price: this.asks[i].price.toString(),
                    qty: filledQty,
                    tradeId: this.lastTradeId++,
                    otherUserId: this.asks[i].userId,
                    markerOrderId: this.asks[i].orderId
                });
            }
        }
        for (let i = 0; i < this.asks.length; i++) {
            if (this.asks[i].filled === this.asks[i].quantity) {
                this.asks.splice(i, 1);
                i--;
            }
        }
        return {
            fills,
            executedQty
        };
    }

    matchAsks(order: Order): {fills: Fill[], executedQty: number} {
        const fills: Fill[] = [];
        let executedQty = 0;
        
        for (let i = 0; i < this.bids.length; i++) {
            if (this.bids[i].price >= order.price && executedQty < order.quantity) {
                const amountRemaining = Math.min(order.quantity - executedQty, this.bids[i].quantity);
                executedQty += amountRemaining;
                this.bids[i].filled += amountRemaining;
                fills.push({
                    price: this.bids[i].price.toString(),
                    qty: amountRemaining,
                    tradeId: this.lastTradeId++,
                    otherUserId: this.bids[i].userId,
                    markerOrderId: this.bids[i].orderId
                });
            }
        }
        for (let i = 0; i < this.bids.length; i++) {
            if (this.bids[i].filled === this.bids[i].quantity) {
                this.bids.splice(i, 1);
                i--;
            }
        }
        return {
            fills,
            executedQty
        };
    }
}