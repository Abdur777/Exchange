import { SignalingManager } from "@/app/utils/SignalingManager"
import { useEffect, useState } from "react"
import { BidTable } from "./BidTable"
import AskTable from "./AskTable"

export function Depth({ market }: {market: string}) {
    const [bids, setBids]  = useState<[string,string][]>()
    const [asks, setAsks]  = useState<[string,string][]>()
    useEffect(() => {
        SignalingManager.getInstance().registerCallBack("depth", (data: any) => {
            // console.log("depth has been updated",data);
            setBids(( prev ) => {
                const bidsAfterUpdate = [...(prev || [])];

                for (let i = 0; i < bidsAfterUpdate.length; i++) {
                    for (let j = 0; j < data.bids.length; j++)  {
                        if (bidsAfterUpdate[i][0] === data.bids[j][0]) {
                            bidsAfterUpdate[i][1] = data.bids[j][1];
                            if (Number(bidsAfterUpdate[i][1]) === 0) {
                                bidsAfterUpdate.splice(i, 1);
                            }
                            break;
                        }
                    }
                }

                for (let j = 0; j < data.bids.length; j++)  {
                    if (Number(data.bids[j][1]) !== 0 && !bidsAfterUpdate.map(x => x[0]).includes(data.bids[j][0])) {
                        bidsAfterUpdate.push(data.bids[j]);
                        break;
                    }
                }
                bidsAfterUpdate.sort((x, y) => Number(y[0]) > Number(x[0]) ? -1 : 1);
                return bidsAfterUpdate; 
                
            })

            setAsks((originalAsks) => {
                const asksAfterUpdate = [...(originalAsks || [])];

                for (let i = 0; i < asksAfterUpdate.length; i++) {
                    for (let j = 0; j < data.asks.length; j++)  {
                        if (asksAfterUpdate[i][0] === data.asks[j][0]) {
                            asksAfterUpdate[i][1] = data.asks[j][1];
                            if (Number(asksAfterUpdate[i][1]) === 0) {
                                asksAfterUpdate.splice(i, 1);
                            }
                            break;
                        }
                    }
                }

                for (let j = 0; j < data.asks.length; j++)  {
                    if (Number(data.asks[j][1]) !== 0 && !asksAfterUpdate.map(x => x[0]).includes(data.asks[j][0])) {
                        asksAfterUpdate.push(data.asks[j]);
                        break;
                    }
                }
                asksAfterUpdate.sort((x, y) => Number(y[0]) > Number(x[0]) ? 1 : -1);
                return asksAfterUpdate; 
            });
        },`DEPTH-${market}`) 
        SignalingManager.getInstance().sendMessage({"method":"SUBSCRIBE","params":[`depth.${market}`]});
        return () => {
            SignalingManager.getInstance().sendMessage({"method":"UNSUBSCRIBE","params":[`depth.${market}`]});
            SignalingManager.getInstance().deRegisterCallback("depth", `DEPTH-${market}`);
        }
    }, [])

    return <div className="flex flex-col h-full">
        <div className="flex flex-col grow overflow-y-hidden">
            <div className="flex flex-col h-full grow overflow-x-hidden">
                <div className="flex flex-row gap-3 px-3 py-2">
                    <p className="font-medium text-baseTextHighEmphasis w-1/3 text-xs font-medium text-sm font-inter">Price (USDC)</p>
                    <button type="button" className="font-medium text-sm font-inter transition-opacity hover:opacity-80 hover:cursor-pointer h-auto w-1/3 truncate text-right text-xs text-baseTextMedEmphasis">Size (SOL)</button>
                    <button type="button" className="font-medium text-sm font-inter transition-opacity hover:opacity-80 hover:cursor-pointer h-auto w-1/3 truncate text-right text-xs text-baseTextMedEmphasis">Total (SOL)</button>
                </div>
                <div className="flex flex-col no-scrollbar h-full flex-1 overflow-y-auto font-sans">
                    <div className="flex flex-col flex-1">
                        {asks && <AskTable asks={asks}/>}
                    </div>
                    <div className="flex flex-col flex-0 z-20 snap-center bg-baseBackgroundL1 px-3 py-1 sticky bottom-0">
                        Ticker
                    </div>
                    <div className="flex flex-col flex-1">
                        {bids && <BidTable bids={bids} />}
                    </div>
                </div>
                <div className="relative mx-3 my-1 overflow-hidden">BuySellPressure%</div>
            </div>
        </div>
    </div>
}