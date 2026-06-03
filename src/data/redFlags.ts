import type { RedFlag } from "../types";

/** レッドフラッグ（1つでも「はい」があれば医師確認を強調） */
export const RED_FLAGS: RedFlag[] = [
  { id: "rf_headache", text: "急に出た激しい頭痛がある" },
  { id: "rf_speech", text: "ろれつが回らない" },
  { id: "rf_palsy", text: "手足の麻痺やしびれがある" },
  { id: "rf_diplopia", text: "物が二重に見える" },
  { id: "rf_loc", text: "意識を失った" },
  { id: "rf_chest", text: "胸痛・強い動悸がある" },
  { id: "rf_hearing", text: "新しい難聴や耳鳴りの悪化がある" },
  { id: "rf_vertigo", text: "今までと違う強い回転性めまいがある" },
];

export const RED_FLAG_WARNING =
  "この結果だけでPPPDとして扱うのは適切ではありません。まず医師による確認が必要です。";
