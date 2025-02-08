import axios from "axios";
import { KLine, Ticker } from "./types";

const BASE_URL = "https://proxy-exchange.vercel.app";
// const BASE_URL = "http://localhost:5001";

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

export async function getLineData() {
    const response = await axios.get(`${BASE_URL}/line`);
    // console.log(response.data)
    return response.data;
}

export async function getLogo(tickerarray: Ticker[]) {
    const mapImg = new Map();
    const symbols = tickerarray.map(ticker => ticker.symbol.split("_")[0].toLowerCase());
    
    await Promise.all(
        symbols.map(async (symbol) => {
            try {
                const response = await axios.get(
                    `https://assets.coincap.io/assets/icons/${symbol}@2x.png`,
                    { timeout: 2000 }
                );
                if (response.status === 200) {
                    mapImg.set(symbol, `https://assets.coincap.io/assets/icons/${symbol}@2x.png`);
                }
            } catch (error) {
                return;
            }
        })
    );
    
    return mapImg;
}