CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  event_type text NOT NULL,
  preferred_room text,
  preferred_package text,
  participants integer,
  event_date date,
  consultation_at timestamptz,
  venue text,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT len_ok CHECK (char_length(full_name) <= 120 AND char_length(email) <= 255 AND char_length(phone) <= 40 AND char_length(coalesce(notes,'')) <= 2000 AND char_length(coalesce(venue,'')) <= 300)
);
GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an enquiry" ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (status = 'pending');