import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ClientStatus, ClientCategory } from '@/types/client';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeStatusFilter: ClientStatus | 'all';
  onStatusFilterChange: (status: ClientStatus | 'all') => void;
  activeUrgencyFilter: 'all' | 'urgent' | 'en-retard';
  onUrgencyFilterChange: (urgency: 'all' | 'urgent' | 'en-retard') => void;
  activeCategoryFilter: ClientCategory | 'all';
  onCategoryFilterChange: (category: ClientCategory | 'all') => void;
}

const statusFilters: { value: ClientStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'TOUS' },
  { value: 'chaud', label: 'CHAUD' },
  { value: 'contact établi', label: 'CONTACT' },
  { value: 'froid', label: 'FROID' },
  { value: 'Validé', label: 'VALIDÉ' },
  { value: 'A relancer', label: 'À RELANCER' },
];

const urgencyFilters: { value: 'all' | 'urgent' | 'en-retard'; label: string }[] = [
  { value: 'all', label: 'TOUS' },
  { value: 'urgent', label: 'URGENT' },
  { value: 'en-retard', label: 'EN RETARD' },
];

const categoryFilters: { value: ClientCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'TOUS' },
  { value: 'MARKETING ALTERNATIF', label: 'MARKETING ALT.' },
  { value: 'BRANDING', label: 'BRANDING' },
  { value: 'GLOBAL', label: 'GLOBAL' },
];

export function SearchFilter({
  searchQuery,
  onSearchChange,
  activeStatusFilter,
  onStatusFilterChange,
  activeUrgencyFilter,
  onUrgencyFilterChange,
  activeCategoryFilter,
  onCategoryFilterChange,
}: SearchFilterProps) {
  const hasActiveFilters = activeStatusFilter !== 'all' || activeUrgencyFilter !== 'all' || activeCategoryFilter !== 'all' || searchQuery;

  const clearFilters = () => {
    onSearchChange('');
    onStatusFilterChange('all');
    onUrgencyFilterChange('all');
    onCategoryFilterChange('all');
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher par nom, société, contact..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-11 h-12 border-foreground/20 focus:border-foreground"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span className="text-xs uppercase tracking-widest font-medium">Statut</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onStatusFilterChange(filter.value)}
              className={`px-3 py-1.5 text-xs font-display tracking-wider transition-all ${
                activeStatusFilter === filter.value
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:bg-foreground/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span className="text-xs uppercase tracking-widest font-medium">Urgence</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {urgencyFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onUrgencyFilterChange(filter.value)}
              className={`px-3 py-1.5 text-xs font-display tracking-wider transition-all ${
                activeUrgencyFilter === filter.value
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:bg-foreground/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span className="text-xs uppercase tracking-widest font-medium">Catégorie</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categoryFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onCategoryFilterChange(filter.value)}
              className={`px-3 py-1.5 text-xs font-display tracking-wider transition-all ${
                activeCategoryFilter === filter.value
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:bg-foreground/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto">
            <X className="w-3.5 h-3.5 mr-1" />
            Effacer
          </Button>
        )}
      </div>
    </div>
  );
}
