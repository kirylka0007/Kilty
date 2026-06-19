import type { Photo } from "@/types";
import type { CorporateFormat } from "@/types";

/**
 * Copy and data for the /corporate page.
 * Hard facts: max 25 players per game; two games run concurrently → up to 50
 * total. Use a 12–50 range everywhere. Never show prices.
 */

/** Short credibility line under the hero. Real numbers only. */
export const trustPoints: string[] = [
  "10+ games run",
  "200+ people played",
  "Edinburgh, Glasgow & across the UK",
];

export interface ScienceFact {
  value: string;
  claim: string;
  tieIn: string;
  source: string;
  sourceUrl: string;
}

/**
 * "Why it works" — credible, verified research. Each fact ties back to the
 * game. Sources checked June 2026.
 */
export const scienceFacts: ScienceFact[] = [
  {
    value: "#1",
    claim: "predictor of team performance, ahead of talent or seniority",
    tieIn:
      "It comes down to whether people feel safe to speak up, which is exactly what the game runs on: reading the room, finding your voice and being wrong out loud without anyone minding",
    source: "Google · Project Aristotle (180+ teams)",
    sourceUrl:
      "https://rework.withgoogle.com/intl/en/guides/understanding-team-effectiveness",
  },
  {
    value: "25% vs 16%",
    claim: "of remote workers feel lonely daily, versus people in the same room",
    tieIn:
      "No screens and no call grid, just your team in one room and properly switched on",
    source: "Gallup · State of the Global Workplace, 2024",
    sourceUrl:
      "https://www.gallup.com/workplace/645566/employees-worldwide-feel-lonely.aspx",
  },
  {
    value: "1 in 5",
    claim: "employees worldwide feel lonely at work",
    tieIn:
      "Ninety minutes that genuinely break the ice across teams, ranks and departments",
    source: "Gallup · 2024",
    sourceUrl:
      "https://www.gallup.com/workplace/645566/employees-worldwide-feel-lonely.aspx",
  },
  {
    value: "2×",
    claim: "more engaged when people have a real friend at work",
    tieIn:
      "Nothing bonds a team like bluffing each other, then laughing about it afterwards",
    source: "Gallup",
    sourceUrl:
      "https://www.gallup.com/workplace/236213/why-need-best-friends-work.aspx",
  },
];

export const formats: CorporateFormat[] = [
  {
    tag: "Lunch & after-work",
    title: "The Social",
    description:
      "A relaxed 60–90 min session to round off a workday or replace the same old team drinks. Drinks-optional.",
    spec: "12–25 players · 60–90 min",
    image: "/photos/corporate/corporate-1.jpg",
  },
  {
    tag: "Off-site module",
    title: "The Away-Day Slot",
    description:
      "A high-energy block inside your off-site agenda, the bit people actually remember. Slots between sessions or closes the day out.",
    spec: "20–50 players · 90–120 min",
    image: "/photos/corporate/corporate-2.jpg",
  },
  {
    tag: "Larger group",
    title: "Two Tables, One Room",
    description:
      "Two parallel games of up to 25 run side by side with live hosts, for a big-room energiser that keeps the intimacy.",
    spec: "26–50 players · 90 min",
    image: "/photos/corporate/corporate-3.jpg",
  },
  {
    tag: "Seasonal",
    title: "The Christmas / Summer Do",
    description:
      "Your annual social, minus the awkward standing-around. A built-in reason to talk, laugh and mingle across teams.",
    spec: "16–50 players · 90 min",
    image: "/photos/corporate/corporate-6.jpg",
  },
  {
    tag: "Onboarding",
    title: "The Ice-Breaker",
    description:
      "New cohort or merged teams? Nothing accelerates 'knowing each other' like having to figure out who's bluffing.",
    spec: "12–30 players · 60 min",
    image: "/photos/corporate/corporate-4.jpg",
  },
  {
    tag: "Bespoke",
    title: "Build Your Own",
    description:
      "Custom roles themed to your company, branded reveals, or a tie-in to your values. Tell us the brief.",
    spec: "Up to 50 players · Tailored",
    image: "/photos/corporate/corporate-5.jpg",
  },
];

/**
 * "What's included" as a flowing sequence (start → finish), not a static list.
 */
export interface IncludedStep {
  title: string;
  description: string;
}

export const includedFlow: IncludedStep[] = [
  {
    title: "A quick pre-event call",
    description: "We tune the tone, timing and team quirks to your group.",
  },
  {
    title: "We bring everything",
    description: "Role cards, props, scripts, the lot. You bring the room.",
  },
  {
    title: "A pro host runs it",
    description: "Start to finish, scaled so 12 or 50 stay fully involved.",
  },
  {
    title: "You just play",
    description: "No prep, no admin, no running it yourself. Just join in.",
  },
  {
    title: "We pack down",
    description: "Setup and tidy-up are on us. You walk away buzzing.",
  },
];

// Kept for the slim configurator (occasions → recommended format).
export interface Occasion {
  value: string;
  label: string;
  /** Must match a format title in `formats` so the form select aligns. */
  format: string;
  duration: string;
}

export const occasions: Occasion[] = [
  { value: "social", label: "Team social", format: "The Social", duration: "~75 min" },
  { value: "awayday", label: "Away-day", format: "The Away-Day Slot", duration: "~90 min" },
  { value: "onboarding", label: "Onboarding", format: "The Ice-Breaker", duration: "~60 min" },
  { value: "seasonal", label: "Christmas / summer", format: "The Christmas / Summer Do", duration: "~90 min" },
  { value: "conference", label: "Conference / all-hands", format: "Two Tables, One Room", duration: "~90 min" },
];

export const locations: string[] = ["Edinburgh", "Glasgow", "Elsewhere in the UK"];

export const dateWindows: string[] = [
  "Within the next month",
  "In 1–3 months",
  "In 3+ months",
  "Flexible / not sure yet",
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
      "Just a room where everyone can sit or stand in a rough circle and hear each other. A meeting room, a private function space or a corner of your office all work, and we bring everything else. For two parallel tables we'll need enough room for two groups.",
  },
  {
    question: "Is it inclusive, and does everyone have to perform?",
    answer:
      "No one is ever put on the spot. The game naturally includes quieter people without forcing anyone to 'perform'. You can be fully involved by listening, voting and reading the room. Our hosts keep the tone warm and welcoming throughout.",
  },
  {
    question: "Can it be alcohol-free or run during the day?",
    answer:
      "Absolutely. The game works just as well as a daytime team session as it does an evening social, with no alcohol required. We regularly run lunch-and-learn slots, away-day blocks and onboarding sessions in working hours.",
  },
  {
    question: "What lead time do you need?",
    answer:
      "The sooner the better for locking in a date, especially around Christmas and summer. As a rule of thumb, give us a couple of weeks where you can, but get in touch even at short notice and we'll do our best to make it work.",
  },
  {
    question: "Can you handle accessibility and dietary needs?",
    answer:
      "Yes. The game is low-mobility and easy to adapt. Tell us about any accessibility requirements on our pre-event call and we'll make sure everyone can take part comfortably. If catering is involved, we'll factor dietary needs in.",
  },
];

/**
 * Corporate gallery photos — real corporate sessions only (no public-night or
 * stock shots). Converted/optimised from the uploads in `Photos - Corporate`.
 */
export const corporatePhotos: Photo[] = [
  {
    src: "/photos/corporate/corporate-3.jpg",
    alt: "A corporate team laughing across the table mid-game with player number cards",
    width: 1200,
    height: 1600,
  },
  {
    src: "/photos/corporate/corporate-2.jpg",
    alt: "A team gathered around a long table during a corporate Mafia Kilty session",
    width: 1280,
    height: 960,
  },
  {
    src: "/photos/corporate/corporate-5.jpg",
    alt: "A host running a Mafia Kilty game for a corporate team around the table",
    width: 1200,
    height: 1600,
  },
  {
    src: "/photos/corporate/corporate-1.jpg",
    alt: "Colleagues deducing and laughing during a corporate Mafia Kilty game",
    width: 960,
    height: 1280,
  },
  {
    src: "/photos/corporate/corporate-4.jpg",
    alt: "Players studying their cards around the table at a corporate game night",
    width: 1200,
    height: 1600,
  },
  {
    src: "/photos/corporate/corporate-6.jpg",
    alt: "A packed table of colleagues mid-game at a corporate Mafia Kilty session",
    width: 960,
    height: 1280,
  },
];
