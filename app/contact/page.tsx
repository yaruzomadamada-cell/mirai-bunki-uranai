import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "未来分岐占いへのお問い合わせについて。",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="bg-[#fbf9ff] px-4 py-10 sm:py-14">
      <article className="mx-auto max-w-3xl rounded-lg bg-white p-6 leading-8 text-ink/74 shadow-soft sm:p-8">
        <p className="section-kicker">Contact</p>
        <h1 className="ornament-title mt-2 text-3xl font-bold text-ink">お問い合わせ</h1>
        <p className="mt-5">
          未来分岐占いへのお問い合わせは、運営者が用意する連絡先からお願いいたします。現在このデモ実装では送信フォームは設置していません。
        </p>
        <p className="mt-4">
          鑑定結果はエンタメ目的の読み物です。医療、法律、投資など専門的な判断が必要な内容は、適切な専門家へご相談ください。
        </p>
      </article>
    </main>
  );
}
