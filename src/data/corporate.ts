import type { Photo } from "@/types";
import type { CorporateFormat, PeopleSkill } from "@/types";

/**
 * Copy and data for the /corporate page.
 * Hard facts: max 25 players per game; two games run concurrently → up to 50
 * total. Use a 12–50 range everywhere. Never show prices.
 */

export const peopleSkills: PeopleSkill[] = [
  {
    number: "01",
    title: "Reading people",
    description:
      "Players live or die by spotting tells, hesitation and inconsistency — the same instinct that closes deals and defuses conflicts.",
  },
  {
    number: "02",
    title: "Persuasion under pressure",
    description:
      "You have one minute to convince the room you're innocent. Quiet colleagues find their voice; loud ones learn to land it.",
  },
  {
    number: "03",
    title: "Trust, fast",
    description:
      "Strangers and silo'd departments have to decide who to back with almost no information — and remember who came through.",
  },
  {
    number: "04",
    title: "Reading the room together",
    description:
      "No screens, no hiding. People who never talk in meetings end up running the table — and the team sees a different side of them.",
  },
];

export const formats: CorporateFormat[] = [
  {
    tag: "Lunch & after-work",
    title: "The Social",
    description:
      "A relaxed 60–90 min session to round off a workday or replace the same old team drinks. Drinks-optional.",
    spec: "12–25 players · 60–90 min",
  },
  {
    tag: "Off-site module",
    title: "The Away-Day Slot",
    description:
      "A high-energy block inside your off-site agenda — the bit people actually remember. Slots between sessions or closes the day.",
    spec: "20–50 players · 90–120 min",
  },
  {
    tag: "Larger group",
    title: "Two Tables, One Room",
    description:
      "Two parallel games of up to 25 run side by side with live hosts — a big-room energiser or all-hands finale, without losing the intimacy.",
    spec: "26–50 players · 90 min",
  },
  {
    tag: "Seasonal",
    title: "The Christmas / Summer Do",
    description:
      "Your annual social, minus the awkward standing-around. A built-in reason to talk, laugh and mingle across teams.",
    spec: "16–50 players · 90 min",
  },
  {
    tag: "Onboarding",
    title: "The Ice-Breaker",
    description:
      "New cohort or merged teams? Nothing accelerates 'knowing each other' like having to figure out who's bluffing.",
    spec: "12–30 players · 60 min",
  },
  {
    tag: "Bespoke",
    title: "Build Your Own",
    description:
      "Custom roles themed to your company, branded reveals, or a tie-in to your values. Tell us the brief.",
    spec: "Up to 50 players · Tailored",
  },
];

/**
 * Configurator occasions. Each maps to a recommended format + duration that
 * feeds the recommendation card and pre-fills the enquiry form. No prices.
 */
export interface Occasion {
  value: string;
  label: string;
  /** Must match a format title in `formats` so the form select aligns. */
  format: string;
  duration: string;
}

export const occasions: Occasion[] = [
  { value: "social", label: "Team social / after-work", format: "The Social", duration: "~75 min" },
  { value: "awayday", label: "Away-day / off-site", format: "The Away-Day Slot", duration: "~90 min" },
  { value: "onboarding", label: "Onboarding / new team", format: "The Ice-Breaker", duration: "~60 min" },
  { value: "seasonal", label: "Christmas / summer party", format: "The Christmas / Summer Do", duration: "~90 min" },
  { value: "conference", label: "Conference / all-hands", format: "Two Tables, One Room", duration: "~90 min" },
];

export const locations: string[] = ["Edinburgh", "Glasgow", "Elsewhere in the UK"];

export const dateWindows: string[] = [
  "Within the next month",
  "In 1–3 months",
  "In 3+ months",
  "Flexible / not sure yet",
];

export const included: string[] = [
  "A professional host to run the whole session start to finish",
  "All game materials — role cards, props, scripts, the lot",
  "Setup and pack-down — you do nothing on the day",
  "Scaled rules so 12 or 50 people stay fully involved",
  "A pre-event call to tailor tone, timing and team quirks",
  "Optional branded roles and a custom company twist",
];

export interface Stat {
  value: string;
  label: string;
}

/**
 * Stats block. These are SAFE, always-true facts — never invented figures.
 *
 * TODO (user to supply real numbers): once you have verified figures, add
 * count-based stats here, e.g.
 *   { value: "200+", label: "Players hosted" },
 *   { value: "15+",  label: "Live nights run" },
 *   { value: "4.8★", label: "Average player rating" },
 * Do NOT ship invented numbers — only add these once confirmed.
 */
export const stats: Stat[] = [
  { value: "2", label: "Cities — Edinburgh & Glasgow" },
  { value: "Up to 50", label: "Players in a single session" },
  { value: "Zero", label: "Prep needed from you on the day" },
  { value: "No", label: "Screens, apps or laptops involved" },
];

export const corporateFaq = [
  {
    question: "Do you travel outside Scotland?",
    answer:
      "Yes. We're based in Edinburgh and Glasgow and run sessions there as standard, but we travel across the UK for off-sites, conferences and away-days. Tell us where you are and we'll sort the logistics.",
  },
  {
    question: "How much space and kit do we need?",
    answer:
      "Just a room where everyone can sit or stand in a rough circle and hear each other — a meeting room, a private function space, or a corner of your office all work. We bring everything else. For two parallel tables we'll need enough room for two groups.",
  },
  {
    question: "Is it inclusive — does everyone have to perform?",
    answer:
      "No one is ever put on the spot. The game naturally includes quieter people without forcing anyone to 'perform'. You can be fully involved by listening, voting and reading the room. Our hosts keep the tone warm and welcoming throughout.",
  },
  {
    question: "Can it be alcohol-free or run during the day?",
    answer:
      "Absolutely. The game works just as well as a daytime team session as it does an evening social — no alcohol required. We regularly run lunch-and-learn slots, away-day blocks and onboarding sessions in working hours.",
  },
  {
    question: "What lead time do you need?",
    answer:
      "The sooner the better for locking in a date, especially around Christmas and summer. As a rule of thumb, give us a couple of weeks where you can — but get in touch even at short notice and we'll do our best to make it work.",
  },
  {
    question: "Can you handle accessibility and dietary needs?",
    answer:
      "Yes. The game is low-mobility and easy to adapt. Tell us about any accessibility requirements on our pre-event call and we'll make sure everyone can take part comfortably. If catering is involved, we'll factor dietary needs in.",
  },
];

/**
 * Corporate gallery photos. Uses existing web-ready event shots from /photos.
 * Swap in dedicated corporate photos (once converted from HEIC) when ready.
 */
export const corporatePhotos: Photo[] = [
  {
    src: "/photos/DS706448.jpg",
    alt: "A team mid-game at a Mafia Kilty social deduction session",
    width: 5272,
    height: 3810,
  },
  {
    src: "/photos/DS706527.jpg",
    alt: "Group of colleagues after a Mafia Kilty game",
    width: 1200,
    height: 800,
  },
  {
    src: "/photos/DS706424.jpg",
    alt: "Host wearing a dramatic mask running a Mafia Kilty session",
    width: 1200,
    height: 800,
  },
  {
    src: "/photos/IMG_1041.jpg",
    alt: "Players deep in discussion during a round of social deduction",
    width: 1200,
    height: 900,
  },
  {
    src: "/photos/DS706497.jpg",
    alt: "Close-up of ornate masks used during the game",
    width: 1200,
    height: 800,
  },
  {
    src: "/photos/IMG_1126.jpg",
    alt: "Atmosphere shot from a Mafia Kilty evening",
    width: 1200,
    height: 900,
  },
];
