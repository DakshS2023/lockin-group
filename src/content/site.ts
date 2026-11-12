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

/* ---------- Packages ---------- */
export type Tier = "lockin" | "plus";
export type Package = {
  id: string;
  name: string;
  price: string;
  blurb: string;
  recommended?: boolean;
  features: string[]; // must match keys in comparison list
};

export const packageTiers: Record<
  Tier,
  { label: string; intro: string; comparison: string[]; packages: Package[] }
> = {
  lockin: {
    label: "LockIn",
    intro:
      "The standard escape-room experience, operated by LockIn Escape Room without Synesthesia AV enhancements.",
    comparison: ["Original escape-room experience", "Delivered to your venue", "Game master"],
    packages: [
      { id: "lockin-basic", name: "LockIn Basic", price: "[PRICE]", blurb: "[SHORT DESCRIPTION]", features: ["Original escape-room experience", "Delivered to your venue"] },
      { id: "lockin-standard", name: "LockIn Standard", price: "[PRICE]", blurb: "[SHORT DESCRIPTION]", recommended: true, features: ["Original escape-room experience", "Delivered to your venue", "Game master"] },
      { id: "lockin-premium", name: "LockIn Premium", price: "[PRICE]", blurb: "[SHORT DESCRIPTION]", features: ["Original escape-room experience", "Delivered to your venue", "Game master"] },
    ],
  },
  plus: {
    label: "LockIn Plus",
    intro:
      "The full LockIn escape-room experience, enhanced with sound, lighting and visual effects by Synesthesia AV.",
    comparison: [
      "Sound effects",
      "Background music",
      "Lighting effects",
      "Visual effects",
      "Immersive introductions",
      "Special effects",
      "Technical operator",
    ],
    packages: [
      { id: "immersia-starter", name: "Immersia Starter", price: "[PRICE]", blurb: "[SHORT DESCRIPTION]", features: ["Sound effects", "Background music"] },
      { id: "immersia-plus", name: "Immersia Plus", price: "[PRICE]", blurb: "[SHORT DESCRIPTION]", recommended: true, features: ["Sound effects", "Background music", "Lighting effects", "Immersive introductions"] },
      { id: "immersia-ultimatum", name: "Immersia Ultimatum", price: "[PRICE]", blurb: "[SHORT DESCRIPTION]", features: ["Sound effects", "Background music", "Lighting effects", "Visual effects", "Immersive introductions", "Special effects", "Technical operator"] },
    ],
  },
};

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
