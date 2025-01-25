"use client";

import { useEffect, useState } from "react";
import { MarketHeader } from "./MarketHeader";
import MarketRow from "./MarketRow";
import { Ticker } from "../utils/types";
import { getTicker, getTickers } from "../utils/httpClient";

const Markets = () => {

  const [tickers, setTickers] = useState<Ticker[] | undefined>();

  useEffect(()=>{
    async function init() {
      try {
        const res = await getTickers();
        console.log(res);
        setTickers(res);
      }
      catch(e){
        console.log(e);
      }
    }
    init();
  },[])

  return (
    <div className="flex flex-col flex-1 gap-3 rounded-xl bg-baseBackgroundL1 p-4">
      <div className="overflow-x-auto">
      <table className="min-w-full ">
        <MarketHeader/>
        <tbody className="gap-2 divide-y divide-gray-800">
            {tickers && tickers.map(ticker=>{
              return <MarketRow />
            })}
        </tbody>
      </table>  
      </div>
    </div>
  );
};

export default Markets;
