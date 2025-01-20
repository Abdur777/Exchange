import React from "react";

export const BidTable = ({ bids }: { bids: [string, string][] }) => {
  let currentTotal = 0;
  const relevantBids = bids.slice(0, 20);
  const bidsWithTotal: [string, string, number][] = relevantBids.map(
    ([price, quantity]) => [price, quantity, (currentTotal += Number(quantity))]
  );
  const maxTotal = relevantBids.reduce((acc, [_, quantity]) => acc + Number(quantity), 0 );

  return (
    <div className="flex justify-start flex-col h-full w-full">
      {bidsWithTotal?.map(([price, quantity, total]) => (
        <div className="flex h-[25px] items-center" key={price}>
          <div className="h-full w-full">
            <Bid
              maxTotal={maxTotal}
              total={total}
              price={price}
              quantity={quantity}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

function Bid({
  price,
  quantity,
  total,
  maxTotal,
}: {
  price: string;
  quantity: string;
  total: number;
  maxTotal: number;
}) {
  const percentWidth = (100 * total) / maxTotal;

  return (
    <div className="flex items-center flex-row relative h-full w-full overflow-hidden px-3 border-b border-dashed border-transparent hover:border-baseBorderFocus/50">
      <div
        style={{
          position: "absolute",
          top: "1px",
          bottom: "1px",
          right: "12px",
          width: `${percentWidth}%`,
          background: "rgba(0, 194, 120, 0.16)",
          transition: "width 0.4s ease-in-out",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "1px",
          bottom: "1px",
          right: "12px",
          width: `${percentWidth * 0.6}%`,
          background: "rgba(0, 194, 120, 0.32)",
          transition: "width 0.4s ease-in-out",
        }}
      />
      <div className="flex justify-between text-xs w-full">
        <p className="z-10 w-[30%] text-left text-xs font-normal tabular-nums text-[#00C278E6]">
          {new Intl.NumberFormat().format(Number(price))}
        </p>
        <p className="z-10 w-[35%] text-right text-xs font-normal tabular-nums text-baseTextHighEmphasis/80">
          {quantity}
        </p>
        <p className="z-10 w-[35%] pr-2 text-right text-xs font-normal tabular-nums text-baseTextHighEmphasis/80">
          {total.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default BidTable;
