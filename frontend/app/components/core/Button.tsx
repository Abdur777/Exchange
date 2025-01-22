
export const PrimaryButton = ({ children, onClick }: { children: string, onClick?: () => void }) => {
  return <button type="button" className="text-center font-semibold rounded-lg focus:ring-blue-200 focus:none focus:outline-none hover:opacity-90 disabled:opacity-80 disabled:hover:opacity-80 relative overflow-hidden h-[32px] text-sm px-3 py-1.5 mr-4 ">
      <div className="absolute inset-0 bg-blue-500 opacity-[16%]"></div>
      <div className="flex flex-row items-center justify-center gap-4"><p className="text-blue-500">{children}</p></div>
  </button>

} 

export const SuccessButton = ({ children, onClick }: { children: string, onClick?: () => void }) => {
  return <button type="button" className="text-center font-semibold rounded-lg focus:ring-green-200 focus:none focus:outline-none hover:opacity-90 disabled:opacity-80 disabled:hover:opacity-80 relative overflow-hidden h-[32px] text-sm px-3 py-1.5 mr-4 ">
      <div className="absolute inset-0 bg-green-500 opacity-[16%]"></div>
      <div className="flex flex-row items-center justify-center gap-4"><p className="text-green-500">{children}</p></div>
  </button>

}

export function BuyButton({
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

export function BigBuyButton () {
  return <button
  className="w-full overflow-hidden rounded-xl text-sm font-black hover:text-green-500 border-b-greenBorder bg-greenBackgroundTransparent text-green-500 h-12">
  Buy
</button>
}

export function BigSellButton () {
  return <button
  className="w-full overflow-hidden rounded-xl text-sm font-black border-b-redBorder bg-redBackgroundTransparent text-red-500 h-12">
  Sell
</button>
}

export function SellButton({
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

export function LimitButton({ type, setType }: { type: string; setType: any }) {
  return (
    <div
      className="flex flex-col cursor-pointer justify-center py-2"
      onClick={() => setType("limit")}
    >
      <div
        className={`text-sm font-semibold py-1 border-b-2 ${
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

export function MarketButton({ type, setType }: { type: string; setType: any }) {
  return (
    <div
      className="flex flex-col cursor-pointer justify-center py-2"
      onClick={() => setType("market")}
    >
      <div
        className={`font-semibold text-sm font-medium py-1 border-b-2 ${
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