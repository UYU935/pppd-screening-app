import { useRef } from "react";
import DoctorSummary from "../components/DoctorSummary";
import PdfButton from "../components/PdfButton";
import PdfTemplate from "../components/PdfTemplate";
import RadarChart from "../components/RadarChart";
import RehabPlan from "../components/RehabPlan";
import ResultSummary from "../components/ResultSummary";
import { RED_FLAG_WARNING } from "../data/redFlags";
import type { ScoreResult } from "../types";

type Props = {
  result: ScoreResult;
  onReset: () => void;
};

export default function Results({ result, onReset }: Props) {
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    if (
      window.confirm(
        "回答内容と結果をすべて消去して最初に戻ります。よろしいですか？"
      )
    ) {
      onReset();
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-2 text-3xl font-bold text-slate-900">チェック結果</h2>
      <p className="mb-6 text-base text-slate-500">
        この結果は診断を確定するものではありません。医師の診察と合わせてご確認ください。
      </p>

      {/* 患者さんへの案内（読み終えたら返却してもらう） */}
      <div className="mb-6 rounded-2xl border-4 border-brand-500 bg-brand-50 p-5 text-center shadow-sm">
        <p className="text-2xl font-extrabold text-brand-700 sm:text-3xl">
          読み終えたら、職員にタブレットをお戻しください
        </p>
      </div>

      {result.redFlagPositive && (
        <div className="mb-6 rounded-xl border-2 border-red-300 bg-red-50 p-5">
          <p className="text-lg font-bold text-red-700">{RED_FLAG_WARNING}</p>
        </div>
      )}

      {/* 総合スコア・判定・各軸・説明 */}
      <ResultSummary result={result} />

      {/* レーダーチャート */}
      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-2 text-xl font-bold text-slate-900">
          症状のバランス（レーダーチャート）
        </h3>
        <RadarChart axes={result.axes} />
      </div>

      {/* リハビリ・注意点 */}
      <div className="mt-6">
        <RehabPlan result={result} />
      </div>

      {/* 医師用サマリー */}
      <div className="mt-6">
        <DoctorSummary result={result} />
      </div>

      {/* 操作ボタン */}
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <PdfButton targetRef={pdfRef} />
        <button
          type="button"
          onClick={handleReset}
          className="rounded-xl border-2 border-slate-400 bg-white px-8 py-4 text-xl font-bold text-slate-700 transition hover:bg-slate-100"
        >
          リセット（結果を消去）
        </button>
      </div>
      <p className="mt-4 text-center text-base text-slate-500">
        PDFを出力したら「リセット」を押して、次の方のために結果を消去してください。
      </p>

      {/* PDF用の版面（画面外に配置してキャプチャ） */}
      <div
        style={{
          position: "fixed",
          left: "-10000px",
          top: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <PdfTemplate ref={pdfRef} result={result} />
      </div>
    </div>
  );
}
