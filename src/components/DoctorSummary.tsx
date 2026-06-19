import { useState } from "react";
import { DOCTOR_CHECK_POINTS } from "../data/explanationRules";
import { AXIS_LABEL, AXIS_ORDER } from "../types";
import type { ScoreResult } from "../types";

type Props = {
  result: ScoreResult;
};

/** 医師用サマリー（画面内表示。同内容は「医師向けPDF」でも出力可能） */
export default function DoctorSummary({ result }: Props) {
  const [open, setOpen] = useState(false);

  const checkPoints = result.strongTypes
    .filter((axis) => DOCTOR_CHECK_POINTS[axis])
    .map((axis) => ({
      label: AXIS_LABEL[axis],
      points: DOCTOR_CHECK_POINTS[axis] as string[],
    }));

  return (
    <div className="rounded-2xl border border-slate-300 bg-slate-50 p-6">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="text-xl font-bold text-slate-800">
          医師用サマリー（「医師向けPDF」で出力可）
        </h3>
        <span className="text-2xl text-slate-500">{open ? "−" : "＋"}</span>
      </button>

      {open && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <p className="text-sm text-slate-500">合計点</p>
              <p className="text-2xl font-bold text-slate-900">
                {result.total} / 90
              </p>
            </div>
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <p className="text-sm text-slate-500">レッドフラッグ</p>
              <p
                className={`text-2xl font-bold ${
                  result.redFlagPositive ? "text-red-600" : "text-emerald-600"
                }`}
              >
                {result.redFlagPositive ? "陽性あり" : "なし"}
              </p>
            </div>
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <p className="text-sm text-slate-500">高スコア軸</p>
              <p className="text-lg font-bold text-slate-900">
                {result.strongTypes.length > 0
                  ? result.strongTypes.map((a) => AXIS_LABEL[a]).join("、")
                  : "なし"}
              </p>
            </div>
          </div>

          {result.redFlagPositive && (
            <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4">
              <p className="mb-2 font-bold text-red-700">
                レッドフラッグ該当項目（「はい」の回答）
              </p>
              <ul className="list-disc space-y-1 pl-6">
                {result.redFlagHits.map((t, i) => (
                  <li key={i} className="text-base font-bold text-red-800">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-red-700">
                器質的疾患の除外を優先してください。
              </p>
            </div>
          )}

          <div className="rounded-lg bg-white p-4 shadow-sm">
            <p className="mb-2 font-bold text-slate-800">各軸スコア</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
              {AXIS_ORDER.map((key) => (
                <div key={key} className="flex justify-between text-base">
                  <span className="text-slate-600">{AXIS_LABEL[key]}</span>
                  <span className="font-bold text-slate-900">
                    {result.axes[key]} / 15
                  </span>
                </div>
              ))}
            </div>
          </div>

          {checkPoints.length > 0 && (
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="mb-2 font-bold text-slate-800">推奨確認事項</p>
              <div className="space-y-3">
                {checkPoints.map((cp) => (
                  <div key={cp.label}>
                    <p className="font-bold text-brand-600">{cp.label}の傾向</p>
                    <ul className="list-disc pl-6">
                      {cp.points.map((p, i) => (
                        <li key={i} className="text-base text-slate-700">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
