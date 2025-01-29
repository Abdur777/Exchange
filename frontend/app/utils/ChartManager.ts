import {
  ColorType,
  createChart as createLightWeightChart,
  CrosshairMode,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";
import { KLine } from "./types";

export class ChartManager {
  private candleSeries: ISeriesApi<"Candlestick">;
  private chart: any;
  private initialData: KLine[] = [];

  constructor(ref: any, initialData: any[], layout: { background: string; color: string }) {
    const chart = createLightWeightChart(ref, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: layout.background },
        textColor: layout.color,
      },
      grid: {
        horzLines: { color: "#2B2B43" },
        vertLines: { color: "#2B2B43" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: "#FFFFFF",
          width: 1,
          style: 3,
          visible: true,
          labelVisible: true,
        },
        horzLine: {
          color: "#FFFFFF",
          width: 1,
          style: 3,
          visible: true,
          labelVisible: true,
        },
      },
      rightPriceScale: {
        borderColor: "#transparent",
      },
      timeScale: {
        borderColor: "transparent",
      },
    });

    this.chart = chart;

    // Add candlestick series
    this.candleSeries = chart.addCandlestickSeries({
      upColor: "#00AB66",
      downColor: "#ef5350",
      borderDownColor: "#ef5350",
      borderUpColor: "#00AB66",
      wickDownColor: "#ef5350",
      wickUpColor: "#00AB66",
    });

    // Set initial data
    this.candleSeries.setData(
      initialData.map((data) => ({
        ...data,
        time: (data.timestamp / 1000) as UTCTimestamp,
      }))
    );
  }

  // public updateData(newData: KLine[]) {
  //   this.candleSeries.update(
  //     newData.map((data) => ({
  //       ...data,
  //       time: (data.timestamp / 1000) as UTCTimestamp,
  //     }))
  //   );
  // }

  public destroy() {
    this.chart.remove();
  }
}
