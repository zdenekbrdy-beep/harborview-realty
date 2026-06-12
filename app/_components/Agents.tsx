import Image from "next/image";

const agents = [
  {
    name: "Margaret Holloway",
    title: "Senior Buyer's Agent",
    years: 14,
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    areas: "Portsmouth, Exeter, Hampton",
  },
  {
    name: "Daniel Reyes",
    title: "Buyer's Agent",
    years: 7,
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    areas: "Concord, Durham, Manchester",
  },
  {
    name: "Christine Nakamura",
    title: "Senior Buyer's Agent",
    years: 11,
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    areas: "Newburyport, Amesbury, Salisbury",
  },
];

export default function Agents() {
  return (
    <section id="agents" className="bg-parchment py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-14 anim-entry">
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight text-ink"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Your agent is a human. Sarah just handles intake.
          </h2>
          <p className="mt-4 text-mist text-lg max-w-[56ch]">
            Every showing is led by a licensed NH or MA buyer&apos;s agent. Sarah connects you to the right one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {agents.map((agent, i) => (
            <div
              key={agent.name}
              className={`anim-entry${i === 1 ? " anim-entry-d1" : i === 2 ? " anim-entry-d2" : ""}`}
            >
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-ink/5">
                <Image
                  src={agent.photo}
                  alt={agent.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="mt-5">
                <p
                  className="text-xl font-bold text-ink"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {agent.name}
                </p>
                <p className="text-mist text-sm mt-0.5">{agent.title} &middot; {agent.years} yrs</p>
                <p className="text-ink/60 text-sm mt-2">{agent.areas}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
