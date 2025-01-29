import axios from "axios";
import { KLine, Ticker } from "./types";

const BASE_URL = "https://proxy-exchange.vercel.app";

export async function getKlines(market: string){
    const res = await axios.get(`${BASE_URL}/kline?symbol=${market}`);
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

export async function getDepth(market: string) {
    const response = await axios.get(`${BASE_URL}/depth?symbol=${market}`);
    return response.data;
}