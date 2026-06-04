import type { AxisKey } from "../types";

/** 傾向別の患者向け説明文（軸スコア10点以上で表示） */
export const TYPE_EXPLANATION: Partial<Record<AxisKey, string>> = {
  visual:
    "目から入る情報に脳が強く反応しやすい傾向です。スーパー、人混み、スマホ画面、白い壁などで悪化しやすい傾向があります。",
  posture:
    "立つ、歩く、頭を動かすなどの身体動作で、バランス調整が過敏になりやすい傾向です。",
  closedSpace:
    "トイレ、風呂、美容院、歯科など、狭い・逃げにくい・過去に症状が出た場所で反応しやすい傾向です。",
  anticipatoryAnxiety:
    "「また起きるかも」という予測が症状を強めやすい傾向です。これは気のせいではなく、脳の警戒システムが過敏になっている状態です。",
  avoidance:
    "症状そのものに加えて、避ける行動が増え、生活範囲が狭くなっている傾向です。",
};

/** 共通説明文（結果画面・PDF共通） */
export const COMMON_EXPLANATION =
  "この結果は、PPPDの可能性を判断するための参考情報です。PPPDは、耳や脳に重大な異常があるという意味ではなく、バランスを調整する脳の働きが過敏になり、視覚・姿勢・不安への反応が強くなっている状態です。";

/** 高スコア時（総合40点以上を高スコアとして扱う） */
export const HIGH_SCORE_EXPLANATION =
  "スコア上は、PPPDに合う特徴が比較的多くみられます。診察で他の病気を確認したうえで、前庭リハビリ、生活動作の調整、苦手場面への段階的な慣らしを行います。";

/** 低スコア時 */
export const LOW_SCORE_EXPLANATION =
  "今回の結果では、PPPDの典型的な傾向は強くありません。他のめまい疾患、自律神経、耳の病気、片頭痛なども含めて診察で確認します。";

/** 高スコア判定の閾値（総合スコア） */
export const HIGH_SCORE_THRESHOLD = 40;

/** 医師用：高スコア軸ごとの推奨確認事項 */
export const DOCTOR_CHECK_POINTS: Partial<Record<AxisKey, string[]>> = {
  closedSpace: [
    "排便時迷走神経反射",
    "起立性低血圧",
    "入浴時血圧変動",
    "パニック発作",
    "過去の発症場所との条件付け",
  ],
  visual: [
    "前庭片頭痛",
    "視覚誘発性めまい",
    "スマホ・PC使用時間",
    "眼科的問題",
  ],
  posture: ["BPPV残存", "前庭機能低下", "起立性低血圧", "歩行不安"],
};
