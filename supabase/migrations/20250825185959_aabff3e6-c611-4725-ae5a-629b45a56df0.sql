-- Fix the security warning for site_owner table by adding RLS policy
CREATE POLICY "Only site owner can manage site_owner table"
ON public.site_owner
FOR ALL
USING (owner_id = auth.uid());