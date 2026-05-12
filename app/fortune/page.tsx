import type { Metadata } from "next";
import { FortuneForm } from "@/components/FortuneForm";
import { themeLabels } from "@/lib/fortune-data";
import type { ThemeId } from "@/lib/types";

export const metadata: Metadata = {
  title: "無料鑑定フォーム",
  description: "あなたの今の迷いを教えてください。生年月日と今の状況から、3つの未来分岐を無料で占います。",
  alternates: {
    canonical: "/fortune",
  },
  openGraph: {
    title: "無料で未来分岐を占う",
    description: "恋愛、復縁、仕事、人生の迷いに。3つの未来分岐を無料で占います。",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
  },
};

type FortunePageProps = {
  searchParams: Promise<{ theme?: string }>;
};

export default async function FortunePage({ searchParams }: FortunePageProps) {
  const query = await searchParams;
  const initialTheme = Object.keys(themeLabels).includes(query.theme ?? "") ? (query.theme as ThemeId) : "contact";

  return (
    <main className="bg-[#FFFDF8]">
      <section className="bg-cream px-4 py-10 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <div className="min-w-0">
            <p className="inline-flex rounded-full bg-[#F5E4B8] px-3 py-1 text-xs font-bold text-premium">無料鑑定フォーム</p>
            <h1 className="serif-title mt-4 text-3xl font-bold leading-tight text-ink sm:text-5xl">
              あなたの今の迷いを
              <br />
              教えてください
            </h1>
            <p className="mt-5 max-w-2xl leading-8 text-ink/72">
              <span className="block">生年月日と今の状況から、</span>
              <span className="block">現れやすい3つの未来を鑑定します。</span>
              <span className="block">いま答えを急がず、まずは</span>
              <span className="block">「このまま進む未来」</span>
              <span className="block">「動いた未来」「手放した未来」を</span>
              <span className="block">分けて見ていきましょう。</span>
            </p>
          </div>
          <div className="min-w-0 rounded-lg border border-gold/24 bg-white p-5 shadow-soft">
            <p className="section-kicker">Free Reading</p>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-ink/72">
              <span className="rounded-lg bg-[#fff8ee] px-4 py-3">登録不要で利用できます</span>
              <span className="rounded-lg bg-[#fff8ee] px-4 py-3">入力は約3分で完了します</span>
              <span className="rounded-lg bg-[#fff8ee] px-4 py-3">結果ページではニックネームのみ表示します</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:py-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <aside className="rounded-lg border border-[#e8dcc5] bg-white p-6 shadow-soft sm:p-8">
            <p className="section-kicker">Before Reading</p>
            <h2 className="ornament-title mt-3 text-2xl font-bold text-ink">無料鑑定で読み解くこと</h2>
            <div className="mt-6 grid gap-3 text-sm leading-7 text-ink/72">
              <p className="rounded-lg border border-[#e8dcc5] bg-[#fffaf0] p-4">あなたの運命分岐タイプ</p>
              <p className="rounded-lg border border-[#e8dcc5] bg-[#fffaf0] p-4">このまま進む未来・動いた未来・手放した未来</p>
              <p className="rounded-lg border border-[#e8dcc5] bg-[#fffaf0] p-4">30日以内に意識することと、避けたい行動</p>
            </div>
            <p className="mt-6 text-sm leading-7 text-ink/58">
              占いはエンタメ目的の読み物です。大切な判断は、ご自身の気持ちと現実の状況を大切にしてください。
            </p>
          </aside>

          <FortuneForm initialTheme={initialTheme} />
        </div>
      </section>
    </main>
  );
}
