# PPPD傾向チェック（院内説明補助ツール）

持続するふらつき・浮動感（PPPD = 持続性知覚性姿勢誘発めまい）の傾向を整理し、
診察時の説明やリハビリ方針の参考にするための、院内タブレット向けWebアプリです。

## このアプリについて

- このアプリは **院内説明補助ツール** です。
- **PPPDの診断を自動確定するものではありません。** 「PPPD傾向」「PPPD疑い」として扱います。
- **個人情報は入力・保存しません。** 氏名・生年月日・住所・電話番号などの入力欄はありません。
- 結果はブラウザ内で一時的に処理され、**PDF出力後にリセットできます**。
- `localStorage` への保存やサーバー送信は一切行いません（リロードやリセットで消去されます）。

## 主な機能

- レッドフラッグ（危険症状）の確認
- 30問の独自問診（A〜F 各5問・各0〜3点／合計90点満点）
- 総合スコアと4段階の傾向判定
- 6軸レーダーチャート（各15点満点）
- 軸スコア10点以上による「タイプ分類」
- タイプ別の患者向け説明・リハビリ提示
- 患者向け説明PDFの出力（医師確認欄・メモ欄つき、個人情報欄なし）
- 医師用サマリー（画面内のみ・PDFには載せません）
- リセット機能

## 技術構成

- React + TypeScript
- Vite
- Tailwind CSS
- Recharts（レーダーチャート）
- jsPDF + html2canvas（日本語PDF出力）

## セットアップ

```bash
npm install
npm run dev
```

ブラウザで表示されるローカルURL（既定では http://localhost:5173 ）を開きます。
院内LAN内の別端末（タブレット等）からアクセスする場合は、起動時に表示される
`Network:` のURL（例: `http://192.168.x.x:5173`）を使用してください。

### 本番ビルド

```bash
npm run build      # dist/ に出力
npm run preview    # ビルド結果をローカル確認
```

`dist/` を院内の静的Webサーバーやローカルブラウザで配信できます。

## スコアと判定

| 総合スコア | 判定 |
| --- | --- |
| 0〜19点 | PPPD傾向は低め |
| 20〜39点 | PPPD傾向あり |
| 40〜59点 | PPPD疑いが強い |
| 60点以上 | PPPD傾向が強く、生活支障も大きい |

各軸（中核症状／視覚刺激／姿勢・動作／閉鎖空間／予期不安／回避・生活支障）は
それぞれ15点満点。軸スコアが10点以上で「強い（該当タイプ）」と判定します。

## ディレクトリ構成

```
pppd-screening-app/
  src/
    components/   QuestionCard, ProgressBar, RadarChart, ResultSummary,
                  RehabPlan, PdfButton, PdfTemplate, RedFlagCheck, DoctorSummary
    data/         questions, rehabRules, explanationRules, redFlags
    logic/        scoring, classification, pdfGenerator
    pages/        Home, Questionnaire, Results
    types/        index.ts
    App.tsx
    main.tsx
```

## 注意

問診の設問文は既存の標準尺度の文言を流用せず、本アプリ独自に作成したものです。
本ツールの結果のみでPPPDと判断せず、必ず医師の診察と組み合わせて使用してください。
