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
          color: "#6A5ACD",
          width: 1,
          style: 0,
          visible: true,
          labelVisible: true,
        },
        horzLine: {
          color: "#6A5ACD",
          width: 1,
          style: 0,
          visible: true,
          labelVisible: true,
        },
      },
      rightPriceScale: {
        borderColor: "#485c7b",
      },
      timeScale: {
        borderColor: "#485c7b",
      },
    });

    this.chart = chart;

    // Add candlestick series
    this.candleSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderDownColor: "#ef5350",
      borderUpColor: "#26a69a",
      wickDownColor: "#ef5350",
      wickUpColor: "#26a69a",
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
