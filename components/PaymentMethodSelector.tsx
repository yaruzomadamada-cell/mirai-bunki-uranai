import { isKomojuEnabled } from "@/lib/komoju";

type PaymentMethodSelectorProps = {
  resultId: string;
  error?: string;
  showStripeError?: boolean;
};

const premiumItems = [
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

function ErrorNotice({ error, showStripeError }: { error?: string; showStripeError?: boolean }) {
  if (!error && !showStripeError) {
    return null;
  }

  const message =
    error === "komoju-disabled"
      ? "現在、キャリア決済・コンビニ決済などは準備中です。クレジットカード決済をご利用ください。"
      : error === "komoju-unconfigured"
        ? "KOMOJU決済の設定が未完了です。無料鑑定とクレジットカード決済は引き続きご利用いただけます。"
        : error === "komoju-session"
          ? "KOMOJUの決済ページを作成できませんでした。時間をおいて再度お試しください。"
          : error === "stripe-unconfigured" || showStripeError
            ? "Stripe決済の設定が未完了です。無料鑑定は引き続きご利用いただけます。"
            : "決済ページを開けませんでした。時間をおいて再度お試しください。";

  return (
    <div className="rounded-lg border border-gold/36 bg-white px-4 py-3 text-sm leading-7 text-ink/72">
      {message}
    </div>
  );
}

export function PaymentMethodSelector({ resultId, error, showStripeError = false }: PaymentMethodSelectorProps) {
  const komojuEnabled = isKomojuEnabled();

  return (
    <section className="rounded-lg border border-gold/30 bg-white p-5 shadow-soft sm:p-6">
      <div className="flex flex-col gap-3 border-b border-[#eadfca] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">Premium Reading</p>
          <h3 className="serif-title mt-2 text-2xl font-bold text-ink">深掘り鑑定へ進む</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/68">
            無料鑑定では、今のあなたに現れやすい3つの未来を読み解きました。深掘り鑑定では、90日以内の変化、動くべき時期、避けた方がいい行動をさらに詳しく鑑定します。
          </p>
        </div>
        <div className="rounded-lg bg-[#F5E4B8] px-4 py-3 text-center text-premium">
          <p className="text-xs font-bold">未来分岐 深掘り鑑定</p>
          <p className="serif-title text-2xl font-bold">980円</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <ErrorNotice error={error} showStripeError={showStripeError} />

        <div>
          <p className="text-sm font-bold text-ink">有料で見られること</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {premiumItems.map((item, index) => (
              <div key={item} className="rounded-lg border border-gold/20 bg-[#FFFDF8] p-3">
                <p className="text-xs font-bold text-premium">Lock {String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-sm leading-6 text-ink/70">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-[#FFF8EE] p-4">
          <p className="text-sm font-bold text-ink">お支払い方法を選択してください</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <form action="/api/checkout" method="post">
              <input type="hidden" name="resultId" value={resultId} />
              <button
                type="submit"
                className="button-shine min-h-14 w-full rounded-lg bg-purple px-5 py-4 text-base font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
              >
                クレジットカードで支払う
              </button>
              <p className="mt-2 text-xs leading-5 text-ink/55">Stripe Checkoutで安全に手続きします。</p>
            </form>

            {komojuEnabled ? (
              <form action="/api/komoju/checkout" method="post">
                <input type="hidden" name="resultId" value={resultId} />
                <button
                  type="submit"
                  className="min-h-14 w-full rounded-lg border border-premium/30 bg-[#F5E4B8] px-5 py-4 text-base font-bold text-premium shadow-soft transition hover:-translate-y-0.5"
                >
                  キャリア決済・コンビニ決済などで支払う
                </button>
                <p className="mt-2 text-xs leading-5 text-ink/55">
                  KOMOJUの決済ページで手続きします。利用できる決済方法はKOMOJU側の設定により変わります。
                </p>
              </form>
            ) : null}
          </div>

          <p className="mt-4 text-xs leading-6 text-ink/58">
            クレジットカード決済はStripe、キャリア決済・コンビニ決済などはKOMOJUの決済ページで手続きします。購入は希望する方のみです。
          </p>
        </div>
      </div>
    </section>
  );
}
