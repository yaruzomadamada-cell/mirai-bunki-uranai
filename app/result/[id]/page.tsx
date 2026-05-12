import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FutureBranchCard } from "@/components/FutureBranchCard";
import { PremiumLockSection } from "@/components/PremiumLockSection";
import { RelatedMenuSection } from "@/components/RelatedMenuSection";
import { ResultHeader } from "@/components/ResultHeader";
import { ShareButton } from "@/components/ShareButton";
import { TypeCard } from "@/components/TypeCard";
import { themeLabels, typeKeywords } from "@/lib/fortune-data";
import { getFortuneResult } from "@/lib/store";

type ResultPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ResultPageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getFortuneResult(id);
  if (!result) {
    return { title: "鑑定結果が見つかりません" };
  }

  return {
    title: `${result.nickname}さんの未来分岐鑑定`,
    description: `あなたは「${result.type_name}」。このまま進む未来、動いた未来、手放した未来を読み解きます。`,
    alternates: {
      canonical: `/result/${id}`,
    },
    openGraph: {
      title: `${result.nickname}さんの未来分岐鑑定`,
      description: `私は「${result.type_name}」でした。今の選択で未来がどう変わるか占える未来分岐占い。`,
      images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    },
  };
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { id } = await params;
  const result = await getFortuneResult(id);

  if (!result) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const resultUrl = `${siteUrl}/result/${result.id}`;
  const keywords = typeKeywords[result.type_number] ?? ["未来", "選択", "分岐"];

  return (
    <main className="bg-[#fffdf8] px-4 py-8 sm:py-12">
      <article className="mx-auto max-w-4xl">
        <ResultHeader nickname={result.nickname} typeName={result.free_result.typeName} />

        <div className="mt-6 grid gap-6">
          <TypeCard
            typeName={result.free_result.typeName}
            description={result.free_result.typeDescription}
            keywords={keywords}
            themeLabel={themeLabels[result.theme]}
          />

          <section className="fortune-card reveal-card rounded-lg p-6 sm:p-8">
            <p className="section-kicker">Current Place</p>
            <h2 className="ornament-title mt-2 text-2xl font-bold text-ink">今のあなたの現在地</h2>
            <p className="mt-5 leading-8 text-ink/74">{result.free_result.currentLocation}</p>
            <div className="mt-5 rounded-lg border border-lavender/30 bg-white px-4 py-3 text-sm text-ink/62">
              テーマ：{themeLabels[result.theme]} / 状況：{result.situation}
            </div>
          </section>

          <section>
            <div className="mb-5">
              <p className="section-kicker">Three Branches</p>
              <h2 className="ornament-title mt-2 text-2xl font-bold text-ink">3つの未来分岐</h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {result.free_result.branches.map((branch, index) => (
                <FutureBranchCard key={branch.title} branch={branch} index={index} />
              ))}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <div className="fortune-card reveal-card rounded-lg p-6">
              <p className="section-kicker">30 Days</p>
              <h2 className="ornament-title mt-2 text-xl font-bold text-ink">30日以内に意識したいこと</h2>
              <p className="mt-5 leading-8 text-ink/74">{result.free_result.focus30Days}</p>
            </div>
            <div className="fortune-card reveal-card rounded-lg p-6">
              <p className="section-kicker">Care</p>
              <h2 className="ornament-title mt-2 text-xl font-bold text-ink">今避けたい選択</h2>
              <p className="mt-5 leading-8 text-ink/74">{result.free_result.avoidAction}</p>
            </div>
          </section>
        </div>

        <PremiumLockSection resultId={result.id} />

        <section className="mt-8 rounded-lg bg-white p-5 shadow-soft sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="section-kicker">Share</p>
              <h2 className="mt-2 text-xl font-bold text-ink">結果タイプをシェア</h2>
              <p className="mt-2 text-sm leading-7 text-ink/62">ニックネームや相談内容は入れず、タイプ名だけを使って共有できます。</p>
            </div>
            <ShareButton typeName={result.type_name} resultUrl={resultUrl} />
          </div>
        </section>

        <RelatedMenuSection />
      </article>
    </main>
  );
}
