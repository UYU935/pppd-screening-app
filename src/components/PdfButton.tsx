import { useState } from "react";
import { generatePdfFromElement } from "../logic/pdfGenerator";

type Props = {
  targetRef: React.RefObject<HTMLElement>;
  /** ボタンに表示する文言 */
  label?: string;
  /** 保存するPDFのファイル名 */
  fileName?: string;
  /** 配色テーマ。doctor はグレー系で患者向けと区別する */
  variant?: "patient" | "doctor";
};

export default function PdfButton({
  targetRef,
  label = "PDFを出力する",
  fileName,
  variant = "patient",
}: Props) {
  const [busy, setBusy] = useState(false);

  const handleClick = async () => {
    if (!targetRef.current || busy) return;
    setBusy(true);
    try {
      await generatePdfFromElement(targetRef.current, fileName);
    } catch (e) {
      console.error(e);
      alert("PDFの作成に失敗しました。もう一度お試しください。");
    } finally {
      setBusy(false);
    }
  };

  const colorClass =
    variant === "doctor"
      ? "bg-slate-700 hover:bg-slate-800"
      : "bg-brand-600 hover:bg-brand-700";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      className={`rounded-xl px-8 py-4 text-xl font-bold text-white shadow transition disabled:cursor-not-allowed disabled:bg-slate-300 ${colorClass}`}
    >
      {busy ? "PDFを作成中…" : label}
    </button>
  );
}
