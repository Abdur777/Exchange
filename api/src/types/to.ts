import { CREATE_ORDER } from "."

export type MessageToEngine = {
    type: typeof CREATE_ORDER,
    data: {
        market: string,
        side: "buy"|"sell",
        quantity: number,
        price: number,
        userId: string
    }
}