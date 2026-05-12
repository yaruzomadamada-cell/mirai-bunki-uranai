type ResultHeaderProps = {
  nickname: string;
  typeName: string;
  subtitle?: string;
  premium?: boolean;
};

export function ResultHeader({ nickname, typeName, subtitle, premium = false }: ResultHeaderProps) {
  const subtitleLines = subtitle
    ? subtitle.match(/.{1,16}/g) ?? [subtitle]
    : ["今の迷いに対して、", "現れやすい3つの未来を", "読み解きました。"];

  return (
    <section className="bg-cream py-2">
      <div className="paper-panel mx-auto overflow-hidden rounded-lg">
        <div className="grid min-w-0 gap-5 p-6 text-center sm:p-8">
          <div className="moon-seal mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold/40 bg-white">
            <span className="relative z-10 serif-title text-2xl font-bold text-gold">鑑</span>
          </div>
          <div className="min-w-0">
            <p className="inline-flex rounded-full bg-[#F5E4B8] px-3 py-1 text-xs font-bold text-premium">
              {premium ? "深掘り鑑定書" : "無料鑑定書"}
            </p>
            <h1 className="serif-title mt-4 text-2xl font-bold leading-tight text-ink sm:text-4xl">
              <span className="block">{nickname}さんの</span>
              <span className="block">未来分岐{premium ? " 深掘り" : ""}</span>
              <span className="block">鑑定書</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl leading-8 text-ink/68">
              {subtitleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
          <div className="mx-auto w-full max-w-md rounded-lg border border-[#e8dcc5] bg-white p-4">
            <p className="text-sm font-bold text-ink/54">あなたの運命分岐タイプ</p>
            <p className="serif-title mt-1 text-2xl font-bold text-purple">「{typeName}」</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export const ResultDocumentHeader = ResultHeader;
