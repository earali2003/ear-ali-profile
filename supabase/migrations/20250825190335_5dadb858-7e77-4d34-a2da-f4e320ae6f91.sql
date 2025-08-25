-- Fix the search path security warning by updating the function
CREATE OR REPLACE FUNCTION public.is_site_owner()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  select exists (select 1 from public.site_owner where owner_id = auth.uid());
$$;