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
}

export interface DbRegistration {
  id: string;
  event_id: string;
  full_name: string;
  email: string;
  telegram: string | null;
  instagram: string | null;
  telephone: string | null;
  payment_status: "pending" | "paid" | "failed" | "refunded";
  stripe_session_id: string;
}

export interface DbEventAvailability extends DbEvent {
  registration_count: number;
  spots_remaining: number;
}
