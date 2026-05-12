import Link from "next/link";
import { rankingItems } from "@/lib/fortune-data";

const badges = ["登録不要", "無料鑑定あり", "スマホで3分", "結果保存OK"];

export function HeroSection() {
  return (
    <section className="bg-cream px-4 py-8 sm:py-14">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="min-w-0">
          <p className="inline-flex rounded-full bg-[#F5E4B8] px-3 py-1 text-xs font-bold text-premium">
            登録不要の無料占い
          </p>
          <h1 className="serif-title mt-5 text-[2.05rem] font-bold leading-[1.18] text-ink sm:text-6xl">
            今の選択で、
            <br />
            未来はどう
            <br className="sm:hidden" />
            変わる？
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-ink/74 sm:text-lg">
            恋愛、復縁、仕事、人生の迷いに。
            <br />
            生年月日と今の状況から、
            <br />
            <span className="block sm:inline">「このまま進む未来」</span>
            <span className="block sm:inline">「動いた未来」</span>
            <span className="block sm:inline">「手放した未来」</span>
            3つの未来を無料で鑑定します。
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {badges.map((badge) => (
              <span key={badge} className="rounded-full border border-[#e8dcc5] bg-white px-3 py-1.5 text-xs font-bold text-ink/72">
                {badge}
              </span>
            ))}
          </div>
          <div className="mt-7 grid gap-3 sm:flex">
            <Link href="/fortune" className="button-shine rounded-lg bg-purple px-6 py-4 text-center font-bold text-white shadow-glow">
              無料で占ってみる
            </Link>
            <Link href="#ranking" className="rounded-lg border border-purple/20 bg-white px-6 py-4 text-center font-bold text-purple transition hover:border-purple">
              人気の占いを見る
            </Link>
          </div>
        </div>

        <div className="paper-panel min-w-0 rounded-lg p-5 sm:p-7">
          <div className="flex items-center justify-between gap-4 border-b border-[#e8dcc5] pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple">Reading Document</p>
              <h2 className="serif-title mt-1 text-2xl font-bold text-ink">あなたの未来分岐</h2>
            </div>
            <div className="moon-seal grid h-16 w-16 place-items-center rounded-full border border-gold/40 bg-[#FFF8EE]">
              <span className="relative z-10 h-5 w-5 rounded-full bg-gold" />
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {[
              ["01", "このまま進む未来", "今の流れを変えずに進んだ場合、何が残りやすいか。"],
              ["02", "動いた未来", "連絡・相談・準備など、自分から動いた先の変化。"],
              ["03", "手放した未来", "一度離れることで軽くなるもの、戻ってくるもの。"],
            ].map(([number, title, body]) => (
              <div key={title} className="rounded-lg border border-[#e8dcc5] bg-white p-4">
                <div className="flex items-center gap-3">
                  <span className="serif-title text-3xl font-bold text-gold">{number}</span>
                  <h3 className="font-bold text-ink">{title}</h3>
                </div>
                <p className="mt-2 text-sm leading-7 text-ink/62">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-2 rounded-lg bg-[#FFF8EE] p-4">
            {rankingItems.slice(0, 3).map((item) => (
              <Link key={item.id} href={item.href} className="flex items-center justify-between gap-3 rounded-md bg-white px-3 py-2 text-sm">
                <span className="font-bold text-ink">人気{item.rank}位：{item.label}</span>
                <span className="text-xs font-bold text-purple">無料</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const Hero = HeroSection;
