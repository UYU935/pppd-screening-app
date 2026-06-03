import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as ReRadarChart,
  ResponsiveContainer,
} from "recharts";
import { AXIS_LABEL, AXIS_ORDER } from "../types";
import type { AxisKey } from "../types";

type Props = {
  axes: Record<AxisKey, number>;
  /** PDFキャプチャ用に固定サイズで描画したい場合 */
  fixedSize?: { width: number; height: number };
};

export default function RadarChart({ axes, fixedSize }: Props) {
  const data = AXIS_ORDER.map((key) => ({
    axis: AXIS_LABEL[key],
    value: axes[key],
  }));

  const chart = (
    <ReRadarChart
      data={data}
      width={fixedSize?.width}
      height={fixedSize?.height}
      outerRadius="62%"
      margin={{ top: 24, right: 56, bottom: 24, left: 56 }}
    >
      <PolarGrid />
      <PolarAngleAxis
        dataKey="axis"
        tick={{ fontSize: 14, fill: "#334155" }}
      />
      <PolarRadiusAxis
        angle={90}
        domain={[0, 15]}
        tickCount={4}
        tick={{ fontSize: 11, fill: "#94a3b8" }}
      />
      <Radar
        name="スコア"
        dataKey="value"
        stroke="#1d4ed8"
        fill="#2563eb"
        fillOpacity={0.45}
        isAnimationActive={false}
      />
    </ReRadarChart>
  );

  if (fixedSize) {
    return chart;
  }

  return (
    <div className="h-72 w-full sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        {chart}
      </ResponsiveContainer>
    </div>
  );
}
