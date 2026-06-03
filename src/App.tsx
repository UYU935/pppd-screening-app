import { useMemo, useState } from "react";
import RedFlagCheck from "./components/RedFlagCheck";
import { computeScore, isAllAnswered } from "./logic/scoring";
import Home from "./pages/Home";
import Questionnaire from "./pages/Questionnaire";
import Results from "./pages/Results";
import type { AnswerValue, Answers, RedFlagAnswers } from "./types";

type Page = "home" | "redflag" | "questions" | "results";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [answers, setAnswers] = useState<Answers>({});
  const [redFlagAnswers, setRedFlagAnswers] = useState<RedFlagAnswers>({});

  const result = useMemo(
    () => computeScore(answers, redFlagAnswers),
    [answers, redFlagAnswers]
  );

  const handleAnswer = (id: string, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleRedFlag = (id: string, value: boolean) => {
    setRedFlagAnswers((prev) => ({ ...prev, [id]: value }));
  };

  // ブラウザ内のみで一時保持。リセットで完全消去（localStorageは未使用）。
  const reset = () => {
    setAnswers({});
    setRedFlagAnswers({});
    setPage("home");
    window.scrollTo({ top: 0 });
  };

  const goto = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0 });
  };

  const handleComplete = () => {
    if (isAllAnswered(answers)) goto("results");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <span className="text-lg font-bold text-brand-700">
            PPPD傾向チェック
          </span>
          {page !== "home" && (
            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-slate-300 px-3 py-1 text-base text-slate-600 hover:bg-slate-100"
            >
              最初に戻る
            </button>
          )}
        </div>
      </header>

      <main className="px-4 py-8 sm:py-10">
        {page === "home" && <Home onStart={() => goto("redflag")} />}

        {page === "redflag" && (
          <RedFlagCheck
            answers={redFlagAnswers}
            onChange={handleRedFlag}
            onContinue={() => goto("questions")}
            onBack={() => goto("home")}
          />
        )}

        {page === "questions" && (
          <Questionnaire
            answers={answers}
            onAnswer={handleAnswer}
            onComplete={handleComplete}
            onBackToStart={() => goto("redflag")}
          />
        )}

        {page === "results" && <Results result={result} onReset={reset} />}
      </main>

      <footer className="px-4 pb-10 pt-2">
        <p className="mx-auto max-w-3xl text-center text-sm text-slate-400">
          本アプリは院内説明補助ツールです。診断を自動確定するものではなく、個人情報の入力・保存は行いません。
        </p>
      </footer>
    </div>
  );
}
