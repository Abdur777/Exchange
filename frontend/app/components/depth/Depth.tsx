import { SignalingManager } from "@/app/utils/SignalingManager"
import { useEffect, useState } from "react"

export function Depth({ market }: {market: string}) {
    const [bids, setBids]  = useState<[string,string][]>()
    const [asks, setAsks]  = useState<[string,string][]>()
    useEffect(() => {
        SignalingManager.getInstance().registerCallBack("depth", (data: any) => {
            console.log("depth has been updated",data);
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
                        AskTable
                    </div>
                    <div className="flex flex-col flex-0 z-20 snap-center bg-baseBackgroundL1 px-3 py-1 sticky bottom-0">
                        Ticker
                    </div>
                    <div className="flex flex-col flex-1">
                        BidTable
                    </div>
                </div>
                <div className="relative mx-3 my-1 overflow-hidden">BuySellPressure%</div>
            </div>
        </div>
    </div>
}