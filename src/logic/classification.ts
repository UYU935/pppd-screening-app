import {
  COMMON_EXPLANATION,
  HIGH_SCORE_EXPLANATION,
  HIGH_SCORE_THRESHOLD,
  LOW_SCORE_EXPLANATION,
  TYPE_EXPLANATION,
} from "../data/explanationRules";
import {
  COMMON_REHAB,
  TYPE_REHAB,
  type RehabItem,
} from "../data/rehabRules";
import { AXIS_LABEL } from "../types";
import type { AxisKey, ScoreResult } from "../types";

/** 強い傾向の軸ラベル一覧 */
export function strongTypeLabels(result: ScoreResult): string[] {
  return result.strongTypes.map((key) => AXIS_LABEL[key]);
}

/** 傾向別の患者向け説明文（強い傾向のみ） */
export function typeExplanations(
  result: ScoreResult
): { axis: AxisKey; label: string; text: string }[] {
  return result.strongTypes
    .filter((axis) => TYPE_EXPLANATION[axis])
    .map((axis) => ({
      axis,
      label: AXIS_LABEL[axis],
      text: TYPE_EXPLANATION[axis] as string,
    }));
}

/** 総合スコアに応じた説明文（共通＋高/低スコア） */
export function scoreLevelExplanation(result: ScoreResult): string[] {
  const lines = [COMMON_EXPLANATION];
  if (result.total >= HIGH_SCORE_THRESHOLD) {
    lines.push(HIGH_SCORE_EXPLANATION);
  } else {
    lines.push(LOW_SCORE_EXPLANATION);
  }
  return lines;
}

/** 提示するリハ一覧（共通＋強い傾向の追加メニュー） */
export function buildRehabPlan(result: ScoreResult): RehabItem[] {
  const plan: RehabItem[] = [...COMMON_REHAB];
  for (const axis of result.strongTypes) {
    const item = TYPE_REHAB[axis];
    if (item) plan.push(item);
  }
  return plan;
}
