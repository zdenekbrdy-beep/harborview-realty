import { PHONE_NUMBER, PHONE_HREF } from "./Nav";

export default function Footer() {
  return (
    <footer className="bg-navy py-12 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <span
            className="text-xl font-bold tracking-tight text-ivory"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Harborview Realty
          </span>
          <p className="text-mist text-sm mt-1">AI-powered buyer representation.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-sm text-mist">
          <a href="#how-it-works" className="hover:text-ivory transition-colors duration-200">How it works</a>
          <a href="#listings" className="hover:text-ivory transition-colors duration-200">Listings</a>
          <a href="#agents" className="hover:text-ivory transition-colors duration-200">Our team</a>
          <a href={PHONE_HREF} className="text-ivory font-medium hover:text-sand transition-colors duration-200">{PHONE_NUMBER}</a>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-8 border-t border-ivory/10 pt-8 text-xs text-mist/50">
        <p>
          &copy; {new Date().getFullYear()} Harborview Realty LLC. Licensed in NH and MA. This is a portfolio demo built with Next.js and Vapi.ai.
        </p>
      </div>
    </footer>
  );
}
