import { Router } from "express";
import { RedisManager } from "../RedisManager";
import { GET_TRADES } from "../types";

export const tradesRouter = Router();

tradesRouter.get("/", async (req, res) => {
    const {symbol, limit} = req.query;
    const response = await RedisManager.getInstance().sendAndAwait({
        type: GET_TRADES,
        data: {
            market: symbol as string,
            limit: limit as string
        }
    })
})