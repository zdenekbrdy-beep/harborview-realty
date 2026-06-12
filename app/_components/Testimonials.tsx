const testimonials = [
  {
    quote:
      "I called at 10pm on a Sunday and had a showing booked before I put my phone down. Never expected that from a real estate office.",
    name: "Rebecca T.",
    location: "First-time buyer, Portsmouth NH",
  },
  {
    quote:
      "Sarah asked exactly the right questions. By the time I met my agent, she already knew my budget and what neighborhoods I wanted. Saved us both an hour.",
    name: "James & Priya W.",
    location: "Relocating buyers, Durham NH",
  },
  {
    quote:
      "I was skeptical about AI for something this big. But it was faster and less awkward than any intake call I've had with a human agent.",
    name: "Carlos M.",
    location: "Repeat buyer, Newburyport MA",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-navy py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-14 anim-entry">
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight text-ivory"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What buyers say.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <blockquote
              key={t.name}
              className={`flex flex-col justify-between rounded-2xl border border-ivory/10 p-8 anim-entry${i === 1 ? " anim-entry-d1" : i === 2 ? " anim-entry-d2" : ""}`}
            >
              <p className="text-ivory/80 leading-relaxed text-base">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-8">
                <cite className="not-italic">
                  <p className="font-semibold text-ivory text-sm">{t.name}</p>
                  <p className="text-mist text-xs mt-0.5">{t.location}</p>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
