export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface City {
  name: string;
  active: boolean;
}

export interface EventWithAvailability {
  id: string;
  city: "Edinburgh" | "Glasgow";
  date: string;
  time: string;
  venue: string;
  description: string;
  totalSpots: number;
  pricePence: number;
  registrationCount: number;
  spotsRemaining: number;
  language: "English" | "Russian";
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  telegram: string;
  instagram: string;
  telephone: string;
  ticketQuantity: number;
  guestNames: string[];
}

export interface PeopleSkill {
  number: string;
  title: string;
  description: string;
}

export interface CorporateFormat {
  tag: string;
  title: string;
  description: string;
  spec: string;
}

/** Selections from the event configurator, carried into the enquiry form. */
export interface ConfiguratorState {
  groupSize: number;
  location: string;
  format: string;
  dateWindow: string;
}

export interface CorporateEnquiryFormData {
  name: string;
  company: string;
  workEmail: string;
  role: string;
  groupSize: string;
  city: string;
  format: string;
  preferredDate: string;
  budget: string;
  message: string;
  /** Anti-spam honeypot — must stay empty for a real submission. */
  website: string;
}
