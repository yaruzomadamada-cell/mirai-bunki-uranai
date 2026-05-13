import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PremiumLockSection } from "@/components/PremiumLockSection";
import { RelatedMenuSection } from "@/components/RelatedMenuSection";
import { ResultHeader } from "@/components/ResultHeader";
import { getFortuneResultForRequest } from "@/lib/result-lookup";
import { getStripe } from "@/lib/stripe";
import { insertPayment, markResultPaid } from "@/lib/store";

type PremiumPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ session_id?: string; error?: string }>;
};

export const metadata: Metadata = {
  title: "深掘り鑑定結果",
  description: "未来分岐占いの90日深掘り鑑定結果ページです。",
  openGraph: {
    title: "未来分岐 深掘り鑑定",
    description: "90日以内の変化、動くべき時期、避けた方がいい行動を詳しく鑑定します。",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
  },
};

async function syncSessionIfPossible(resultId: string, sessionId?: string) {
  if (!sessionId) {
    return;
  }

  const stripe = getStripe();
  if (!stripe) {
    return;
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status === "paid" && session.metadata?.fortune_result_id === resultId) {
    await markResultPaid(resultId, session.id);
    await insertPayment({
      fortune_result_id: resultId,
      stripe_session_id: session.id,
      provider: "stripe",
      provider_payment_id: session.id,
      amount: session.amount_total ?? 980,
      currency: session.currency ?? "jpy",
      status: session.payment_status,
    });
  }
}

export default async function PremiumResultPage({ params, searchParams }: PremiumPageProps) {
  const { id } = await params;
  const query = await searchParams;
  await syncSessionIfPossible(id, query.session_id);
  const result = await getFortuneResultForRequest(id);

  if (!result) {
    notFound();
  }

  const premium = result.premium_result;
  const premiumSections = [
    {
      title: "90日後の未来",
      body: premium.future90,
      caution: "最初の反応だけで良し悪しを決めないことが大切です。変化は小さく始まり、あとから意味が見えてきやすい流れです。",
      advice: "1か月ごとに、気持ち・相手や環境の反応・自分の疲れ方を短く記録してみてください。",
    },
    {
      title: "3か月以内に起きやすい変化",
      body: premium.changes3Months,
      caution: "動きが見えない時期ほど、焦って結論を出したくなります。けれど、まだ準備中の変化もあります。",
      advice: "大きな決断より先に、小さく試せる行動をひとつ選ぶと流れを見極めやすくなります。",
    },
    {
      title: "相手・環境があなたに与える影響",
      body: premium.influence,
      caution: "相手や周囲の反応を、あなた自身の価値と結びつけすぎないようにしてください。",
      advice: "相手や環境の都合と、あなたが本当に望んでいることを紙の上で分けてみると整理しやすくなります。",
    },
    {
      title: "今動いた場合の具体的な未来",
      body: premium.activeDetail,
      caution: "動くこと自体は悪くありませんが、不安を消すためだけの行動は流れを乱しやすくなります。",
      advice: "連絡、相談、準備など、目的がひとことで言える行動から始めると後悔しにくくなります。",
    },
    {
      title: "待った場合の具体的な未来",
      body: premium.waitingDetail,
      caution: "待つことと、我慢し続けることは少し違います。心がすり減る待ち方には気づいてあげてください。",
      advice: "期限を決めて待つ、待っている間に整えることを決めるなど、受け身になりすぎない形を選びましょう。",
    },
    {
      title: "手放した場合の具体的な未来",
      body: premium.releaseDetail,
      caution: "手放す選択は、すべてを終わらせる意味だけではありません。一度距離を置いて見えることもあります。",
      advice: "いま握りしめている期待と、残したい本音を分けることで、必要なものが見えやすくなります。",
    },
    {
      title: "選んではいけない行動",
      body: premium.forbiddenAction,
      caution: "怖さから急いで選ぶと、あとから自分の本音が追いつかなくなることがあります。",
      advice: "送る前、決める前、離れる前に一晩置く。たったそれだけでも選択の質は変わります。",
    },
    {
      title: "運気が動きやすい時期",
      body: premium.timing,
      caution: "時期はきっかけであって、未来を固定するものではありません。無理に合わせようとしすぎないでください。",
      advice: "動きやすい時期には、完璧な答えよりも小さな確認を重ねる意識が合っています。",
    },
    {
      title: "あなたに必要な言葉",
      body: premium.neededWords,
      caution: "誰かの期待に合わせすぎると、必要な言葉が遠く聞こえやすくなります。",
      advice: "今日の自分に一番近い言葉をひとつ選び、迷ったときの合図として持っておいてください。",
    },
    {
      title: "最終鑑定メッセージ",
      body: premium.finalMessage,
      caution: "この鑑定は、あなたの未来を決めつけるものではありません。選び直せる余白も未来の一部です。",
      advice: "今すぐすべてを決めなくても大丈夫です。いちばん呼吸がしやすい選択から、未来を整えていきましょう。",
    },
  ];

  return (
    <main className="bg-[#FFFDF8] px-4 py-8 sm:py-12">
      <article className="mx-auto max-w-4xl">
        <ResultHeader
          nickname={result.nickname}
          typeName={result.type_name}
          premium
          subtitle="90日以内の変化、動くべき時期、手放すことで整いやすいことを、無料鑑定より深く読み解きます。"
        />

        {!result.paid ? (
          <PremiumLockSection resultId={result.id} error={query.error} showStripeError={query.error === "stripe-unconfigured"} />
        ) : (
          <>
            <section className="mt-6 grid gap-4">
              {premiumSections.map((section, index) => (
                <section
                  key={section.title}
                  className="fortune-card reveal-card rounded-lg p-6 sm:p-8"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <p className="section-kicker">{String(index + 1).padStart(2, "0")}</p>
                  <h2 className="ornament-title mt-2 text-2xl font-bold text-ink">{section.title}</h2>
                  <div className="mt-5 rounded-lg border border-[#e8dcc5] bg-[#FFFDF8] p-4 sm:p-5">
                    <p className="text-xs font-bold text-premium">鑑定文</p>
                    <p className="mt-2 leading-8 text-ink/74">{section.body}</p>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-gold/22 bg-[#fff8ee] p-4">
                      <p className="text-xs font-bold text-[#8a6a1d]">注意点</p>
                      <p className="mt-2 text-sm leading-7 text-ink/70">{section.caution}</p>
                    </div>
                    <div className="rounded-lg border border-lavender/26 bg-white p-4">
                      <p className="text-xs font-bold text-lilac">行動アドバイス</p>
                      <p className="mt-2 text-sm leading-7 text-ink/70">{section.advice}</p>
                    </div>
                  </div>
                </section>
              ))}
            </section>

            <section className="mt-8 rounded-lg border border-gold/32 bg-[#FFF8EE] p-6 text-ink shadow-soft sm:p-8">
              <p className="section-kicker">Closing Message</p>
              <h2 className="serif-title mt-3 text-2xl font-bold">未来は、選び方で少しずつ形を変えていきます。</h2>
              <p className="mt-4 leading-8 text-ink/72">
                いま見えている流れは、あなたを縛るものではありません。小さな選択を重ねるたびに、未来の輪郭は静かに変わっていきます。
              </p>
            </section>
          </>
        )}

        <div className="mt-8 grid gap-3 sm:flex">
          <Link href={`/result/${result.id}`} className="rounded-lg border border-ink/12 bg-white px-5 py-3.5 text-center font-semibold text-ink">
            無料鑑定に戻る
          </Link>
          <Link href="/fortune" className="rounded-lg bg-purple px-5 py-3.5 text-center font-semibold text-white">
            別の未来を占う
          </Link>
        </div>

        <RelatedMenuSection />
      </article>
    </main>
  );
}
