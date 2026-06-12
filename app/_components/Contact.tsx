import { PHONE_NUMBER, PHONE_HREF } from "./Nav";

export default function Contact() {
  return (
    <section id="contact" className="bg-parchment py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
          <div className="anim-entry">
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight text-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ready to start your search?
            </h2>
            <p className="mt-4 text-mist text-lg max-w-[50ch]">
              Call Sarah now and have a showing on the books before dinner.
            </p>
            <a
              href={PHONE_HREF}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-harbor px-10 py-4 text-lg font-semibold text-ivory hover:bg-harbor/90 transition-all duration-150 active:scale-[0.97]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.89 12 19.79 19.79 0 0 1 1.78 3.41 2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.89a16 16 0 0 0 6.29 6.29l1.01-1.01a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call {PHONE_NUMBER}
            </a>
          </div>

          <div className="anim-entry anim-entry-d1 text-sm text-mist space-y-1 md:text-right">
            <p className="font-semibold text-ink">Harborview Realty</p>
            <p>88 Market Street, Suite 4</p>
            <p>Portsmouth, NH 03801</p>
            <p className="mt-3">
              <a href="mailto:team@harborviewrealty.com" className="hover:text-ink transition-colors duration-200">
                team@harborviewrealty.com
              </a>
            </p>
            <p className="text-xs text-mist/60 mt-4">
              Licensed in NH and MA. Buyer representation only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
