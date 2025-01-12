import { useState } from "react";

export const SwapUI = ({ market }: { market: string }) => {
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState("buy");
  const [type, setType] = useState("limit");

  

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col w-[332px] gap-4 rounded-lg bg-baseBackgroundL1 px-[16px] py-[16px]">
        <div className="flex flex-col gap-4">
          <div className="flex h-[48px] w-full overflow-hidden rounded-xl bg-baseBackgroundL2">
            <BuyButton activeTab={activeTab} setActiveTab={setActiveTab} />
            <SellButton activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between flex-row">
              <div className="items-center justify-start flex-row flex space-x-2">
                <LimitButton type={type} setType={setType} />
                <MarketButton type={type} setType={setType} />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col flex-1 gap-3 text-baseTextHighEmphasis">
                <div className="flex justify-between flex-row">
                  <button type="button" className="cursor-help">
                    <p className="relative text-xs font-normal text-baseTextMedEmphasis">
                      Balance
                      <span className="absolute bottom-0 left-0 w-full translate-y-full border-b border-dashed border-baseBorderMed"></span>
                    </p>
                  </button>
                  <p className="text-xs font-medium text-baseTextHighEmphasis">
                    0.00 USDC
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between flex-row">
                    <p className="text-xs font-normal text-baseTextMedEmphasis">Price</p>
                  </div>
                  <div className="flex flex-col relative">
                    <input placeholder="0" className="h-12 pl-3 rounded-lg border-2 border-solid border-baseBackgroundL2 bg-baseBackgroundL2 pr-12 text-left text-2xl leading-9 text-[$text] placeholder-baseTextMedEmphasis ring-0 transition focus:border-accentBlue focus:ring-0" type="text" value={amount} onChange={(e)=> setAmount(e.target.value)} inputMode="numeric"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function BuyButton({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: any;
}) {
  return (
    <button
      className={`w-full overflow-hidden rounded-xl text-sm font-semibold hover:text-green-500 ${
        activeTab === "buy"
          ? "border-b-greenBorder bg-greenBackgroundTransparent text-green-500"
          : "border-b-baseBorderMed hover:border-b-baseBorderFocus"
      }`}
      onClick={() => setActiveTab("buy")}
    >
      {/* <p className="text-center text-sm font-semibold text-greenText">Buy</p> */}Buy
    </button>
  );
}

function SellButton({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: any;
}) {
  return (
    <button
      className={`w-full overflow-hidden rounded-xl text-sm font-semibold hover:text-red-500 ${
        activeTab === "sell"
          ? "border-b-redBorder bg-redBackgroundTransparent text-red-500"
          : "border-b-baseBorderMed hover:border-b-baseBorderFocus"
      }`}
      onClick={() => setActiveTab("sell")}
    >
      {/* <p className="text-center text-sm font-semibold text-redText">Sell</p> */} Sell
    </button>
  );
}

function LimitButton({ type, setType }: { type: string; setType: any }) {
  return (
    <div
      className="flex flex-col cursor-pointer justify-center py-2"
      onClick={() => setType("limit")}
    >
      <div
        className={`text-sm font-medium py-1 border-b-2 ${
          type === "limit"
            ? "border-accentBlue text-baseTextHighEmphasis"
            : "border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"
        }`}
      >
        Limit
      </div>
    </div>
  );
}

function MarketButton({ type, setType }: { type: string; setType: any }) {
  return (
    <div
      className="flex flex-col cursor-pointer justify-center py-2"
      onClick={() => setType("market")}
    >
      <div
        className={`text-sm font-medium py-1 border-b-2 ${
          type === "market"
            ? "border-accentBlue text-baseTextHighEmphasis"
            : "border-b-2 border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"
        } `}
      >
        Market
      </div>
    </div>
  );
}
