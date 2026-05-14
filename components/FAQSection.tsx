type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  items: FAQItem[];
  title?: string;
};

export function FAQSection({ items, title = "よくある悩み" }: FAQSectionProps) {
  return (
    <section className="rounded-lg bg-white p-5 shadow-soft sm:p-8">
      <p className="section-kicker">FAQ</p>
      <h2 className="ornament-title mt-2 text-2xl font-bold text-ink">{title}</h2>
      <div className="mt-6 grid gap-3">
        {items.map((item) => (
          <div key={item.question} className="rounded-lg border border-lavender/32 bg-pearl p-4">
            <h3 className="font-bold text-ink">{item.question}</h3>
            <p className="mt-2 text-sm leading-7 text-ink/70">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
