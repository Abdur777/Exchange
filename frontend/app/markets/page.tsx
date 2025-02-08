import { getLineData, getLogo, getTickers } from "../utils/httpClient";
import MarketRow from "./MarketRow";
import { MarketHeader } from "./MarketHeader";

export default async function Markets() {
  const tickers = await getTickers();
  const lineDataMap = await getLineData();
  const images = await getLogo(tickers);
  return (
    <div className="flex flex-col flex-1 gap-3 rounded-xl bg-baseBackgroundL1 p-4 mx-auto mt-4 w-full max-w-7xl px-3 sm:px-6">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <MarketHeader />
          <tbody className="gap-2 divide-y divide-gray-800">
            {tickers?.map((ticker, index) => {
              const symbol = ticker.symbol.split("_")[0].toLowerCase();
              if(images.has(symbol)){
                return <MarketRow key={index} market={ticker} lineData={lineDataMap[ticker.symbol] || []} image={images.get(symbol)}/>
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}