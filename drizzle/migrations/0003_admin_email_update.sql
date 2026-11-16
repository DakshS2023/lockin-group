CREATE OR REPLACE FUNCTION public.assign_lockin_admin()
 RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$ BEGIN IF lower(NEW.email) IN ('dakshcuzurstuff@gmail.com','lockinescaperooms@gmail.com') AND NEW.email_confirmed_at IS NOT NULL THEN INSERT INTO public.user_roles(user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING; END IF; RETURN NEW; END $function$;
INSERT INTO public.user_roles(user_id, role) SELECT id, 'admin' FROM auth.users WHERE lower(email)='dakshcuzurstuff@gmail.com' AND email_confirmed_at IS NOT NULL ON CONFLICT DO NOTHING;