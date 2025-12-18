import { Client } from '@/types/client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Edit2, MessageSquare } from 'lucide-react';

interface ClientCardProps {
  client: Client;
  onClick: () => void;
  onEdit: () => void;
  onAddNote: () => void;
}

const statusConfig: Record<string, { label: string; variant: 'hot' | 'warm' | 'cold' | 'validated' | 'pending' | 'default' }> = {
  'chaud': { label: 'CHAUD', variant: 'hot' },
  'contact établi': { label: 'CONTACT ÉTABLI', variant: 'warm' },
  'froid': { label: 'FROID', variant: 'cold' },
  'Validé': { label: 'VALIDÉ', variant: 'validated' },
  'A relancer': { label: 'À RELANCER', variant: 'pending' },
  '': { label: 'NON DÉFINI', variant: 'default' },
};

const urgenceConfig: Record<string, { label: string; className: string }> = {
  'urgent': { label: 'URGENT', className: 'bg-status-hot text-card animate-pulse' },
  'en-retard': { label: 'EN RETARD', className: 'bg-foreground text-card' },
  'normal': { label: '', className: '' },
};

export function ClientCard({ client, onClick, onEdit, onAddNote }: ClientCardProps) {
  const status = statusConfig[client.statut] || statusConfig[''];
  const urgence = urgenceConfig[client.urgence || 'normal'];

  return (
    <article
      className="group bg-card border border-border hover:border-foreground transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      {/* Urgency Banner */}
      {client.urgence && client.urgence !== 'normal' && (
        <div className={`px-4 py-1 font-display text-sm tracking-wider ${urgence.className}`}>
          {urgence.label}
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-2xl tracking-wide truncate">
              {client.entreprise || 'Sans nom'}
            </h3>
            {client.nom && (
              <p className="text-muted-foreground font-body text-sm mt-1">
                {client.nom}
                {client.poste && <span className="text-muted-foreground/60"> · {client.poste}</span>}
              </p>
            )}
          </div>
          <Badge variant={status.variant} className="ml-2 shrink-0">
            {status.label}
          </Badge>
        </div>

        {/* Category - only show for chaud, validé, contact établi */}
        {client.categorie && ['chaud', 'contact établi', 'Validé'].includes(client.statut) && (
          <div className="mb-3">
            <span className="text-xs font-display tracking-wider bg-primary/20 px-2 py-1">
              {client.categorie}
            </span>
          </div>
        )}

        {/* Sector */}
        {client.secteur && (
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-medium">
            {client.secteur}
          </p>
        )}

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          {client.mail && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-3.5 h-3.5" />
              <span className="truncate">{client.mail}</span>
            </div>
          )}
          {client.telephone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-3.5 h-3.5" />
              <span>{client.telephone}</span>
            </div>
          )}
        </div>

        {/* Date Relance */}
        {client.dateRelance && (
          <div className="bg-yellow-light px-3 py-2 mb-4">
            <span className="text-xs font-display tracking-wider">RELANCE :</span>
            <span className="text-sm font-medium ml-2">{client.dateRelance}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
          >
            <Edit2 className="w-3.5 h-3.5 mr-1.5" />
            Modifier
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={(e) => { e.stopPropagation(); onAddNote(); }}
          >
            <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
            Note
          </Button>
        </div>
      </div>
    </article>
  );
}
