import { useEffect, useState } from "react";
import { Ticker } from "../utils/types";
import { SignalingManager } from "../utils/SignalingManager";

export default function MarketBar({ market }: { market: string }) {
  const [ticker, setTicker] = useState<Ticker | null>(null);
  useEffect(() => {
    SignalingManager.getInstance().registerCallBack(
      "ticker",
      (data: Partial<Ticker>) =>
        setTicker((prevTicker) => ({
          firstPrice: data?.firstPrice ?? prevTicker?.firstPrice ?? "",
          high: data?.high ?? prevTicker?.high ?? "",
          lastPrice: data?.lastPrice ?? prevTicker?.lastPrice ?? "",
          low: data?.low ?? prevTicker?.low ?? "",
          priceChange: data?.priceChange ?? prevTicker?.priceChange ?? "",
          priceChangePercent:
            data?.priceChangePercent ?? prevTicker?.priceChangePercent ?? "",
          quoteVolume: data?.quoteVolume ?? prevTicker?.quoteVolume ?? "",
          symbol: data?.symbol ?? prevTicker?.symbol ?? "",
          trades: data?.trades ?? prevTicker?.trades ?? "",
          volume: data?.volume ?? prevTicker?.volume ?? "",
        })),
      `TICKER-${market}`
    );
    SignalingManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`ticker.${market}`],
    });

    return () => {
      SignalingManager.getInstance().deRegisterCallback(
        "ticker",
        `TICKER-${market}`
      );
      SignalingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`ticker.${market}`],
      });
    };
  }, [market]);

  return (
    <div className="flex items-center flex-row relative w-full rounded-lg bg-baseBackgroundL1">
      <div className="flex items-center flex-row no-scrollbar mr-4 h-[72px] w-full overflow-auto pl-4">
        <div className="flex flex-row shrink-0 gap-[32px]">
          <TickerComp market={market} />
          <div className="flex items-center flex-row space-x-6">
            <div className="flex flex-col h-full justify-center">
              <p className="font-medium font-inter tabular-nums text-lg">
                {/* ${ticker?.lastPrice} */}94,241.7
              </p>
              <p className="font-medium font-inter text-left text-sm tabular-nums">
                {/* ${ticker?.lastPrice} */} $94,241.7
              </p>
            </div>
            <div className="flex justify-center flex-col relative">
              <p className="font-medium font-inter text-xs text-slate-400 text-sm">
                24H Change
              </p>
              <span
                className={` text-sm font-medium font-inter tabular-nums leading-5 text-sm text-greenText ${
                  Number(-1) > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {Number(-1) > 0 ? "+" : ""}{" "}
                {-465.3}{" "}
                {Number(-0.49)?.toFixed(2)}%
              </span>
            </div>
            <div className="flex flex-col">
              <p className="font-medium font-inter text-xs text-slate-400 text-sm">
                24H High
              </p>
              <span className="text-sm font-medium font-inter tabular-nums leading-5 text-sm ">
                {/* {ticker?.high} */}95,397.7
              </span>
            </div>
            <div className="flex flex-col">
              <p className="font-medium font-inter text-xs text-slate-400 text-sm">
                24H Low
              </p>
              <span className="text-sm font-medium font-inter tabular-nums leading-5 text-sm ">
                {/* {ticker?.low} */} 93,850.0
              </span>
            </div>
            
            <button
              type="button"
              className="font-medium font-inter transition-opacity hover:opacity-80 hover:cursor-pointer text-base text-left"
              data-rac=""
            >
              <div className="flex flex-col">
                <p className="font-medium font-inter text-xs text-slate-400 text-sm">
                  24H Volume
                </p>
                <span className="text-sm font-medium font-inter tabular-nums leading-5 text-sm ">
                  {/* {ticker?.volume} */}385,449.32
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TickerComp({ market }: { market: string }) {
  return (
    <div className="flex h-[60px] shrink-0 space-x-4">
      <div className="flex flex-row relative ml-2 -mr-4">
        <img
          alt="SOL Logo"
          loading="lazy"
          decoding="async"
          data-nimg="1"
          className="z-10 rounded-full h-6 w-6 mt-4 outline-baseBackgroundL1"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVvBqZC_Q1TSYObZaMvK0DRFeHZDUtVMh08Q&s"
        />
        <img
          alt="USDC Logo"
          loading="lazy"
          decoding="async"
          data-nimg="1"
          className="h-6 w-6 -ml-2 mt-4 rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVvBqZC_Q1TSYObZaMvK0DRFeHZDUtVMh08Q&s"
        />
      </div>
      <button type="button" className="react-aria-Button" data-rac="">
        <div className="flex items-center justify-between flex-row cursor-pointer rounded-lg p-3 hover:opacity-80">
          <div className="flex items-center flex-row gap-2 undefined">
            <div className="flex flex-row relative">
              <p className="font-medium font-inter text-sm undefined">
                {market.replace("_", " / ")}
              </p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
