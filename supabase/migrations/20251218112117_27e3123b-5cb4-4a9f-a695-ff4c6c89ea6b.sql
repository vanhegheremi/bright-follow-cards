-- Create clients table for CRM persistence
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  entreprise TEXT NOT NULL DEFAULT '',
  nom TEXT NOT NULL DEFAULT '',
  secteur TEXT NOT NULL DEFAULT '',
  poste TEXT NOT NULL DEFAULT '',
  mail TEXT NOT NULL DEFAULT '',
  telephone TEXT NOT NULL DEFAULT '',
  canal_contact TEXT NOT NULL DEFAULT '',
  statut TEXT NOT NULL DEFAULT '',
  dernier_echange TEXT NOT NULL DEFAULT '',
  prochaine_action TEXT NOT NULL DEFAULT '',
  note TEXT NOT NULL DEFAULT '',
  a_proposer TEXT NOT NULL DEFAULT '',
  categorie TEXT NOT NULL DEFAULT '',
  score_stunt TEXT NOT NULL DEFAULT '',
  date_relance DATE,
  urgence TEXT NOT NULL DEFAULT 'normal',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Any authenticated user (internal tool) can CRUD all clients
DO $$ BEGIN
  CREATE POLICY "Authenticated users can view clients"
  ON public.clients
  FOR SELECT
  USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Authenticated users can insert clients"
  ON public.clients
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Authenticated users can update clients"
  ON public.clients
  FOR UPDATE
  USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Authenticated users can delete clients"
  ON public.clients
  FOR DELETE
  USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

DROP TRIGGER IF EXISTS update_clients_updated_at ON public.clients;
CREATE TRIGGER update_clients_updated_at
BEFORE UPDATE ON public.clients
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_clients_statut ON public.clients (statut);
CREATE INDEX IF NOT EXISTS idx_clients_urgence ON public.clients (urgence);
CREATE INDEX IF NOT EXISTS idx_clients_date_relance ON public.clients (date_relance);