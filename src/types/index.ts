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
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  telegram: string;
  instagram: string;
  telephone: string;
}
