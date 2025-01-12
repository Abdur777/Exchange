import axios from "axios";
import { KLine, Ticker } from "./types";

const BASE_URL = "http://localhost:5001";

export async function getKlines(){
    const res = await axios.get(`${BASE_URL}/kline`);
    const data: KLine[] = res.data;
    return data.sort((x, y) => (Number(x.end) < Number(y.end) ? -1 : 1));
}

export async function getTicker(market: string): Promise<Ticker> {
    const tickers = await getTickers();
    const ticker = tickers.find(t => t.symbol === market);
    if (!ticker) {
        throw new Error(`No ticker found for ${market}`);
    }
    return ticker;
}

export async function getTickers(): Promise<Ticker[]> {
    const response = await axios.get(`${BASE_URL}/tickers`);
    return response.data;
}