import { RED_FLAGS, RED_FLAG_WARNING } from "../data/redFlags";
import type { RedFlagAnswers } from "../types";

type Props = {
  answers: RedFlagAnswers;
  onChange: (id: string, value: boolean) => void;
  onContinue: () => void;
  onBack: () => void;
};

export default function RedFlagCheck({
  answers,
  onChange,
  onContinue,
  onBack,
}: Props) {
  const anyPositive = Object.values(answers).some((v) => v === true);
  const allAnswered = RED_FLAGS.every((rf) => answers[rf.id] !== undefined);

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-2 text-2xl font-bold text-slate-900">
        はじめに：危険な症状の確認
      </h2>
      <p className="mb-6 text-base text-slate-600">
        以下の症状が今ある場合は「はい」を選んでください。
      </p>

      <div className="space-y-3">
        {RED_FLAGS.map((rf) => {
          const val = answers[rf.id];
          return (
            <div
              key={rf.id}
              className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-lg text-slate-900">{rf.text}</span>
              <div className="flex shrink-0 gap-3">
                <button
                  type="button"
                  onClick={() => onChange(rf.id, true)}
                  className={[
                    "min-w-[5rem] rounded-lg border-2 px-5 py-3 text-lg font-bold transition",
                    val === true
                      ? "border-red-600 bg-red-500 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-red-400",
                  ].join(" ")}
                  aria-pressed={val === true}
                >
                  はい
                </button>
                <button
                  type="button"
                  onClick={() => onChange(rf.id, false)}
                  className={[
                    "min-w-[5rem] rounded-lg border-2 px-5 py-3 text-lg font-bold transition",
                    val === false
                      ? "border-brand-600 bg-brand-500 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-brand-400",
                  ].join(" ")}
                  aria-pressed={val === false}
                >
                  いいえ
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {anyPositive && (
        <div className="mt-6 rounded-xl border-2 border-red-300 bg-red-50 p-5">
          <p className="text-lg font-bold text-red-700">{RED_FLAG_WARNING}</p>
          <p className="mt-2 text-base text-red-600">
            問診は続けられますが、必ず医師の診察を受けてください。
          </p>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-lg font-bold text-slate-700 hover:bg-slate-100"
        >
          戻る
        </button>
        <button
          type="button"
          onClick={onContinue}
          disabled={!allAnswered}
          className="rounded-lg bg-brand-600 px-8 py-3 text-lg font-bold text-white shadow transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          問診へ進む
        </button>
      </div>
      {!allAnswered && (
        <p className="mt-3 text-right text-base text-slate-500">
          すべての項目に回答すると進めます。
        </p>
      )}
    </div>
  );
}
