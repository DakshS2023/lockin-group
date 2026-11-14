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

/* ---------- LockIn Packages (all include Synesthesia AV) ---------- */
export type Package = {
  id: string;
  name: string;
  duration: string;
  tagline: string;
  price: string;
  recommended?: boolean;
  highlights: string[];
  bestFor: string;
};

export const packagesIntro =
  "All packages include Synesthesia AV sound, music and effects. Choose your level of adventure.";

export const packages: Package[] = [
  {
    id: "lockin-basic",
    name: "LockIn Basic",
    duration: "45–50 minutes",
    tagline: "The essential escape-room experience.",
    price: "[PRICE]",
    highlights: [
      "Original LockIn game",
      "Dedicated game master",
      "Basic sound effects and background music",
      "Standard puzzles and props",
    ],
    bestFor: "Affordable group entertainment and first-time players.",
  },
  {
    id: "lockin-standard",
    name: "LockIn Standard",
    duration: "60 minutes",
    tagline: "A more immersive adventure.",
    price: "[PRICE]",
    recommended: true,
    highlights: [
      "Everything in Basic, plus:",
      "Standard Synesthesia AV experience",
      "Enhanced sound effects and atmospheric lighting",
      "Special effects and immersive introduction",
      "Limited personalisation",
      "Premium props and dedicated technical operator",
    ],
    bestFor: "Birthdays, family events and groups wanting a more exciting experience.",
  },
  {
    id: "lockin-premium",
    name: "LockIn Premium",
    duration: "75–80 minutes",
    tagline: "The ultimate cinematic experience.",
    price: "[PRICE]",
    highlights: [
      "Everything in Standard, plus:",
      "Synesthesia+ AV experience",
      "Advanced lighting and special effects",
      "Free live actor",
      "Extensive storyline customisation and customised puzzles",
      "Personalised messages and final reveal",
      "Special finale sequence and priority planning",
    ],
    bestFor: "Big celebrations, premium birthday parties and unforgettable corporate events.",
  },
];

/* ---------- Full perks comparison ----------
   Values per package: "✓" included, "—" not included, or a short label
   (e.g. "Enhanced" = upgraded version). Order matches `packages`. */
export type ComparisonRow = { feature: string; values: [string, string, string] };
export type ComparisonGroup = { group: string; rows: ComparisonRow[] };

export const packageComparison: ComparisonGroup[] = [
  {
    group: "Experience",
    rows: [
      { feature: "Game duration", values: ["45–50 min", "60 min", "75–80 min"] },
      { feature: "Dedicated game master", values: ["✓", "✓", "✓"] },
      { feature: "Original storyline", values: ["✓", "✓", "✓"] },
      { feature: "Interactive puzzles", values: ["✓", "✓", "✓"] },
      { feature: "Hints and assistance", values: ["✓", "✓", "✓"] },
    ],
  },
  {
    group: "Synesthesia AV",
    rows: [
      { feature: "Synesthesia AV", values: ["Basic", "Standard", "Synesthesia+"] },
      { feature: "Background music", values: ["✓", "✓", "✓"] },
      { feature: "Sound effects", values: ["Basic", "Enhanced", "Premium"] },
      { feature: "Lighting effects", values: ["—", "Good", "Advanced"] },
      { feature: "Special effects", values: ["—", "Good", "Advanced"] },
      { feature: "Immersive introduction", values: ["—", "✓", "Enhanced"] },
    ],
  },
  {
    group: "Customisation",
    rows: [
      { feature: "Customised storyline", values: ["—", "Limited", "Extensive"] },
      { feature: "Personalised messages", values: ["—", "Limited", "✓"] },
      { feature: "Customised puzzles", values: ["—", "—", "✓"] },
      { feature: "Personalised final reveal", values: ["—", "—", "✓"] },
    ],
  },
  {
    group: "Exclusive extras",
    rows: [
      { feature: "Live actor", values: ["—", "—", "✓ Free"] },
      { feature: "Additional game master", values: ["—", "—", "Upon request"] },
      { feature: "Special finale sequence", values: ["—", "—", "✓"] },
      { feature: "Premium props and equipment", values: ["—", "✓", "Enhanced"] },
      { feature: "Dedicated technical operator", values: ["—", "✓", "✓"] },
      { feature: "Priority setup planning", values: ["—", "—", "✓"] },
    ],
  },
];

export const packagesDisclaimer =
  "Package inclusions are subject to confirmation. The exact AV equipment, staffing and customisation scope will be agreed with you before booking. Advertised durations refer to gameplay.";

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
  { q: "What is the difference between LockIn and LockIn Plus?", a: "LockIn is our standard escape-room experience. LockIn Plus adds Synesthesia AV enhancements such as sound, lighting and visual effects for a more immersive experience." },
  { q: "Do you offer birthday packages?", a: "[BIRTHDAY PACKAGE DETAILS]" },
  { q: "Do you offer corporate team-building events?", a: "[CORPORATE EVENT DETAILS]" },
  { q: "Do we need to provide any equipment?", a: "[EQUIPMENT REQUIREMENTS]" },
  { q: "How do we book?", a: "Submit a consultation request through our booking page. Our team will contact you to discuss your event and confirm the details. Bookings are only confirmed once approved by the LockIn team." },
  { q: "Can we customise an experience?", a: "[CUSTOMISATION DETAILS]" },
];
