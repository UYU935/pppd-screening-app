import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import { QUESTIONS } from "../data/questions";
import { answeredCount, isAllAnswered } from "../logic/scoring";
import type { AnswerValue, Answers } from "../types";

type Props = {
  answers: Answers;
  onAnswer: (id: string, value: AnswerValue) => void;
  /** すべて回答して「結果を見る」を押したとき */
  onComplete: () => void;
  /** 最初の問題で「戻る」を押したとき（レッドフラッグ画面へ） */
  onBackToStart: () => void;
};

export default function Questionnaire({
  answers,
  onAnswer,
  onComplete,
  onBackToStart,
}: Props) {
  const [index, setIndex] = useState(0);
  const total = QUESTIONS.length;
  const question = QUESTIONS[index];
  const isLast = index === total - 1;
  const currentAnswer = answers[question.id];

  const handleAnswer = (value: AnswerValue) => {
    // 選択しても自動では進まない。色をつけて待機し、変更も可能にする。
    // 実際に進むのは「次へ」を押したとき。
    onAnswer(question.id, value);
  };

  const goPrev = () => {
    if (index === 0) {
      onBackToStart();
    } else {
      setIndex((i) => Math.max(i - 1, 0));
    }
  };

  const goNext = () => {
    if (!isLast) setIndex((i) => Math.min(i + 1, total - 1));
  };

  const allDone = isAllAnswered(answers);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        {/* 進捗は「今いる設問の位置」で表示。「次へ」で設問が変わった瞬間に伸びる。 */}
        <ProgressBar current={index + 1} total={total} />
      </div>

      <QuestionCard
        question={question}
        index={index}
        value={currentAnswer}
        onChange={handleAnswer}
      />

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          className="rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-lg font-bold text-slate-700 hover:bg-slate-100"
        >
          戻る
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={onComplete}
            disabled={!allDone}
            className="rounded-lg bg-brand-600 px-8 py-3 text-lg font-bold text-white shadow transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            結果を見る
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            disabled={currentAnswer === undefined}
            className="rounded-lg bg-brand-600 px-8 py-3 text-lg font-bold text-white shadow transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            次へ
          </button>
        )}
      </div>

      {isLast && !allDone && (
        <p className="mt-3 text-right text-base text-slate-500">
          未回答の項目があります（{answeredCount(answers)} / {total} 問）。
          「戻る」で確認してください。
        </p>
      )}
    </div>
  );
}
