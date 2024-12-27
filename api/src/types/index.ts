export const CREATE_ORDER = "CREATE_ORDER";
export const CANCEL_ORDER = "CANCEL_ORDER";
export const GET_OPEN_ORDERS = "GET_OPEN_ORDERS";


export type MessageFromOrderbook = {
    type: "ORDER_PLACED"
    payload: {
        orderId: string,
        executedQty: number,
        fills: [
            {
                price: string,
                qty: number,
                tradeId: string
            }
        ]
    }
} | {
    type: "ORDER_CANCELLED",
    payload: {
        orderId: string,
        executedQty: number,
        remainingQty: number
    }
} | {
    type: "OPEN_ORDERS",
    payload: {
        orderId: string,
        remainingQty: number
        price: string,
        side: 'buy' | 'sell',
        userId: string
    }
}