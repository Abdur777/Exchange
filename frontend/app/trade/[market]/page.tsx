"use client";
import { Depth } from "@/app/components/depth/Depth";
import MarketBar from "@/app/components/MarketBar";
import { SwapUI } from "@/app/components/SwapUI";
import TradeView from "@/app/components/TradeView";
import { PriceProvider } from "@/app/contexts/PriceContext";
import { useParams } from "next/navigation";

export default function Page() {
  const { market } = useParams();

  return (
    <PriceProvider>  
    <div className="flex flex-row flex-1 px-4 gap-2">
      <div className="flex flex-col flex-1 gap-2">
        <MarketBar market={market as string} />
        <div className="flex flex-row h-[620px] gap-2">
          <div className="flex flex-col flex-1 overflow-hidden rounded-lg bg-baseBackgroundL1">
            <div className="flex items-center justify-between flex-row px-4 py-4">
              <p className="font-medium text-sm font-inter text-slate-400">
                Chart
              </p>
              <div className="items-center justify-start flex-row flex space-x-2">
                <div className="flex justify-center flex-col cursor-pointer rounded-lg py-1 font-medium text-md font-inter text-slate-400 outline-none hover:opacity-90 h-[32px] px-3">
                  Trading View
                </div>
              </div>
            </div>
            <TradeView market={market as string} />
          </div>
          <div className="flex flex-col w-[300px] overflow-hidden rounded-lg bg-baseBackgroundL1">
            <Depth market={market as string} />
          </div>
        </div>
      </div>
      {/* <div className="w-[10px] flex-col border-slate-800 border-l"></div> */}
      <div>
        <SwapUI market={market as string}/>
       </div>
    </div>
    </PriceProvider>
  );
}
