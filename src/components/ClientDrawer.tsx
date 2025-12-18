import { Client } from '@/types/client';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Save, Mail, Phone, Calendar, Building2, User, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ClientDrawerProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: Client) => void;
  mode: 'view' | 'edit' | 'note';
}

const statusOptions = [
  { value: 'non-defini', label: 'Non défini' },
  { value: 'chaud', label: 'Chaud' },
  { value: 'contact établi', label: 'Contact établi' },
  { value: 'froid', label: 'Froid' },
  { value: 'Validé', label: 'Validé' },
  { value: 'A relancer', label: 'À relancer' },
];

const urgencyOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'en-retard', label: 'En retard' },
];

const categoryOptions = [
  { value: 'MARKETING ALTERNATIF', label: 'Marketing Alternatif' },
  { value: 'BRANDING', label: 'Branding' },
  { value: 'GLOBAL', label: 'Global' },
];

const statusConfig: Record<string, { variant: 'hot' | 'warm' | 'cold' | 'validated' | 'pending' | 'default' }> = {
  'chaud': { variant: 'hot' },
  'contact établi': { variant: 'warm' },
  'froid': { variant: 'cold' },
  'Validé': { variant: 'validated' },
  'A relancer': { variant: 'pending' },
  '': { variant: 'default' },
};

export function ClientDrawer({ client, isOpen, onClose, onSave, mode }: ClientDrawerProps) {
  const [editedClient, setEditedClient] = useState<Client | null>(null);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    if (client) {
      setEditedClient({ ...client });
      setNewNote('');
    }
  }, [client]);

  if (!client || !editedClient) return null;

  const handleSave = () => {
    if (mode === 'note' && newNote) {
      const updatedNote = editedClient.note 
        ? `${editedClient.note}\n\n[${new Date().toLocaleDateString('fr-FR')}] ${newNote}`
        : `[${new Date().toLocaleDateString('fr-FR')}] ${newNote}`;
      onSave({ ...editedClient, note: updatedNote });
    } else {
      onSave(editedClient);
    }
    onClose();
  };

  const status = statusConfig[client.statut] || statusConfig[''];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="space-y-4 pb-6 border-b border-border">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <SheetTitle className="font-display text-3xl tracking-wide">
                {client.entreprise || 'Sans nom'}
              </SheetTitle>
              {client.nom && (
                <p className="text-muted-foreground mt-1">
                  {client.nom}
                </p>
              )}
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant={status.variant} className="ml-4">
                {client.statut || 'NON DÉFINI'}
              </Badge>
              {client.categorie && ['chaud', 'contact établi', 'Validé'].includes(client.statut) && (
                <span className="text-xs font-display tracking-wider bg-primary/20 px-2 py-1">
                  {client.categorie}
                </span>
              )}
            </div>
          </div>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {mode === 'view' && (
            <>
              {/* Contact Info */}
              <section className="space-y-3">
                <h4 className="font-display text-sm tracking-widest text-muted-foreground">CONTACT</h4>
                <div className="space-y-2">
                  {client.mail && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a href={`mailto:${client.mail}`} className="hover:underline">{client.mail}</a>
                    </div>
                  )}
                  {client.telephone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a href={`tel:${client.telephone}`} className="hover:underline">{client.telephone}</a>
                    </div>
                  )}
                  {client.poste && (
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      <span>{client.poste}</span>
                    </div>
                  )}
                  {client.secteur && (
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span>{client.secteur}</span>
                    </div>
                  )}
                </div>
              </section>

              {/* Activity */}
              <section className="space-y-3">
                <h4 className="font-display text-sm tracking-widest text-muted-foreground">ACTIVITÉ</h4>
                <div className="space-y-3">
                  {client.dernierEchange && (
                    <div className="bg-muted p-4">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Dernier échange</p>
                      <p>{client.dernierEchange}</p>
                    </div>
                  )}
                  {client.prochaineAction && (
                    <div className="bg-yellow-light p-4">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Prochaine action</p>
                      <p>{client.prochaineAction}</p>
                    </div>
                  )}
                  {client.dateRelance && (
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Relance : {client.dateRelance}</span>
                    </div>
                  )}
                </div>
              </section>

              {/* Notes */}
              {client.note && (
                <section className="space-y-3">
                  <h4 className="font-display text-sm tracking-widest text-muted-foreground">NOTES</h4>
                  <div className="bg-muted p-4 whitespace-pre-wrap text-sm">{client.note}</div>
                </section>
              )}

              {/* Proposal */}
              {client.aProposer && (
                <section className="space-y-3">
                  <h4 className="font-display text-sm tracking-widest text-muted-foreground">À PROPOSER</h4>
                  <div className="bg-primary/10 p-4 font-medium">{client.aProposer}</div>
                </section>
              )}
            </>
          )}

          {mode === 'edit' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="entreprise">Entreprise</Label>
                  <Input
                    id="entreprise"
                    value={editedClient.entreprise}
                    onChange={(e) => setEditedClient({ ...editedClient, entreprise: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom</Label>
                  <Input
                    id="nom"
                    value={editedClient.nom}
                    onChange={(e) => setEditedClient({ ...editedClient, nom: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mail">Email</Label>
                  <Input
                    id="mail"
                    type="email"
                    value={editedClient.mail}
                    onChange={(e) => setEditedClient({ ...editedClient, mail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    value={editedClient.telephone}
                    onChange={(e) => setEditedClient({ ...editedClient, telephone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="statut">Statut</Label>
                  <Select
                    value={editedClient.statut || 'non-defini'}
                    onValueChange={(value) => setEditedClient({ ...editedClient, statut: value === 'non-defini' ? '' : value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="urgence">Urgence</Label>
                  <Select
                    value={editedClient.urgence || 'normal'}
                    onValueChange={(value) => setEditedClient({ ...editedClient, urgence: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Category - only show for chaud, validé, contact établi */}
              {['chaud', 'contact établi', 'Validé'].includes(editedClient.statut) && (
                <div className="space-y-2">
                  <Label htmlFor="categorie">Catégorie</Label>
                  <Select
                    value={editedClient.categorie || ''}
                    onValueChange={(value) => setEditedClient({ ...editedClient, categorie: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="secteur">Secteur</Label>
                <Input
                  id="secteur"
                  value={editedClient.secteur}
                  onChange={(e) => setEditedClient({ ...editedClient, secteur: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="poste">Poste</Label>
                <Input
                  id="poste"
                  value={editedClient.poste}
                  onChange={(e) => setEditedClient({ ...editedClient, poste: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateRelance">Date de relance</Label>
                <Input
                  id="dateRelance"
                  type="date"
                  value={editedClient.dateRelance || ''}
                  onChange={(e) => setEditedClient({ ...editedClient, dateRelance: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prochaineAction">Prochaine action</Label>
                <Input
                  id="prochaineAction"
                  value={editedClient.prochaineAction}
                  onChange={(e) => setEditedClient({ ...editedClient, prochaineAction: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Notes</Label>
                <Textarea
                  id="note"
                  value={editedClient.note}
                  onChange={(e) => setEditedClient({ ...editedClient, note: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
          )}

          {mode === 'note' && (
            <div className="space-y-4">
              {client.note && (
                <div className="space-y-2">
                  <Label>Notes existantes</Label>
                  <div className="bg-muted p-4 whitespace-pre-wrap text-sm max-h-48 overflow-y-auto">
                    {client.note}
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="newNote">Nouvelle note</Label>
                <Textarea
                  id="newNote"
                  placeholder="Ajouter une note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 pt-6 border-t border-border">
          <Button variant="outline" onClick={onClose} className="flex-1">
            <X className="w-4 h-4 mr-2" />
            Annuler
          </Button>
          {(mode === 'edit' || (mode === 'note' && newNote)) && (
            <Button variant="hero" onClick={handleSave} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Enregistrer
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
