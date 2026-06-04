import { forwardRef } from "react";
import {
  buildRehabPlan,
  scoreLevelExplanation,
  strongTypeLabels,
  typeExplanations,
} from "../logic/classification";
import { AXIS_LABEL, AXIS_ORDER } from "../types";
import type { ScoreResult } from "../types";
import RadarChart from "./RadarChart";

type Props = {
  result: ScoreResult;
};

/**
 * 患者向けPDFの版面。画面外に固定幅で描画し、html2canvasで画像化する。
 * 個人情報欄は設けない。医師確認欄（チェックボックス）とメモ欄を含む。
 */
const PdfTemplate = forwardRef<HTMLDivElement, Props>(function PdfTemplate(
  { result },
  ref
) {
  const strong = strongTypeLabels(result);
  const typeTexts = typeExplanations(result);
  const levelTexts = scoreLevelExplanation(result);
  const plan = buildRehabPlan(result);

  return (
    <div
      ref={ref}
      style={{
        width: "800px",
        padding: "40px",
        backgroundColor: "#ffffff",
        color: "#0f172a",
        fontFamily:
          'system-ui, -apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif',
        lineHeight: 1.7,
      }}
    >
      <h1 style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 8px" }}>
        PPPD傾向チェック結果
      </h1>

      {/* 注意書き */}
      <div
        style={{
          border: "2px solid #fcd34d",
          backgroundColor: "#fffbeb",
          borderRadius: "10px",
          padding: "12px 16px",
          margin: "12px 0 20px",
          fontSize: "14px",
          color: "#92400e",
        }}
      >
        <p style={{ margin: 0 }}>
          ・本結果は診断を確定するものではありません。
        </p>
        <p style={{ margin: "4px 0 0" }}>
          ・医師の診察と組み合わせて判断します。
        </p>
      </div>

      {/* 総合スコア */}
      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 6px" }}>
          総合スコア
        </h2>
        <p style={{ fontSize: "16px", margin: 0 }}>
          <span style={{ fontSize: "32px", fontWeight: 800 }}>
            {result.total}
          </span>{" "}
          / 90点　— {result.severityLabel}
        </p>
      </section>

      {/* レーダーチャート＋各軸 */}
      <section style={{ marginBottom: "20px", display: "flex", gap: "16px" }}>
        <div style={{ width: "360px", height: "300px" }}>
          <RadarChart axes={result.axes} fixedSize={{ width: 360, height: 300 }} />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 8px" }}>
            各項目スコア
          </h2>
          {AXIS_ORDER.map((key) => (
            <div
              key={key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "15px",
                padding: "3px 0",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <span>{AXIS_LABEL[key]}</span>
              <span style={{ fontWeight: 700 }}>{result.axes[key]} / 15</span>
            </div>
          ))}
        </div>
      </section>

      {/* 傾向分類 */}
      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 6px" }}>
          目立っている傾向
        </h2>
        <p style={{ fontSize: "15px", margin: 0 }}>
          {strong.length > 0
            ? strong.map((s) => `${s}の傾向`).join("　")
            : "特に強く目立つ傾向はありませんでした。"}
        </p>
      </section>

      {/* あなたの特徴 */}
      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 6px" }}>
          あなたの特徴
        </h2>
        {levelTexts.map((t, i) => (
          <p key={i} style={{ fontSize: "15px", margin: "0 0 6px" }}>
            {t}
          </p>
        ))}
        {typeTexts.map((t) => (
          <p key={t.axis} style={{ fontSize: "15px", margin: "0 0 6px" }}>
            <strong>{t.label}の傾向：</strong>
            {t.text}
          </p>
        ))}
      </section>

      {/* おすすめリハビリ（PDFでは新しいページの先頭から始める） */}
      <section data-pdf-break style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 8px" }}>
          おすすめリハビリ
        </h2>
        {plan.map((item) => (
          <div key={item.title} style={{ marginBottom: "10px" }}>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 700,
                margin: "0 0 2px",
                color: "#1d4ed8",
              }}
            >
              {item.title}
            </p>
            <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "14px" }}>
              {item.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
});

export default PdfTemplate;
