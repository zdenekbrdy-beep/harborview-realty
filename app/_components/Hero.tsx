import Image from "next/image";
import { PHONE_NUMBER, PHONE_HREF } from "./Nav";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center bg-navy overflow-hidden pt-16">
      {/* Background photo overlay */}
      <Image
        src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1920&q=70"
        alt=""
        fill
        priority
        className="object-cover opacity-[0.18] mix-blend-luminosity"
        sizes="100vw"
      />

      {/* Gradient vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 70% 50%, transparent 40%, rgba(15,27,38,0.85) 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-sand mb-6">
            AI-Powered Buyer Representation
          </p>

          {/* Headline */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-ivory mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Touring homes in the Northeast,{" "}
            <span className="italic text-sand">now answered by AI.</span>
          </h1>

          {/* Subtext - max 20 words */}
          <p className="text-lg text-mist leading-relaxed mb-10 max-w-[52ch]">
            Sarah qualifies your search and books your first showing in under 3 minutes. Available 24/7, no waiting.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-harbor px-8 py-4 text-base font-semibold text-ivory hover:bg-harbor/90 transition-all duration-150 active:scale-[0.97]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.89 12 19.79 19.79 0 0 1 1.78 3.41 2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.89a16 16 0 0 0 6.29 6.29l1.01-1.01a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call {PHONE_NUMBER}
            </a>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/30 px-8 py-4 text-base font-medium text-ivory/80 hover:border-ivory/60 hover:text-ivory transition-all duration-200"
            >
              See how it works
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Trust signal */}
          <p className="mt-8 text-xs text-mist">
            Free service for buyers. Harborview is buyer-side only.
          </p>
        </div>
      </div>
    </section>
  );
}
