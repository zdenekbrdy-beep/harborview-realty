export const PHONE_NUMBER = "(603) 555-0142";
export const PHONE_HREF = "tel:+16035550142";

export default function Nav() {
  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
      style={{ background: "rgba(15,27,38,0.9)", backdropFilter: "blur(12px)" }}
    >
      <a href="/" className="flex flex-col leading-tight group">
        <span className="text-xl font-bold tracking-tight text-ivory" style={{ fontFamily: "var(--font-display)" }}>
          Harborview
        </span>
        <span className="text-[10px] tracking-[0.2em] uppercase text-mist">
          Realty
        </span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        <a href="#how-it-works" className="text-sm text-mist hover:text-ivory transition-colors duration-200">
          How it works
        </a>
        <a href="#listings" className="text-sm text-mist hover:text-ivory transition-colors duration-200">
          Listings
        </a>
        <a href="#agents" className="text-sm text-mist hover:text-ivory transition-colors duration-200">
          Our team
        </a>
      </div>

      <a
        href={PHONE_HREF}
        className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium bg-harbor text-ivory hover:bg-harbor/90 transition-all duration-150 active:scale-[0.97]"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.89 12 19.79 19.79 0 0 1 1.78 3.41 2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.89a16 16 0 0 0 6.29 6.29l1.01-1.01a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <span className="hidden sm:inline">{PHONE_NUMBER}</span>
        <span className="sm:hidden">Call</span>
      </a>
    </nav>
  );
}
