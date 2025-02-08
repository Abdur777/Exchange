"use client";

import { useRouter } from 'next/navigation'
import { Ticker } from "../utils/types"
import { formatVolumeToKMB } from '../utils/formatNumber';
import MiniChart from '../components/MiniChart';
import { getLogo } from '../utils/httpClient';
import { useEffect, useState } from 'react';

export default function MarketRow({ market, lineData, image}: { market: Ticker, lineData: { close: string }[] , image: string}) {
    
    // const [Image, setImage] = useState<string | undefined>(undefined);
    const router = useRouter()
    
    const handleMarketClick = () => {
        router.push(`/trade/${market.symbol}`)
    }

    // useEffect(()=>{
    //   const imagehandler = async (symbol: string) => {
    //     return await getLogo(symbol);
    //   }
    //   const symbol = market.symbol.split("_")[0];
    //   imagehandler(symbol).then((ImageUrl) => {
    //     setImage(ImageUrl);
    //   });
    // },[])

    return (
        <tr 
            className="hover:bg-baseBackgroundL2 cursor-pointer" 
            onClick={handleMarketClick}
        >
      <td className="text-sm tabular-nums px-2 py-3 last:pr-7">
        <div className="flex shrink">
          <div className="flex items-center undefined">
            <div className="relative flex-none overflow-hidden rounded-full border border-baseBorderMed">
              <div className="relative">
                <img
                  src={image}
                  alt="Logo"
                  loading="lazy"
                  width="40"
                  height="40"
                  decoding="async"
                  data-nimg="1"
                />
              </div>
            </div>
            <div className="ml-2 flex flex-col">
              <p className="whitespace-nowrap text-base font-bold text-baseTextHighEmphasis">
                {market.symbol.split("_")[0]}
              </p>
              <div className="flex items-center justify-start flex-row gap-2">
                <div className="font-medium text-left text-xs leading-5 text-baseTextMedEmphasis">
                    {market.symbol.split("_")[0]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="text-sm tabular-nums px-2 py-3 last:pr-7 text-right">
        <div className='flex justify-end gap-0.2'>
          <p className="text-base font-bold tabular-nums">
            $
          </p>
          <p className="font-inter text-base font-bold tabular-nums">
            {market.lastPrice}
          </p>
        </div>
      </td>
      <td className="text-sm tabular-nums px-2 py-3 last:pr-7 text-right">
        <p className="font-inter text-base font-bold tabular-nums">$123.9B</p>
      </td>
      <td className="text-sm tabular-nums px-2 py-3 last:pr-7 text-right">
        <div className='flex justify-end gap-0.2'>
          <p className="text-base font-bold tabular-nums">
            $
          </p>
          <p className="font-inter text-base font-bold tabular-nums">
            {formatVolumeToKMB(market.quoteVolume)}
          </p>
        </div>
      </td>
      <td className="text-sm tabular-nums px-2 py-3 last:pr-7 text-right">
        <p className={`font-inter text-base font-bold tabular-nums text-redText ${
                  Number(market.priceChangePercent) > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}>
          {(Number(market.priceChangePercent)*100).toFixed(2)}%
        </p>
      </td>
      <td className="text-sm tabular-nums px-2 py-3 last:pr-7 text-right">
        <div className="align-center flex justify-end">
          <MiniChart 
              data={lineData} 
              color={Number(market.priceChangePercent) > 0 ? "green" : "red"} 
          />
        </div>
      </td>
    </tr>
    )
}
