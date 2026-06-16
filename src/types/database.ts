export interface DbEvent {
  id: string;
  city: "Edinburgh" | "Glasgow";
  date: string;
  time: string;
  venue: string;
  description: string;
  total_spots: number;
  price_pence: number;
  is_published: boolean;
  language: "English" | "Russian";
}

export interface DbRegistration {
  id: string;
  event_id: string;
  full_name: string;
  email: string;
  telegram: string | null;
  instagram: string | null;
  telephone: string | null;
  payment_status: "paid" | "refunded";
  stripe_session_id: string;
}

export interface DbEventAvailability extends DbEvent {
  registration_count: number;
  spots_remaining: number;
}

export interface DbCorporateEnquiry {
  id: string;
  name: string;
  company: string;
  work_email: string;
  role: string | null;
  group_size: number | null;
  city: string | null;
  format: string | null;
  preferred_date: string | null;
  budget: string | null;
  message: string | null;
  created_at: string;
}
