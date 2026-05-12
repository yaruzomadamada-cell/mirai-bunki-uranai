import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description: "未来分岐占いの有料鑑定に関する特定商取引法に基づく表記です。",
  alternates: {
    canonical: "/commercial-law",
  },
  openGraph: {
    title: "特定商取引法に基づく表記｜未来分岐占い",
    description: "未来分岐占いの有料鑑定に関する販売条件、支払い方法、提供時期などを掲載しています。",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
  },
};

const rows = [
  ["販売事業者", "未来分岐占い 運営者"],
  ["運営責任者", "お問い合わせいただいた場合、遅滞なく開示します。"],
  ["所在地", "お問い合わせいただいた場合、遅滞なく開示します。"],
  ["お問い合わせ", "サイト内のお問い合わせページよりご連絡ください。"],
  ["販売価格", "未来分岐 深掘り鑑定 980円（税込）"],
  ["商品代金以外の必要料金", "インターネット接続料金、通信料金は利用者の負担となります。"],
  ["支払い方法", "Stripe Checkoutによるクレジットカード決済"],
  ["商品の提供時期", "決済完了後、対象の有料鑑定結果ページで直ちに閲覧できます。"],
  ["返品・キャンセル", "デジタルコンテンツの性質上、決済完了後の返品・キャンセルは原則としてお受けできません。"],
  ["動作環境", "スマートフォンまたはPCの最新ブラウザでの閲覧を推奨します。"],
];

export default function CommercialLawPage() {
  return (
    <main className="px-4 py-10 sm:py-14">
      <article className="mx-auto max-w-3xl rounded-lg bg-white p-6 leading-8 text-ink/76 shadow-soft sm:p-8">
        <p className="section-kicker">Commercial Law</p>
        <h1 className="ornament-title mt-2 text-3xl font-bold text-ink">特定商取引法に基づく表記</h1>
        <div className="mt-6 overflow-hidden rounded-lg border border-[#e8dcc5]">
          {rows.map(([label, value]) => (
            <div key={label} className="grid border-b border-[#e8dcc5] last:border-b-0 sm:grid-cols-[12rem_1fr]">
              <div className="bg-[#FFF8EE] px-4 py-3 font-bold text-ink">{label}</div>
              <div className="bg-white px-4 py-3 text-ink/72">{value}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm leading-7 text-ink/62">
          未来分岐占いはエンタメ目的の占いサービスです。鑑定結果は人生、恋愛、仕事、金銭、健康などに関する判断を保証するものではありません。
        </p>
      </article>
    </main>
  );
}
