"use client";

import { useEffect, useState } from "react";
import { MarketHeader } from "./MarketHeader";
import MarketRow from "./MarketRow";
import { Ticker } from "../utils/types";
import { getTickers } from "../utils/httpClient";
import Loading from "../components/Loading";

const Markets = () => {

  const [tickers, setTickers] = useState<Ticker[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(()=>{
    async function init() {
      try {
        setLoading(true);
        const res = await getTickers();
        console.log(res);
        setTickers(res);
        setLoading(false);
      }
      catch(e){
        console.log(e);
      }
    }
    init();
  },[])

  if(loading) return <div className="h-screen flex items-center justify-center">
    <Loading/>
  </div>

  return (
    <div className="flex flex-col flex-1 gap-3 rounded-xl bg-baseBackgroundL1 p-4 mx-auto mt-4 w-full max-w-7xl px-3 sm:px-6">
      <div className="overflow-x-auto">
      <table className="min-w-full ">
        <MarketHeader/>
        <tbody className="gap-2 divide-y divide-gray-800">
            {tickers && tickers.map((ticker,index)=>{
              return <MarketRow key={index} market={ticker} />
            })}
        </tbody>
      </table>  
      </div>
    </div>
  );
};

export default Markets;
