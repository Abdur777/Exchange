import { useRouter } from 'next/navigation'
import { Ticker } from "../utils/types"
import { formatVolumeToKMB } from '../utils/formatNumber';

export default function MarketRow({ market }: { market: Ticker }) {
    const router = useRouter()
    
    const handleMarketClick = () => {
        router.push(`/trade/${market.symbol}`)
    }

    return (
        <tr 
            className="hover:bg-baseBackgroundL2 cursor-pointer" 
            onClick={handleMarketClick}
        >
      <td className="text-sm tabular-nums px-2 py-3 last:pr-7">
        <div className="flex shrink">
          <div className="flex items-center undefined">
            <div className="relative flex-none overflow-hidden rounded-full border border-baseBorderMed">
              <div className="relative">
                <img
                  alt="SOL Logo"
                  loading="lazy"
                  width="40"
                  height="40"
                  decoding="async"
                  data-nimg="1"
                />
              </div>
            </div>
            <div className="ml-2 flex flex-col">
              <p className="whitespace-nowrap text-base font-bold text-baseTextHighEmphasis">
                {market.symbol.split("_")[0]}
              </p>
              <div className="flex items-center justify-start flex-row gap-2">
                <div className="font-medium text-left text-xs leading-5 text-baseTextMedEmphasis">
                    {market.symbol.split("_")[0]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="text-sm tabular-nums px-2 py-3 last:pr-7 text-right">
        <div className='flex justify-end gap-0.2'>
          <p className="text-base font-bold tabular-nums">
            $
          </p>
          <p className="font-inter text-base font-bold tabular-nums">
            {market.lastPrice}
          </p>
        </div>
      </td>
      <td className="text-sm tabular-nums px-2 py-3 last:pr-7 text-right">
        <p className="font-inter text-base font-bold tabular-nums">$123.9B</p>
      </td>
      <td className="text-sm tabular-nums px-2 py-3 last:pr-7 text-right">
        <div className='flex justify-end gap-0.2'>
          <p className="text-base font-bold tabular-nums">
            $
          </p>
          <p className="font-inter text-base font-bold tabular-nums">
            {formatVolumeToKMB(market.quoteVolume)}
          </p>
        </div>
      </td>
      <td className="text-sm tabular-nums px-2 py-3 last:pr-7 text-right">
        <p className={`font-inter text-base font-bold tabular-nums text-redText ${
                  Number(market.priceChangePercent) > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}>
          {(Number(market.priceChangePercent)*100).toFixed(2)}%
        </p>
      </td>
      <td className="text-sm tabular-nums px-2 py-3 last:pr-7 text-right">
        <div className="align-center flex justify-end">
          {/* <div className="recharts-wrapper">
            <svg
              className="recharts-surface"
              width="100"
              height="20"
              viewBox="0 0 100 20"
            >
              <title></title>
              <desc></desc>
              <defs>
                <clipPath id="recharts1-clip">
                  <rect x="1" y="1" height="18" width="98"></rect>
                </clipPath>
              </defs>
              <g className="recharts-layer recharts-line">
                <path
                  stroke="#fd4b4e"
                  stroke-width="2"
                  width="98"
                  height="18"
                  fill="none"
                  className="recharts-curve recharts-line-curve"
                  d="M1,9.116C2.21,8.893,3.42,8.67,4.63,7.777C5.84,6.885,7.049,1,8.259,1C9.469,1,10.679,4.016,11.889,5.908C13.099,7.801,14.309,10.85,15.519,12.354C16.728,13.859,17.938,14.934,19.148,14.934C20.358,14.934,21.568,9.64,22.778,9.64C23.988,9.64,25.198,14.643,26.407,15.116C27.617,15.589,28.827,15.353,30.037,15.826C31.247,16.299,32.457,19,33.667,19C34.877,19,36.086,17.605,37.296,16.668C38.506,15.73,39.716,13.706,40.926,13.375C42.136,13.044,43.346,13.21,44.556,12.878C45.765,12.547,46.975,11.476,48.185,11.066C49.395,10.657,50.605,10.615,51.815,10.421C53.025,10.226,54.235,9.9,55.444,9.9C56.654,9.9,57.864,10.121,59.074,10.563C60.284,11.005,61.494,12.539,62.704,13.284C63.914,14.029,65.123,15.035,66.333,15.035C67.543,15.035,68.753,12.522,69.963,12.297C71.173,12.072,72.383,12.184,73.593,11.959C74.802,11.734,76.012,10.05,77.222,9.282C78.432,8.513,79.642,7.348,80.852,7.348C82.062,7.348,83.272,7.586,84.481,8.061C85.691,8.537,86.901,11.043,88.111,11.949C89.321,12.854,90.531,13.494,91.741,13.494C92.951,13.494,94.16,13.355,95.37,13.078C96.58,12.801,97.79,11.648,99,10.495"
                ></path>
                <g className="recharts-layer"></g>
              </g>
            </svg>
          </div> */}
        </div>
      </td>
    </tr>
    )
}
