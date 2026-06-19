export type AnswerValue = 0 | 1 | 2 | 3;

export type AxisKey =
  | "core"
  | "visual"
  | "posture"
  | "closedSpace"
  | "anticipatoryAnxiety"
  | "avoidance";

export const AXIS_ORDER: AxisKey[] = [
  "core",
  "visual",
  "posture",
  "closedSpace",
  "anticipatoryAnxiety",
  "avoidance",
];

export const AXIS_LABEL: Record<AxisKey, string> = {
  core: "中核症状",
  visual: "視覚刺激",
  posture: "姿勢・動作",
  closedSpace: "閉鎖空間",
  anticipatoryAnxiety: "予期不安",
  avoidance: "回避・生活支障",
};

export type Question = {
  id: string;
  axis: AxisKey;
  text: string;
};

export type RedFlag = {
  id: string;
  text: string;
};

export type ScoreResult = {
  /** A〜F合計（0〜90点） */
  total: number;
  /** 各軸スコア（各0〜15点） */
  axes: Record<AxisKey, number>;
  /** 総合判定ラベル */
  severityLabel: string;
  /** 10点以上で「強い」と判定された軸 */
  strongTypes: AxisKey[];
  /** レッドフラッグに1つでも該当があるか */
  redFlagPositive: boolean;
  /** 「はい」と回答したレッドフラッグの本文一覧 */
  redFlagHits: string[];
};

/** 回答状態：未回答は undefined */
export type Answers = Record<string, AnswerValue | undefined>;

/** レッドフラッグ回答：未回答は undefined、true=はい / false=いいえ */
export type RedFlagAnswers = Record<string, boolean | undefined>;
