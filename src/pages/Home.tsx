type Props = {
  onStart: () => void;
};

export default function Home({ onStart }: Props) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
      <h1 className="mb-6 text-4xl font-extrabold text-slate-900 sm:text-5xl">
        PPPD傾向チェック
      </h1>
      <p className="mb-8 text-xl leading-relaxed text-slate-700">
        このチェックは、持続するふらつき・浮動感の特徴を整理し、診察時の説明やリハビリ方針の参考にするものです。
        <br />
        <span className="font-bold text-slate-900">
          診断を確定するものではありません。
        </span>
      </p>

      <div className="mb-10 w-full rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
        <p className="text-lg leading-relaxed text-slate-700">
          ・お名前や生年月日などの個人情報は入力しません。
        </p>
        <p className="mt-2 text-lg leading-relaxed text-slate-700">
          ・回答内容は保存されず、PDF出力後にリセットできます。
        </p>
        <p className="mt-2 text-lg leading-relaxed text-slate-700">
          ・所要時間は5分程度です。30問にお答えください。
        </p>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="rounded-2xl bg-brand-600 px-12 py-5 text-2xl font-bold text-white shadow-lg transition hover:bg-brand-700"
      >
        問診を開始する
      </button>
    </div>
  );
}
