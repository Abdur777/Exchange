import { useEffect, useRef } from "react";
import { ChartManager } from "../utils/ChartManager";
import { KLine } from "../utils/types";
import { getKlines } from "../utils/httpClient";

export default function TradeView({ market }: { market: string }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartManagerRef = useRef<ChartManager>(null);
  useEffect(()=>{

    async function init(){
        let KlineData: KLine[] = [];
        try{
            KlineData  = await getKlines(market);
        }
        catch(e) {}
        if(chartRef){
            if(chartManagerRef.current){
                chartManagerRef.current.destroy();
            }
            console.log(KlineData)
            const chartManager = new ChartManager(
                chartRef.current,
                [
                  ...KlineData?.map((x) => ({
                    close: parseFloat(x.close),
                    high: parseFloat(x.high),
                    low: parseFloat(x.low),
                    open: parseFloat(x.open),
                    timestamp: new Date(x.end), 
                  })),
                ].sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1)) || [],
                {
                  background: "rgb(20,21,27)",
                  color: "white",
                }
            );
             //@ts-ignore
            chartManagerRef.current = chartManager;    
        }
    }

    init();

  },[market,chartRef])
  
    return  <div ref={chartRef} className="h-full"></div>
}
