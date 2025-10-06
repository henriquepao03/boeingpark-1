import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Service = {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: string;
  display_order: number;
  active: boolean;
  created_at: string;
};

export type Pricing = {
  id: string;
  service_id: string;
  duration_days: number;
  price_per_day: number;
  total_price: number;
  active: boolean;
  created_at: string;
};

export type Extra = {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  active: boolean;
  created_at: string;
};

export type Booking = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_id: string;
  start_date: string;
  end_date: string;
  vehicle_plate: string;
  vehicle_model?: string;
  extras: string[];
  total_price: number;
  status: string;
  special_requests?: string;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  service_used?: string;
  image_url?: string;
  video_url?: string;
  approved: boolean;
  created_at: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  active: boolean;
  created_at: string;
};
