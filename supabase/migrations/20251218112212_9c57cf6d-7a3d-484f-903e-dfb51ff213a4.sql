-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can view clients" ON public.clients;
DROP POLICY IF EXISTS "Authenticated users can insert clients" ON public.clients;
DROP POLICY IF EXISTS "Authenticated users can update clients" ON public.clients;
DROP POLICY IF EXISTS "Authenticated users can delete clients" ON public.clients;

-- Create public access policies (no auth required)
CREATE POLICY "Public read access" ON public.clients FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON public.clients FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON public.clients FOR UPDATE USING (true);
CREATE POLICY "Public delete access" ON public.clients FOR DELETE USING (true);