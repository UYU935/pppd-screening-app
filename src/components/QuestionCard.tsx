import { ANSWER_OPTIONS } from "../data/questions";
import { AXIS_LABEL } from "../types";
import type { AnswerValue, Question } from "../types";

type Props = {
  question: Question;
  index: number;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
};

export default function QuestionCard({
  question,
  index,
  value,
  onChange,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-1 text-base font-medium text-brand-600">
        {AXIS_LABEL[question.axis]}
      </div>
      <p className="mb-6 text-xl font-bold leading-relaxed text-slate-900">
        <span className="mr-2 text-slate-400">Q{index + 1}.</span>
        {question.text}
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ANSWER_OPTIONS.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={[
                "flex min-h-[5rem] flex-col items-center justify-center rounded-xl border-2 px-3 py-4 text-center transition",
                selected
                  ? "border-brand-600 bg-brand-500 text-white shadow"
                  : "border-slate-300 bg-white text-slate-800 hover:border-brand-400 hover:bg-brand-50",
              ].join(" ")}
              aria-pressed={selected}
            >
              <span className="text-3xl font-bold leading-none">
                {opt.value}
              </span>
              <span className="mt-2 text-base">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
