import React from 'react';

export const AskTable = ({ asks }: { asks: [string, string][] }) => {
    let currentTotal = 0;
    const relevantAsks = asks.slice(0, 15);
    relevantAsks.reverse();
    const asksWithTotal: [string, string, number][] = relevantAsks.map(([price, quantity]) => [
        price,
        quantity,
        currentTotal += Number(quantity)
    ]);
    const maxTotal = relevantAsks.reduce((acc, [_, quantity]) => acc + Number(quantity), 0);
    asksWithTotal.reverse();

    return (
        <div className="flex justify-start flex-col h-full w-full">
            {asksWithTotal.map(([price, quantity, total]) => (
                <div className="flex h-[25px] items-center" key={price}>
                    <div className="h-full w-full">
                        <Ask
                            maxTotal={maxTotal}
                            price={price}
                            quantity={quantity}
                            total={total}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

function Ask({ price, quantity, total, maxTotal }: {
    price: string;
    quantity: string;
    total: number;
    maxTotal: number;
}) {
    const percentWidth = (100 * total) / maxTotal;

    return (
        <div className="flex items-center flex-row relative h-full w-full overflow-hidden px-3 border-b border-dashed border-transparent hover:border-baseBorderFocus/50">
            {/* First background div with lighter opacity */}
            <div
                style={{
                    position: "absolute",
                    top: "1px",
                    bottom: "1px",
                    right: "12px",
                    width: `${percentWidth}%`,
                    background: "rgba(228, 75, 68, 0.16)",
                    transition: "width 0.4s ease-in-out",
                }}
            />
            {/* Second background div with darker opacity */}
            <div
                style={{
                    position: "absolute",
                    top: "1px",
                    bottom: "1px",
                    right: "12px",
                    width: `${percentWidth * 0.6}%`,
                    background: "rgba(228, 75, 68, 0.32)",
                    transition: "width 0.4s ease-in-out",
                }}
            />
            <div className="flex justify-between text-xs w-full">
                <p className="z-10 w-[30%] text-left text-xs font-medium tabular-nums text-[#FD4B4EE6]">
                    {new Intl.NumberFormat().format(Number(price))}
                </p>
                <p className="z-10 w-[35%] text-right text-xs font-medium tabular-nums font-inter">
                    {quantity}
                </p>
                <p className="z-10 w-[35%] pr-2 text-right text-xs font-medium tabular-nums font-inter0">
                    {total.toFixed(2)}
                </p>
            </div>
        </div>
    );
}

export default AskTable;