import { CheckoutButton } from "./CheckoutButton";
import { premiumPreviewItems } from "@/lib/fortune-data";

type PremiumLockSectionProps = {
  resultId: string;
  showStripeError?: boolean;
};

export function PremiumLockSection({ resultId, showStripeError = false }: PremiumLockSectionProps) {
  return (
    <section className="mt-8 overflow-hidden rounded-lg border border-gold/38 bg-[#FFF8EE] shadow-soft">
      <div className="border-b border-gold/24 bg-white px-5 py-6 sm:px-8">
        <p className="inline-flex rounded-full bg-[#F5E4B8] px-3 py-1 text-xs font-bold text-premium">深掘り鑑定あり</p>
        <h2 className="serif-title mt-4 text-2xl font-bold leading-snug text-ink sm:text-3xl">
          ここから先は、90日先まで読む深掘り鑑定です
        </h2>
        <p className="mt-4 leading-8 text-ink/72">
          無料鑑定では、今のあなたに現れやすい3つの未来を読み解きました。
          深掘り鑑定では、その未来がいつ動きやすいのか、どんな行動を選ぶと後悔しにくいのかをさらに詳しく見ていきます。
        </p>
      </div>

      <div className="p-5 sm:p-8">
        {showStripeError ? (
          <div className="mb-5 rounded-lg border border-gold/36 bg-white px-4 py-3 text-sm leading-7 text-ink/72">
            Stripeキーが未設定のため、決済を開始できませんでした。.env.local にStripeのテストキーを設定するとCheckoutへ遷移できます。
          </div>
        ) : null}
        <div className="grid gap-3 sm:grid-cols-2">
          {premiumPreviewItems.map((item, index) => (
            <div key={item.title} className="relative overflow-hidden rounded-lg border border-gold/20 bg-white p-4 shadow-sm">
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#fff8ee] to-transparent" />
              <div className="flex items-start gap-3">
                <span className="serif-title grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#fff2cf] text-sm font-bold text-premium">
                  {index + 1}
                </span>
                <div className="relative">
                  <h3 className="font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink/62">{item.teaser}</p>
                </div>
              </div>
              <div className="relative mt-3 inline-flex rounded-full bg-lavender/20 px-3 py-1.5 text-xs font-bold text-lilac">
                ロック中
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <CheckoutButton resultId={resultId} />
        </div>
      </div>
    </section>
  );
}

export const PremiumLockedPreview = PremiumLockSection;
