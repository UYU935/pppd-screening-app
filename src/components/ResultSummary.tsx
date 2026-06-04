import {
  scoreLevelExplanation,
  strongTypeLabels,
  typeExplanations,
} from "../logic/classification";
import { AXIS_LABEL, AXIS_ORDER } from "../types";
import type { ScoreResult } from "../types";

type Props = {
  result: ScoreResult;
};

function severityColor(total: number): string {
  if (total >= 60) return "text-red-600";
  if (total >= 40) return "text-orange-600";
  if (total >= 20) return "text-amber-600";
  return "text-emerald-600";
}

export default function ResultSummary({ result }: Props) {
  const strong = strongTypeLabels(result);
  const typeTexts = typeExplanations(result);
  const levelTexts = scoreLevelExplanation(result);

  return (
    <div className="space-y-6">
      {/* 総合スコア・判定 */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-3 text-xl font-bold text-slate-900">総合スコア</h3>
        <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
          <span className={`text-5xl font-extrabold ${severityColor(result.total)}`}>
            {result.total}
          </span>
          <span className="text-2xl text-slate-400">/ 90点</span>
        </div>
        <p className={`mt-2 text-2xl font-bold ${severityColor(result.total)}`}>
          {result.severityLabel}
        </p>
      </div>

      {/* 各軸スコア */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-bold text-slate-900">各項目のスコア</h3>
        <div className="space-y-3">
          {AXIS_ORDER.map((key) => {
            const v = result.axes[key];
            const strongAxis = v >= 10;
            return (
              <div key={key} className="flex items-center gap-3">
                <span className="w-32 shrink-0 text-base text-slate-700">
                  {AXIS_LABEL[key]}
                </span>
                <div className="h-5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${
                      strongAxis ? "bg-orange-500" : "bg-brand-400"
                    }`}
                    style={{ width: `${(v / 15) * 100}%` }}
                  />
                </div>
                <span className="w-16 shrink-0 text-right text-base font-bold text-slate-800">
                  {v} / 15
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 強い傾向 */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-3 text-xl font-bold text-slate-900">
          目立っている傾向
        </h3>
        {strong.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {strong.map((label) => (
              <span
                key={label}
                className="rounded-full bg-orange-100 px-4 py-2 text-lg font-bold text-orange-700"
              >
                {label}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-lg text-slate-600">
            特に強く目立つ傾向はありませんでした。
          </p>
        )}
      </div>

      {/* 患者向け説明文 */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-3 text-xl font-bold text-slate-900">説明</h3>
        <div className="space-y-3">
          {levelTexts.map((t, i) => (
            <p key={i} className="text-lg leading-relaxed text-slate-800">
              {t}
            </p>
          ))}
        </div>

        {typeTexts.length > 0 && (
          <div className="mt-5 space-y-4 border-t border-slate-200 pt-5">
            <h4 className="text-lg font-bold text-slate-900">あなたの特徴</h4>
            {typeTexts.map((t) => (
              <div key={t.axis}>
                <p className="font-bold text-brand-600">{t.label}の傾向</p>
                <p className="text-lg leading-relaxed text-slate-800">
                  {t.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
