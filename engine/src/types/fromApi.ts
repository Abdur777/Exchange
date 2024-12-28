export const CREATE_ORDER = "CREATE_ORDER";

export type MessageFromApi = {
    type:"CREATE_ORDER",
    data: {
        market: string,
        price: string,
        side: "buy" | "sell",
        quantity: string,
        userId: string
    }
}