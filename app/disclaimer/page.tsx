import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "免責事項",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <main className="px-4 py-10 sm:py-14">
      <article className="mx-auto max-w-3xl rounded-lg bg-white p-6 leading-8 text-ink/76 shadow-soft sm:p-8">
        <h1 className="text-3xl font-bold text-ink">免責事項</h1>
        <p className="mt-5">未来分岐占いは、エンタメ目的の占いサービスです。</p>
        <p className="mt-4">
          鑑定結果は、人生・恋愛・仕事・金銭・健康などに関する判断を保証するものではありません。
        </p>
        <p className="mt-4">
          重要な決定を行う際は、必要に応じて専門家や信頼できる人に相談してください。
        </p>
      </article>
    </main>
  );
}
