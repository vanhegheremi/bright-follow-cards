-- Drop existing permissive policies
DROP POLICY IF EXISTS "Public delete access" ON public.clients;
DROP POLICY IF EXISTS "Public insert access" ON public.clients;
DROP POLICY IF EXISTS "Public read access" ON public.clients;
DROP POLICY IF EXISTS "Public update access" ON public.clients;

-- Create new policies for authenticated users only
CREATE POLICY "Authenticated users can read clients"
ON public.clients
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert clients"
ON public.clients
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update clients"
ON public.clients
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete clients"
ON public.clients
FOR DELETE
TO authenticated
USING (true);