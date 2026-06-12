import Image from "next/image";

type Listing = {
  id: string;
  address: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  imageUrl: string;
};

const listings: Listing[] = [
  {
    id: "l1",
    address: "14 Birchwood Drive",
    city: "Portsmouth, NH",
    price: 649000,
    beds: 4,
    baths: 2.5,
    sqft: 2340,
    imageUrl: "https://picsum.photos/seed/colonial-nh-1/800/450",
  },
  {
    id: "l2",
    address: "7 Maple Ridge Road",
    city: "Concord, NH",
    price: 489000,
    beds: 3,
    baths: 2,
    sqft: 1820,
    imageUrl: "https://picsum.photos/seed/ranch-house-2/800/450",
  },
  {
    id: "l3",
    address: "220 Harbor Crest Lane",
    city: "Newburyport, MA",
    price: 895000,
    beds: 5,
    baths: 3,
    sqft: 3100,
    imageUrl: "https://picsum.photos/seed/colonial-new-england-3/800/450",
  },
  {
    id: "l4",
    address: "38 Elms Court",
    city: "Exeter, NH",
    price: 524000,
    beds: 3,
    baths: 2,
    sqft: 1960,
    imageUrl: "https://picsum.photos/seed/craftsman-house-4/800/450",
  },
  {
    id: "l5",
    address: "91 Old Stone Farm Rd",
    city: "Durham, NH",
    price: 1185000,
    beds: 6,
    baths: 4,
    sqft: 4200,
    imageUrl: "https://picsum.photos/seed/farmhouse-estate-5/800/450",
  },
  {
    id: "l6",
    address: "5 Tidewater Circle",
    city: "Hampton, NH",
    price: 728000,
    beds: 4,
    baths: 3,
    sqft: 2650,
    imageUrl: "https://picsum.photos/seed/coastal-cape-6/800/450",
  },
];

function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    return `$${(price / 1_000_000).toFixed(2)}M`;
  }
  return `$${Math.round(price / 1000)}k`;
}

export default function FeaturedListings() {
  return (
    <section id="listings" className="bg-card py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-14 anim-entry">
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight text-ink"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Featured listings.
          </h2>
          <p className="mt-4 text-mist text-lg">
            Ask Sarah about any of these on your next call.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <article
              key={listing.id}
              className="group rounded-2xl bg-card overflow-hidden border border-ink/8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              {/* Photo */}
              <div className="relative aspect-[16/9] overflow-hidden bg-ink/5">
                <Image
                  src={listing.imageUrl}
                  alt={`${listing.address}, ${listing.city}`}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Price badge */}
                <div className="absolute top-3 left-3 rounded-full px-3 py-1 text-sm font-bold bg-navy/90 text-ivory">
                  {formatPrice(listing.price)}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-ink text-base leading-snug">
                  {listing.address}
                </h3>
                <p className="text-mist text-sm mt-0.5">{listing.city}</p>

                {/* Stats */}
                <div className="mt-4 flex items-center gap-4 text-sm text-ink/70">
                  <span className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    {listing.beds} bed
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M2 12h20M2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6M2 12V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" />
                    </svg>
                    {listing.baths} bath
                  </span>
                  <span className="text-mist">{listing.sqft.toLocaleString()} sqft</span>
                </div>

                <a
                  href="#contact"
                  className="mt-5 flex w-full items-center justify-center rounded-full py-2.5 text-sm font-semibold bg-harbor text-ivory hover:bg-harbor/90 transition-all duration-150 active:scale-[0.97]"
                >
                  Schedule a Showing
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
