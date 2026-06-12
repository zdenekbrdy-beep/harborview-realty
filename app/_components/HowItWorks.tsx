const steps = [
  {
    number: "01",
    title: "Call Sarah",
    body: "Dial our number and Sarah answers instantly. No hold music, no voicemail. She speaks naturally and listens.",
  },
  {
    number: "02",
    title: "Get qualified",
    body: "Sarah asks about your budget, preferred neighborhoods, bedrooms, and timeline to find the right match.",
  },
  {
    number: "03",
    title: "Book your showing",
    body: "She checks availability and locks in a time with one of our licensed agents. Confirmation lands in your inbox.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-parchment py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16 anim-entry">
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight text-ink"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Three minutes to your first showing.
          </h2>
          <p className="mt-4 text-mist text-lg max-w-[52ch]">
            Our AI agent handles intake so our human agents can focus on the showing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`anim-entry${i === 1 ? " anim-entry-d1" : i === 2 ? " anim-entry-d2" : ""}`}
            >
              <span
                className="text-[56px] font-bold leading-none tracking-tight text-sand/40"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.number}
              </span>
              <div className="mt-4 h-px w-12 bg-sand/40" />
              <h3
                className="mt-5 text-2xl font-bold tracking-tight text-ink"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.title}
              </h3>
              <p className="mt-3 text-mist leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
