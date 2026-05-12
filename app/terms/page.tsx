import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="px-4 py-10 sm:py-14">
      <article className="mx-auto max-w-3xl rounded-lg bg-white p-6 leading-8 text-ink/76 shadow-soft sm:p-8">
        <h1 className="text-3xl font-bold text-ink">利用規約</h1>
        <p className="mt-5">
          未来分岐占いは、エンタメ目的の占いサービスです。利用者は、鑑定結果が人生、恋愛、仕事、金銭、健康などに関する結果や判断を保証するものではないことを理解したうえで利用するものとします。
        </p>
        <p className="mt-4">
          有料鑑定は、Stripe Checkoutによる決済完了後、該当する鑑定結果ページに表示されます。通信環境、決済事業者の状況、設定不備などにより表示に時間がかかる場合があります。
        </p>
        <p className="mt-4">
          利用者は、虚偽の情報入力、不正アクセス、サービス運営を妨げる行為、第三者の権利を侵害する行為を行ってはなりません。
        </p>
        <p className="mt-4">
          当サイトは、必要に応じてサービス内容や規約を変更することがあります。変更後にサービスを利用した場合、変更内容に同意したものとみなします。
        </p>
      </article>
    </main>
  );
}
