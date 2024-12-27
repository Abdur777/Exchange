import { CANCEL_ORDER, CREATE_ORDER, GET_OPEN_ORDERS } from "."

export type MessageToEngine = {
    type: typeof CREATE_ORDER,
    data: {
        market: string,
        price: string,
        quantity: string,
        side: "buy" | "sell",
        userId: string
    }
} | {
    type: typeof CANCEL_ORDER,
    data: {
        orderId: string,
        market: string,
    }
} | {
    type: typeof GET_OPEN_ORDERS,
    data: {
        userId: string,
        market: string,
    }
}