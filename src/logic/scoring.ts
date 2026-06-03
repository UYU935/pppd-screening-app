import { QUESTIONS } from "../data/questions";
import { AXIS_ORDER } from "../types";
import type {
  Answers,
  AxisKey,
  RedFlagAnswers,
  ScoreResult,
} from "../types";

/** 総合判定ラベル（0〜90点） */
export function getSeverityLabel(total: number): string {
  if (total >= 60) return "PPPD傾向が強く、生活支障も大きい";
  if (total >= 40) return "PPPD疑いが強い";
  if (total >= 20) return "PPPD傾向あり";
  return "PPPD傾向は低め";
}

/** 各軸スコアを集計（未回答は0点として扱う） */
export function computeAxisScores(answers: Answers): Record<AxisKey, number> {
  const axes: Record<AxisKey, number> = {
    core: 0,
    visual: 0,
    posture: 0,
    closedSpace: 0,
    anticipatoryAnxiety: 0,
    avoidance: 0,
  };
  for (const q of QUESTIONS) {
    axes[q.axis] += answers[q.id] ?? 0;
  }
  return axes;
}

/** 「強い」と判定する軸の閾値（10点以上） */
export const STRONG_AXIS_THRESHOLD = 10;

export function computeScore(
  answers: Answers,
  redFlagAnswers: RedFlagAnswers
): ScoreResult {
  const axes = computeAxisScores(answers);
  const total = AXIS_ORDER.reduce((sum, key) => sum + axes[key], 0);
  const strongTypes = AXIS_ORDER.filter(
    (key) => axes[key] >= STRONG_AXIS_THRESHOLD
  );
  const redFlagPositive = Object.values(redFlagAnswers).some(
    (v) => v === true
  );

  return {
    total,
    axes,
    severityLabel: getSeverityLabel(total),
    strongTypes,
    redFlagPositive,
  };
}

/** 全問回答済みかどうか */
export function isAllAnswered(answers: Answers): boolean {
  return QUESTIONS.every((q) => answers[q.id] !== undefined);
}

/** 回答済みの問数 */
export function answeredCount(answers: Answers): number {
  return QUESTIONS.filter((q) => answers[q.id] !== undefined).length;
}
