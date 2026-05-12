import Link from "next/link";

const premiumDetails = [
  "90日後、今の悩みがどの方向へ進みやすいか",
  "動くべき時期と、まだ待った方がいい時期",
  "連絡・決断・距離を置くタイミング",
  "相手や周囲があなたに与えている影響",
  "今選ぶと後悔しやすい行動",
  "手放した場合に残るもの、戻ってくるもの",
  "3か月以内に起こりやすい小さな変化",
  "今のあなたに必要な言葉",
  "最終的にどの未来を選びやすいか",
];

export function PremiumIntroSection() {
  return (
    <section className="bg-white px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-lg border border-gold/30 bg-[#FFF8EE] shadow-soft">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-6 sm:p-8">
            <p className="section-kicker">Premium Reading</p>
            <h2 className="ornament-title mt-2 text-3xl font-bold text-ink">無料鑑定の先で、さらに深く読めること</h2>
            <p className="mt-5 leading-8 text-ink/72">
              無料鑑定では、今のあなたに現れやすい3つの未来を読み解きます。
              深掘り鑑定では、その未来がいつ、どんな形で動きやすいのかを90日先まで詳しく鑑定します。
            </p>
            <div className="mt-6 rounded-lg border border-gold/30 bg-white p-5">
              <p className="text-sm font-bold text-premium">未来分岐 深掘り鑑定</p>
              <p className="serif-title mt-1 text-4xl font-bold text-ink">980円</p>
              <p className="mt-2 text-xs leading-6 text-ink/58">無料鑑定後に、希望する方だけ購入できます。</p>
            </div>
            <Link href="/fortune" className="button-shine mt-6 inline-flex w-full justify-center rounded-lg bg-premium px-5 py-4 font-bold text-white sm:w-auto">
              980円で深掘り鑑定を見る
            </Link>
          </div>
          <div className="bg-white p-6 sm:p-8">
            <h3 className="serif-title text-2xl font-bold text-ink">有料でわかること</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {premiumDetails.map((item, index) => (
                <div key={item} className="rounded-lg border border-[#e8dcc5] bg-[#FFFDF8] p-4">
                  <span className="serif-title text-xl font-bold text-gold">{String(index + 1).padStart(2, "0")}</span>
                  <p className="mt-2 text-sm font-semibold leading-7 text-ink/72">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
