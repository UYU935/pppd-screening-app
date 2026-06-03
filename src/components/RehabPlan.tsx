import { CAUTION_INTRO, CAUTION_ITEMS } from "../data/rehabRules";
import { buildRehabPlan } from "../logic/classification";
import type { ScoreResult } from "../types";

type Props = {
  result: ScoreResult;
};

export default function RehabPlan({ result }: Props) {
  const plan = buildRehabPlan(result);

  return (
    <div className="space-y-6">
      {/* おすすめリハビリ */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-bold text-slate-900">
          おすすめのリハビリ
        </h3>
        <div className="space-y-5">
          {plan.map((item) => (
            <div key={item.title}>
              <p className="mb-2 text-lg font-bold text-brand-600">
                {item.title}
              </p>
              <ul className="list-disc space-y-1 pl-6">
                {item.details.map((d, i) => (
                  <li key={i} className="text-lg leading-relaxed text-slate-800">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 注意点（常に表示） */}
      <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6">
        <h3 className="mb-3 text-xl font-bold text-amber-800">
          日常生活の注意点
        </h3>
        <p className="mb-3 text-lg text-amber-800">{CAUTION_INTRO}</p>
        <ul className="list-disc space-y-1 pl-6">
          {CAUTION_ITEMS.map((c, i) => (
            <li key={i} className="text-lg text-amber-900">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
