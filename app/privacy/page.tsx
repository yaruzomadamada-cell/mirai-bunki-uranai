import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="px-4 py-10 sm:py-14">
      <article className="mx-auto max-w-3xl rounded-lg bg-white p-6 leading-8 text-ink/76 shadow-soft sm:p-8">
        <h1 className="text-3xl font-bold text-ink">プライバシーポリシー</h1>
        <p className="mt-5">
          未来分岐占いは、無料鑑定および有料鑑定の提供に必要な範囲で、ニックネーム、生年月日、性別、占いたいテーマ、入力された相談内容、決済に関する識別情報を取得します。
        </p>
        <p className="mt-4">
          入力された内容は鑑定結果の生成、結果ページの表示、決済状況の確認、サービス改善のために利用します。結果ページではプライバシー保護のためニックネームのみを表示し、自由入力の全文を過度に表示しません。
        </p>
        <p className="mt-4">
          決済処理はStripe Checkoutを利用します。カード情報は当サイトでは保持せず、Stripeの管理する決済画面で処理されます。
        </p>
        <p className="mt-4">
          法令に基づく場合を除き、取得した情報を本人の同意なく第三者に提供しません。お問い合わせが必要な場合は、サイト管理者が用意する連絡手段からご連絡ください。
        </p>
      </article>
    </main>
  );
}
