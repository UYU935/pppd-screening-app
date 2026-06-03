import { useState } from "react";
import { generatePdfFromElement } from "../logic/pdfGenerator";

type Props = {
  targetRef: React.RefObject<HTMLElement>;
};

export default function PdfButton({ targetRef }: Props) {
  const [busy, setBusy] = useState(false);

  const handleClick = async () => {
    if (!targetRef.current || busy) return;
    setBusy(true);
    try {
      await generatePdfFromElement(targetRef.current);
    } catch (e) {
      console.error(e);
      alert("PDFの作成に失敗しました。もう一度お試しください。");
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      className="rounded-xl bg-brand-600 px-8 py-4 text-xl font-bold text-white shadow transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
    >
      {busy ? "PDFを作成中…" : "PDFを出力する"}
    </button>
  );
}
