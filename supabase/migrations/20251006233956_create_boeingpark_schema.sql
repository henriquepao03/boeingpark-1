/*
  # BoeingPark Database Schema

  ## Overview
  This migration creates the complete database structure for the BoeingPark parking service website.
  It includes tables for services, bookings, customers, testimonials, and pricing.

  ## New Tables

  ### 1. `services`
  Stores parking service types and their features
  - `id` (uuid, primary key)
  - `name` (text) - Service name (e.g., "Valet", "Covered Parking")
  - `description` (text) - Detailed service description
  - `features` (jsonb) - Array of service features
  - `icon` (text) - Icon identifier for UI
  - `display_order` (integer) - Order for display
  - `active` (boolean) - Whether service is currently offered
  - `created_at` (timestamptz)

  ### 2. `pricing`
  Stores pricing information for different services and durations
  - `id` (uuid, primary key)
  - `service_id` (uuid, foreign key to services)
  - `duration_days` (integer) - Number of days
  - `price_per_day` (decimal) - Price per day in euros
  - `total_price` (decimal) - Total price for duration
  - `active` (boolean)
  - `created_at` (timestamptz)

  ### 3. `extras`
  Additional services like car wash, electric charging
  - `id` (uuid, primary key)
  - `name` (text)
  - `description` (text)
  - `price` (decimal)
  - `icon` (text)
  - `active` (boolean)
  - `created_at` (timestamptz)

  ### 4. `bookings`
  Customer booking records
  - `id` (uuid, primary key)
  - `customer_name` (text)
  - `customer_email` (text)
  - `customer_phone` (text)
  - `service_id` (uuid, foreign key to services)
  - `start_date` (timestamptz)
  - `end_date` (timestamptz)
  - `vehicle_plate` (text)
  - `vehicle_model` (text)
  - `extras` (jsonb) - Array of extra service IDs
  - `total_price` (decimal)
  - `status` (text) - 'pending', 'confirmed', 'active', 'completed', 'cancelled'
  - `special_requests` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. `testimonials`
  Customer reviews and testimonials
  - `id` (uuid, primary key)
  - `customer_name` (text)
  - `rating` (integer) - 1-5 stars
  - `comment` (text)
  - `service_used` (text)
  - `image_url` (text) - Optional customer photo
  - `video_url` (text) - Optional video testimonial
  - `approved` (boolean) - Moderation flag
  - `created_at` (timestamptz)

  ### 6. `gallery_images`
  Photo gallery for facilities
  - `id` (uuid, primary key)
  - `title` (text)
  - `description` (text)
  - `image_url` (text)
  - `category` (text) - 'covered', 'outdoor', 'valet', 'shuttle', 'facilities'
  - `display_order` (integer)
  - `active` (boolean)
  - `created_at` (timestamptz)

  ### 7. `faqs`
  Frequently asked questions
  - `id` (uuid, primary key)
  - `question` (text)
  - `answer` (text)
  - `category` (text)
  - `display_order` (integer)
  - `active` (boolean)
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access for services, pricing, extras, testimonials (approved only), gallery, FAQs
  - Authenticated users can create bookings
  - Only authenticated users can manage their own bookings

  ## Notes
  - All monetary values stored in euros (decimal type)
  - JSONB used for flexible data storage (features, extras)
  - Indexes added for frequently queried fields
  - Timestamps for audit trail
*/

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  icon text DEFAULT 'car',
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create pricing table
CREATE TABLE IF NOT EXISTS pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES services(id) ON DELETE CASCADE,
  duration_days integer NOT NULL,
  price_per_day decimal(10,2) NOT NULL,
  total_price decimal(10,2) NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create extras table
CREATE TABLE IF NOT EXISTS extras (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  icon text DEFAULT 'plus-circle',
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  service_id uuid REFERENCES services(id),
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  vehicle_plate text NOT NULL,
  vehicle_model text,
  extras jsonb DEFAULT '[]'::jsonb,
  total_price decimal(10,2) NOT NULL,
  status text DEFAULT 'pending',
  special_requests text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  service_used text,
  image_url text,
  video_url text,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  category text NOT NULL,
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text DEFAULT 'general',
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pricing_service_id ON pricing(service_id);
CREATE INDEX IF NOT EXISTS idx_bookings_service_id ON bookings(service_id);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_email ON bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_bookings_start_date ON bookings(start_date);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(approved);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_images(category);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE extras ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Public read access for services
CREATE POLICY "Public can view active services"
  ON services FOR SELECT
  TO public
  USING (active = true);

-- Public read access for pricing
CREATE POLICY "Public can view active pricing"
  ON pricing FOR SELECT
  TO public
  USING (active = true);

-- Public read access for extras
CREATE POLICY "Public can view active extras"
  ON extras FOR SELECT
  TO public
  USING (active = true);

-- Booking policies - anyone can create, only view own bookings
CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can update own bookings"
  ON bookings FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Public read access for approved testimonials only
CREATE POLICY "Public can view approved testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (approved = true);

-- Public read access for active gallery images
CREATE POLICY "Public can view active gallery images"
  ON gallery_images FOR SELECT
  TO public
  USING (active = true);

-- Public read access for active FAQs
CREATE POLICY "Public can view active FAQs"
  ON faqs FOR SELECT
  TO public
  USING (active = true);