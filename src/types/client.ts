export type ClientStatus = 
  | 'chaud' 
  | 'contact établi' 
  | 'froid' 
  | 'Validé' 
  | 'A relancer'
  | '';

export type ClientCategory = 'MA' | 'Global' | '';

export interface Client {
  id: string;
  entreprise: string;
  nom: string;
  secteur: string;
  poste: string;
  mail: string;
  telephone: string;
  canalContact: string;
  statut: ClientStatus;
  dernierEchange: string;
  prochaineAction: string;
  note: string;
  aProposer: string;
  categorie: ClientCategory;
  scoreStunt: string;
  dateRelance?: string;
  urgence?: 'normal' | 'urgent' | 'en-retard';
}

export interface ClientStats {
  total: number;
  chaud: number;
  froid: number;
  aRelancer: number;
  contactEtabli: number;
  valide: number;
}
