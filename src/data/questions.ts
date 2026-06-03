import type { Question } from "../types";

/**
 * PPPD傾向チェック 独自問診（A〜F 各5問、各0〜3点 → 各軸15点満点、合計90点満点）。
 * 既存の標準尺度の文言は流用せず、独自に作成した設問文。
 */
export const QUESTIONS: Question[] = [
  // A. 中核症状
  { id: "core_1", axis: "core", text: "ふわふわする、揺れる、不安定な感じがある" },
  {
    id: "core_2",
    axis: "core",
    text: "回転するめまいより、浮動感・ふらつきが主体である",
  },
  { id: "core_3", axis: "core", text: "症状がほぼ毎日、または多くの日にある" },
  { id: "core_4", axis: "core", text: "症状が3か月以上続いている" },
  { id: "core_5", axis: "core", text: "立っている・歩いていると悪化する" },

  // B. 視覚刺激
  { id: "visual_1", axis: "visual", text: "スーパーや大型店で悪化する" },
  { id: "visual_2", axis: "visual", text: "人混みで悪化する" },
  {
    id: "visual_3",
    axis: "visual",
    text: "スマホやPC画面、スクロールで悪化する",
  },
  {
    id: "visual_4",
    axis: "visual",
    text: "明るい照明、白い壁、模様の多い床で悪化する",
  },
  { id: "visual_5", axis: "visual", text: "動くものを見ると悪化する" },

  // C. 姿勢・動作
  { id: "posture_1", axis: "posture", text: "立ち上がると悪化する" },
  { id: "posture_2", axis: "posture", text: "歩き出しや方向転換で悪化する" },
  { id: "posture_3", axis: "posture", text: "頭を動かすと悪化する" },
  { id: "posture_4", axis: "posture", text: "階段や坂道で悪化する" },
  {
    id: "posture_5",
    axis: "posture",
    text: "疲れていると動作時のふらつきが増える",
  },

  // D. 閉鎖空間・特定環境
  {
    id: "closedSpace_1",
    axis: "closedSpace",
    text: "トイレでめまいが起きそうになる",
  },
  { id: "closedSpace_2", axis: "closedSpace", text: "風呂や脱衣所で悪化する" },
  {
    id: "closedSpace_3",
    axis: "closedSpace",
    text: "美容院や歯科など、動きにくい場所で不安定になる",
  },
  {
    id: "closedSpace_4",
    axis: "closedSpace",
    text: "狭い部屋や逃げにくい場所で悪化する",
  },
  {
    id: "closedSpace_5",
    axis: "closedSpace",
    text: "一度めまいが起きた場所が苦手になっている",
  },

  // E. 予期不安・過覚醒
  {
    id: "anticipatoryAnxiety_1",
    axis: "anticipatoryAnxiety",
    text: "「また起きるかも」と考えてしまう",
  },
  {
    id: "anticipatoryAnxiety_2",
    axis: "anticipatoryAnxiety",
    text: "症状に意識が向きやすい",
  },
  {
    id: "anticipatoryAnxiety_3",
    axis: "anticipatoryAnxiety",
    text: "少しのふらつきでも不安が強くなる",
  },
  {
    id: "anticipatoryAnxiety_4",
    axis: "anticipatoryAnxiety",
    text: "緊張やストレスで悪化する",
  },
  {
    id: "anticipatoryAnxiety_5",
    axis: "anticipatoryAnxiety",
    text: "症状が出るとすぐ座りたくなる、逃げたくなる",
  },

  // F. 回避・生活支障
  { id: "avoidance_1", axis: "avoidance", text: "外出を控えるようになった" },
  {
    id: "avoidance_2",
    axis: "avoidance",
    text: "買い物や人混みを避けるようになった",
  },
  { id: "avoidance_3", axis: "avoidance", text: "仕事・家事・学校に支障がある" },
  { id: "avoidance_4", axis: "avoidance", text: "乗り物を避けるようになった" },
  { id: "avoidance_5", axis: "avoidance", text: "以前より活動範囲が狭くなった" },
];

/** 回答選択肢 */
export const ANSWER_OPTIONS: { value: 0 | 1 | 2 | 3; label: string }[] = [
  { value: 0, label: "なし" },
  { value: 1, label: "少しある" },
  { value: 2, label: "中等度ある" },
  { value: 3, label: "強くある" },
];
