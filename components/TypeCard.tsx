type TypeCardProps = {
  typeName: string;
  description: string;
  keywords: string[];
  themeLabel?: string;
};

export function TypeCard({ typeName, description, keywords, themeLabel }: TypeCardProps) {
  const descriptionLines = description
    .match(/.{1,17}/g)
    ?.map((line) => line.trim())
    .filter(Boolean) ?? description
    .split("。")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `${line}。`);

  return (
    <section className="fortune-card reveal-card rounded-lg p-6 sm:p-8">
      <p className="section-kicker">Type</p>
      <h2 className="ornament-title mt-2 text-2xl font-bold text-ink">{typeName}</h2>
      <p className="mt-5 leading-8 text-ink/74">
        {descriptionLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
      {themeLabel ? (
        <div className="mt-5 rounded-lg border border-[#e8dcc5] bg-[#fffaf0] p-4">
          <p className="text-xs font-bold text-[#8a6a1d]">今日のテーマに対する傾向</p>
          <p className="mt-2 text-sm leading-7 text-ink/70">
            <span className="block">「{themeLabel}」では、答えを急ぐよりも、</span>
            <span className="block">今の気持ちと現実の流れを分けて見るほど、</span>
            <span className="block">選択が整いやすいタイプです。</span>
          </p>
        </div>
      ) : null}
      <div className="mt-5 flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <span key={keyword} className="rounded-full border border-lavender/38 bg-white px-3 py-1.5 text-xs font-semibold text-ink/70">
            {keyword}
          </span>
        ))}
      </div>
    </section>
  );
}

export const TypeResultCard = TypeCard;
