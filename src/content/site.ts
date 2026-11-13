/**
 * EDIT ME — all business content for the LockIn Group website lives here.
 * Replace every [PLACEHOLDER] with real, approved information.
 */
import heroImg from "@/assets/hero.jpg";
import searchImg from "@/assets/room-search-rescue.jpg";
import alphaImg from "@/assets/room-alpha-team.jpg";

export const site = {
  name: "LockIn Group",
  tagline: "LockIn creates the adventure. Synesthesia brings it to life.",
  email: "[CONTACT EMAIL]",
  location: "Singapore",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "Facebook", href: "#" },
  ],
  heroImage: heroImg,
};

export type RoomTheme = "horror" | "classified" | "genie";

export type Room = {
  slug: "search-and-rescue" | "alpha-team-classified" | "the-genies-secret";
  name: string;
  theme: RoomTheme;
  genre: string;
  description: string;
  storyline: string;
  features: string[];
  difficulty: string;
  groupSize: string;
  duration: string;
  age: string;
  image: string;
};

export const rooms: Room[] = [
  {
    slug: "search-and-rescue",
    name: "Search & Rescue: The Lost Signal",
    theme: "horror",
    genre: "Horror, mystery and suspense",
    description:
      "Investigate a disappearance and uncover the truth behind a mysterious signal.",
    storyline:
      "A rescue team went silent after following a strange transmission. Their last signal still repeats. Your team has been sent in to find out what happened — before the signal finds you.",
    features: ["Live actor", "Atmospheric effects", "Challenging puzzles"],
    difficulty: "[DIFFICULTY]",
    groupSize: "[GROUP SIZE]",
    duration: "[DURATION]",
    age: "[AGE RECOMMENDATION]",
    image: searchImg,
  },
  {
    slug: "alpha-team-classified",
    name: "Alpha Team: Classified",
    theme: "classified",
    genre: "Police investigation and detective mystery",
    description:
      "Become part of an elite investigation team and solve a classified case.",
    storyline:
      "A case file has landed on your desk, stamped CLASSIFIED. Analyse the evidence, connect the clues on the investigation board and close the case before time runs out.",
    features: ["Evidence analysis", "Investigation boards", "Logical puzzles"],
    difficulty: "[DIFFICULTY]",
    groupSize: "[GROUP SIZE]",
    duration: "[DURATION]",
    age: "[AGE RECOMMENDATION]",
    image: alphaImg,
  },
  {
    slug: "the-genies-secret",
    name: "The Genie’s Secret",
    theme: "genie",
    genre: "Fantasy, adventure and mystery",
    description:
      "Enter a mysterious world and uncover the secret of a legendary magical lamp.",
    storyline:
      "Legends speak of a lamp that grants more than wishes. Step into a world of magical objects and hidden clues, and unlock the secret the genie has guarded for centuries.",
    features: ["Magical objects", "Hidden clues", "Imaginative puzzles"],
    difficulty: "[DIFFICULTY]",
    groupSize: "[GROUP SIZE]",
    duration: "[DURATION]",
    age: "[AGE RECOMMENDATION]",
    image: heroImg,
  },
];

export const getRoom = (slug: string) => rooms.find((r) => r.slug === slug);

/* ---------- Proposed LockIn Plus packages — confirm scope before publishing ---------- */
export type Package = {
  id: string;
  name: string;
  duration: string;
  price: string;
  blurb: string;
  bestFor: string;
  recommended?: boolean;
  features: string[];
};
export const packageNotice = "Proposed packages — subject to confirmation. Exact AV equipment, staffing and customisation scope must be agreed before booking.";
export const packages: Package[] = [
  {
    id: "lockin-basic", name: "LockIn Basic", duration: "45–50", price: "[PRICE]",
    blurb: "The essential escape-room experience.",
    bestFor: "Affordable group entertainment and first-time players.",
    features: ["Original LockIn game", "Dedicated game master", "Basic sound effects and background music", "Standard puzzles and props", "No lighting or special effects", "No customisation"],
  },
  {
    id: "lockin-standard", name: "LockIn Standard", duration: "60", price: "[PRICE]", recommended: true,
    blurb: "A more immersive adventure.",
    bestFor: "Birthdays, family events and groups wanting a more exciting experience.",
    features: ["Everything in Basic, plus", "Standard Synesthesia AV", "Enhanced sound effects", "Good atmospheric lighting and special effects", "Immersive introduction", "Limited personalisation", "Premium props and equipment", "Dedicated technical operator"],
  },
  {
    id: "lockin-premium", name: "LockIn Premium", duration: "75–80", price: "[PRICE]",
    blurb: "The ultimate cinematic experience.",
    bestFor: "Big celebrations, premium birthday parties and unforgettable corporate events.",
    features: ["Everything in Standard, plus", "Synesthesia+ AV", "Advanced lighting and special effects", "One free live actor, for compatible rooms", "Extensive storyline customisation", "Customised puzzles", "Personalised messages and final reveal", "Special finale sequence", "Enhanced props and equipment", "Dedicated technical operator and priority planning"],
  },
];
export type ComparisonRow = { feature: string; values: [string, string, string] };
export const comparisonGroups: { name: string; rows: ComparisonRow[] }[] = [
  { name: "Experience", rows: [
    { feature: "Game duration", values: ["45–50 min", "60 min", "75–80 min"] },
    ...["Dedicated game master", "Original storyline", "Interactive puzzles", "Hints and assistance"].map(feature => ({ feature, values: ["✓", "✓", "✓"] as [string, string, string] })),
  ] },
  { name: "Synesthesia AV", rows: [
    { feature: "Synesthesia AV", values: ["Basic", "Standard", "Synesthesia+"] },
    { feature: "Background music", values: ["✓", "✓", "✓"] },
    { feature: "Sound effects", values: ["Basic", "Enhanced", "Premium"] },
    { feature: "Lighting effects", values: ["—", "Good", "Advanced"] },
    { feature: "Special effects", values: ["—", "Good", "Advanced"] },
    { feature: "Immersive introduction", values: ["—", "✓", "Enhanced"] },
  ] },
  { name: "Customisation", rows: [
    { feature: "Customised storyline", values: ["—", "Limited", "Extensive"] },
    { feature: "Personalised messages", values: ["—", "Limited", "✓"] },
    { feature: "Customised puzzles", values: ["—", "—", "✓"] },
    { feature: "Personalised final reveal", values: ["—", "—", "✓"] },
  ] },
  { name: "Exclusive extras", rows: [
    { feature: "Live actor", values: ["—", "—", "✓ Free"] },
    { feature: "Additional game master", values: ["—", "—", "Upon request"] },
    { feature: "Special finale sequence", values: ["—", "—", "✓"] },
    { feature: "Premium props and equipment", values: ["—", "✓", "Enhanced"] },
    { feature: "Dedicated technical operator", values: ["—", "✓", "✓"] },
    { feature: "Priority setup planning", values: ["—", "—", "✓"] },
  ] },
];
export const packageNotes = [
  "Premium includes one live actor at no additional charge, subject to the selected room supporting an actor.",
  "Standard personalisation is limited to a name or short message. Premium can include personalised clues, story details and a customised ending; the exact scope is agreed during consultation.",
  "Synesthesia+ reserves advanced lighting, more complex effects and a dedicated technical setup for Premium.",
  "Standard and Premium include a technical operator. Basic uses a simpler setup operated by the game master.",
  "Advertised duration is gameplay only. Setup, briefing and debriefing time will be specified separately during consultation.",
];

/* ---------- Testimonials (placeholders only — replace with approved reviews) ---------- */
export const testimonials = [
  { quote: "[APPROVED CUSTOMER TESTIMONIAL]", name: "[CUSTOMER NAME]", event: "[EVENT TYPE]", rating: null as number | null },
  { quote: "[APPROVED CUSTOMER TESTIMONIAL]", name: "[CUSTOMER NAME]", event: "[EVENT TYPE]", rating: null as number | null },
  { quote: "[APPROVED CUSTOMER TESTIMONIAL]", name: "[CUSTOMER NAME]", event: "[EVENT TYPE]", rating: null as number | null },
];

/* ---------- Videos: add an approved `src` (mp4 URL) to each when ready ---------- */
export const videos = [
  { title: "Gameplay highlight", kind: "Gameplay", src: "" },
  { title: "Behind the scenes: setting the stage", kind: "Behind the scenes", src: "" },
  { title: "Event highlight", kind: "Event", src: "" },
  { title: "Synesthesia AV in action", kind: "Behind the scenes", src: "" },
];

/* ---------- FAQ (edit answers freely) ---------- */
export const faqs = [
  { q: "What is a mobile escape room?", a: "Instead of visiting a fixed venue, we bring the escape-room experience to you. We set up the puzzles, story and props at your chosen location." },
  { q: "Do you come to our home or venue?", a: "Yes. LockIn experiences are delivered directly to your home or event venue. [ADD SERVICE AREA DETAILS]" },
  { q: "How many people can participate?", a: "[GROUP SIZE DETAILS]" },
  { q: "How long does an experience last?", a: "[DURATION DETAILS]" },
  { q: "What is the difference between Basic, Standard and Premium?", a: "Our proposed LockIn Plus packages all include Synesthesia AV. Basic, Standard and Premium offer different gameplay durations and levels of sound, lighting, effects and personalisation. Final inclusions are confirmed during consultation." },
  { q: "Do you offer birthday packages?", a: "[BIRTHDAY PACKAGE DETAILS]" },
  { q: "Do you offer corporate team-building events?", a: "[CORPORATE EVENT DETAILS]" },
  { q: "Do we need to provide any equipment?", a: "[EQUIPMENT REQUIREMENTS]" },
  { q: "How do we book?", a: "Submit a consultation request through our contact page. Our team will contact you to discuss your event and confirm the details. Bookings are only confirmed once approved by the LockIn team." },
  { q: "Can we customise an experience?", a: "[CUSTOMISATION DETAILS]" },
];
