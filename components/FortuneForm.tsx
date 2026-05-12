"use client";

import { useMemo, useState } from "react";
import { situationOptions, themeOptions } from "@/lib/fortune-data";
import type { ThemeId } from "@/lib/types";

const steps = [
  "占いたいテーマを選ぶ",
  "あなたの情報を入力",
  "今の状況を選ぶ",
  "迷っていることを入力",
  "無料鑑定を見る",
];

type FortuneFormProps = {
  initialTheme?: ThemeId;
};

const inputClass =
  "w-full rounded-lg border border-[#e8dcc5] bg-white px-4 py-3.5 text-base text-ink shadow-sm outline-none transition placeholder:text-ink/36 focus:border-lilac focus:ring-4 focus:ring-lilac/14";

export function FortuneForm({ initialTheme = "contact" }: FortuneFormProps) {
  const [theme, setTheme] = useState<ThemeId>(initialTheme);
  const situations = useMemo(() => situationOptions[theme], [theme]);

  return (
    <div className="paper-panel rounded-lg p-5 sm:p-8">
      <div className="grid gap-2 sm:grid-cols-5">
        {steps.map((step, index) => (
          <div key={step} className="rounded-lg border border-[#e8dcc5] bg-white px-3 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold">Step {index + 1}</p>
            <p className="mt-1 text-xs font-semibold text-ink/72">{step}</p>
          </div>
        ))}
      </div>

      <form action="/api/fortune" method="post" className="mt-7 grid gap-7">
        <section>
          <h2 className="text-lg font-bold text-ink">Step 1：占いたいテーマを選ぶ</h2>
          <input type="hidden" name="theme" value={theme} />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {themeOptions.map((menu) => {
              const selected = menu.id === theme;
              return (
                <button
                  key={menu.id}
                  type="button"
                  onClick={() => setTheme(menu.id)}
                  className={`rounded-lg border p-4 text-left transition ${
                    selected
                      ? "border-purple bg-[#fff8ee] text-ink shadow-soft ring-2 ring-purple/10"
                      : "border-[#e8dcc5] bg-white text-ink hover:border-lilac hover:shadow-soft"
                  }`}
                >
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${selected ? "text-white" : "bg-[#fff2cf] text-[#8a6a1d]"}`}
                    style={selected ? { backgroundColor: menu.categoryColor } : undefined}
                  >
                    {menu.category}
                  </span>
                  <span className="mt-3 block font-bold">{menu.label}</span>
                  <span className="mt-2 block text-sm leading-6 text-ink/62">
                    {menu.emotionalCopy}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="nickname" className="text-sm font-bold text-ink">
              Step 2：ニックネーム
            </label>
            <input id="nickname" name="nickname" required maxLength={24} placeholder="例：みらい" className={inputClass} />
          </div>

          <div className="grid gap-2">
            <label htmlFor="birthdate" className="text-sm font-bold text-ink">
              生年月日
            </label>
            <input id="birthdate" name="birthdate" type="date" required className={inputClass} />
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="gender" className="text-sm font-bold text-ink">
              性別
            </label>
            <select id="gender" name="gender" defaultValue="回答しない" className={inputClass}>
              <option>女性</option>
              <option>男性</option>
              <option>その他</option>
              <option>回答しない</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label htmlFor="situation" className="text-sm font-bold text-ink">
              Step 3：今の状況
            </label>
            <select id="situation" name="situation" key={theme} className={inputClass}>
              {situations.map((situation) => (
                <option key={situation} value={situation}>
                  {situation}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="grid gap-2">
          <label htmlFor="concern" className="text-sm font-bold text-ink">
            Step 4：迷っていること
          </label>
          <textarea
            id="concern"
            name="concern"
            maxLength={200}
            rows={5}
            placeholder="例：連絡したいけれど、相手の負担にならないか不安です。"
            className={`${inputClass} resize-none leading-7`}
          />
          <p className="text-xs leading-6 text-ink/55">最大200文字。結果ページでは内容を短く要約して反映します。</p>
        </section>

        <button
          type="submit"
          className="button-shine min-h-14 rounded-lg bg-purple px-5 py-4 text-base font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
        >
          無料で未来分岐を占う
        </button>
      </form>

      <div className="mt-5 rounded-lg border border-gold/22 bg-[#fffaf0] px-4 py-3 text-xs leading-6 text-ink/68">
        登録不要。入力内容は鑑定結果の作成にのみ使用されます。結果ページではニックネーム以外の個人情報を目立つ形で表示しません。
      </div>
    </div>
  );
}

export const FortuneFormSteps = FortuneForm;
