export function MarketHeader() {
    return (
          <thead>
            <tr>
              <th className="border-b border-baseBorderLight px-1 py-3 text-sm font-bold text-baseTextMedEmphasis first:pl-2 last:pr-6">
                <div className="text-slate-400 flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-start text-left">
                  Name
                </div>
              </th>
              <th className="text-sm border-b border-baseBorderLight w-[17%] px-1 py-3  font-bold text-baseTextMedEmphasis first:pl-2 last:pr-6">
                <div className="text-slate-400 flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-end text-right">
                  Price
                </div>
              </th>
              <th className="text-sm border-b border-baseBorderLight w-[17%] px-1 py-3  font-bold text-baseTextMedEmphasis first:pl-2 last:pr-6">
                <div className="text-slate-400 flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-end text-right">
                  Market Cap
                </div>
              </th>
              <th className="text-sm border-b border-baseBorderLight w-[17%] px-1 py-3  font-bold text-baseTextMedEmphasis first:pl-2 last:pr-6">
                <div className="text-slate-400 flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-end text-right">
                  24h Volume
                </div>
              </th>
              <th className="text-sm border-b border-baseBorderLight w-[17%] px-1 py-3  font-bold text-baseTextMedEmphasis first:pl-2 last:pr-6">
                <div className="text-slate-400 flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-end text-right">
                  24h Change
                </div>
              </th>
              <th className="text-sm border-b border-baseBorderLight w-[17%] px-1 py-3  font-bold text-baseTextMedEmphasis first:pl-2 last:pr-6">
                <div className="text-slate-400 flex flex-row items-center px-1 first:pl-0 cursor-pointer select-none justify-end text-right">
                  Last 7 Days
                </div>
              </th>
            </tr>
          </thead>
    );
  }