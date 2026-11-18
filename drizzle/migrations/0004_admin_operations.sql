CREATE TABLE public.booking_notes (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 enquiry_id uuid NOT NULL REFERENCES public.enquiries(id) ON DELETE CASCADE,
 body text NOT NULL CHECK (length(body) BETWEEN 1 AND 10000),
 follow_up_date date,
 created_by uuid NOT NULL DEFAULT auth.uid(),
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.booking_notes TO authenticated;
GRANT ALL ON public.booking_notes TO service_role;
ALTER TABLE public.booking_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read booking notes" ON public.booking_notes FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins add booking notes" ON public.booking_notes FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin') AND created_by = auth.uid());
CREATE POLICY "Admins delete booking notes" ON public.booking_notes FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX booking_notes_enquiry_idx ON public.booking_notes(enquiry_id);
CREATE TABLE public.room_operations (
 room_slug text PRIMARY KEY CHECK (room_slug IN ('search-and-rescue', 'alpha-team-classified', 'the-genies-secret')),
 readiness text NOT NULL DEFAULT 'not_reviewed' CHECK (readiness IN ('not_reviewed', 'ready', 'maintenance', 'out_of_service')),
 equipment text NOT NULL DEFAULT '',
 setup_instructions text NOT NULL DEFAULT '',
 internal_notes text NOT NULL DEFAULT '',
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.room_operations TO authenticated;
GRANT ALL ON public.room_operations TO service_role;
ALTER TABLE public.room_operations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read room operations" ON public.room_operations FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins create room operations" ON public.room_operations FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update room operations" ON public.room_operations FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TABLE public.room_inspections (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 room_slug text NOT NULL CHECK (room_slug IN ('search-and-rescue', 'alpha-team-classified', 'the-genies-secret')),
 inspected_on date NOT NULL,
 inspector text NOT NULL CHECK (length(inspector) BETWEEN 1 AND 200),
 result text NOT NULL CHECK (result IN ('passed', 'action_required', 'out_of_service')),
 checklist jsonb NOT NULL DEFAULT '{}'::jsonb,
 findings text NOT NULL DEFAULT '',
 actions text NOT NULL DEFAULT '',
 next_inspection date,
 created_by uuid NOT NULL DEFAULT auth.uid(),
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.room_inspections TO authenticated;
GRANT ALL ON public.room_inspections TO service_role;
ALTER TABLE public.room_inspections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read inspections" ON public.room_inspections FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins add inspections" ON public.room_inspections FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin') AND created_by = auth.uid());
CREATE POLICY "Admins delete inspections" ON public.room_inspections FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX room_inspections_room_idx ON public.room_inspections(room_slug, inspected_on DESC);