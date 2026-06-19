import { forwardRef } from "react";
import { DOCTOR_CHECK_POINTS } from "../data/explanationRules";
import { AXIS_LABEL, AXIS_ORDER } from "../types";
import type { ScoreResult } from "../types";

type Props = {
  result: ScoreResult;
};

/**
 * 医師向けPDFの版面。患者向けとは別に、判定の要点・各軸スコア・
 * レッドフラッグ該当項目・推奨確認事項を簡潔にまとめる。
 * 画面外に固定幅で描画し、html2canvasで画像化する。
 */
const DoctorPdfTemplate = forwardRef<HTMLDivElement, Props>(
  function DoctorPdfTemplate({ result }, ref) {
    const checkPoints = result.strongTypes
      .filter((axis) => DOCTOR_CHECK_POINTS[axis])
      .map((axis) => ({
        label: AXIS_LABEL[axis],
        points: DOCTOR_CHECK_POINTS[axis] as string[],
      }));

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
        <h1 style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 4px" }}>
          PPPD傾向チェック　医師用サマリー
        </h1>
        <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 20px" }}>
          本紙はスクリーニング補助情報です。診断確定を目的とするものではありません。
        </p>

        {/* レッドフラッグ */}
        <section
          style={{
            border: result.redFlagPositive
              ? "2px solid #fca5a5"
              : "2px solid #86efac",
            backgroundColor: result.redFlagPositive ? "#fef2f2" : "#f0fdf4",
            borderRadius: "10px",
            padding: "12px 16px",
            margin: "0 0 20px",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              fontWeight: 800,
              margin: 0,
              color: result.redFlagPositive ? "#b91c1c" : "#15803d",
            }}
          >
            レッドフラッグ：{result.redFlagPositive ? "陽性あり" : "なし"}
          </p>
          {result.redFlagPositive && (
            <>
              <p
                style={{
                  fontSize: "13px",
                  color: "#b91c1c",
                  margin: "4px 0 8px",
                }}
              >
                以下に「はい」の回答あり。器質的疾患の除外を優先してください。
              </p>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "22px",
                  fontSize: "15px",
                  color: "#7f1d1d",
                }}
              >
                {result.redFlagHits.map((t, i) => (
                  <li key={i} style={{ fontWeight: 700 }}>
                    {t}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        {/* 判定の要点 */}
        <section style={{ marginBottom: "20px", display: "flex", gap: "12px" }}>
          <div
            style={{
              flex: 1,
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "10px 14px",
            }}
          >
            <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
              合計点
            </p>
            <p style={{ fontSize: "26px", fontWeight: 800, margin: "2px 0 0" }}>
              {result.total} <span style={{ fontSize: "14px" }}>/ 90</span>
            </p>
          </div>
          <div
            style={{
              flex: 2,
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              padding: "10px 14px",
            }}
          >
            <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
              総合判定
            </p>
            <p style={{ fontSize: "17px", fontWeight: 700, margin: "2px 0 0" }}>
              {result.severityLabel}
            </p>
          </div>
        </section>

        {/* 各軸スコア */}
        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 8px" }}>
            各軸スコア
          </h2>
          {AXIS_ORDER.map((key) => {
            const strong = result.strongTypes.includes(key);
            return (
              <div
                key={key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "15px",
                  padding: "4px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <span style={{ fontWeight: strong ? 700 : 400 }}>
                  {AXIS_LABEL[key]}
                  {strong && (
                    <span style={{ color: "#b45309", marginLeft: "6px" }}>
                      ●高スコア
                    </span>
                  )}
                </span>
                <span style={{ fontWeight: 700 }}>
                  {result.axes[key]} / 15
                </span>
              </div>
            );
          })}
        </section>

        {/* 推奨確認事項 */}
        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 8px" }}>
            推奨確認事項（高スコア軸に基づく鑑別の参考）
          </h2>
          {checkPoints.length > 0 ? (
            checkPoints.map((cp) => (
              <div key={cp.label} style={{ marginBottom: "10px" }}>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    margin: "0 0 2px",
                    color: "#1d4ed8",
                  }}
                >
                  {cp.label}の傾向
                </p>
                <ul
                  style={{ margin: 0, paddingLeft: "20px", fontSize: "14px" }}
                >
                  {cp.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p style={{ fontSize: "15px", margin: 0 }}>
              高スコア軸はありません。
            </p>
          )}
        </section>

        {/* メモ欄 */}
        <section>
          <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 8px" }}>
            医師メモ
          </h2>
          <div
            style={{
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              height: "120px",
            }}
          />
        </section>
      </div>
    );
  }
);

export default DoctorPdfTemplate;
