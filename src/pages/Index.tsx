import { useState } from 'react';
import { Header } from '@/components/Header';
import { StatCard } from '@/components/StatCard';
import { SearchFilter } from '@/components/SearchFilter';
import { ClientCard } from '@/components/ClientCard';
import { ClientDrawer } from '@/components/ClientDrawer';
import { useClients } from '@/hooks/useClients';
import { Client } from '@/types/client';
import { Users, Flame, AlertTriangle, Clock } from 'lucide-react';

const Index = () => {
  const {
    clients,
    stats,
    urgentCount,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    urgencyFilter,
    setUrgencyFilter,
    updateClient,
    addClient,
  } = useClients();

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [drawerMode, setDrawerMode] = useState<'view' | 'edit' | 'note'>('view');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleClientClick = (client: Client) => {
    setSelectedClient(client);
    setDrawerMode('view');
    setIsDrawerOpen(true);
  };

  const handleEditClick = (client: Client) => {
    setSelectedClient(client);
    setDrawerMode('edit');
    setIsDrawerOpen(true);
  };

  const handleNoteClick = (client: Client) => {
    setSelectedClient(client);
    setDrawerMode('note');
    setIsDrawerOpen(true);
  };

  const handleAddClient = () => {
    const newClient: Client = {
      id: '',
      entreprise: '',
      nom: '',
      secteur: '',
      poste: '',
      mail: '',
      telephone: '',
      canalContact: '',
      statut: '',
      dernierEchange: '',
      prochaineAction: '',
      note: '',
      aProposer: '',
      categorie: '',
      scoreStunt: '',
      urgence: 'normal',
    };
    setSelectedClient(newClient);
    setDrawerMode('edit');
    setIsDrawerOpen(true);
  };

  const handleSaveClient = (client: Client) => {
    if (client.id) {
      updateClient(client);
    } else {
      addClient(client);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onAddClient={handleAddClient} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Section */}
        <section className="mb-12">
          <h2 className="font-display text-4xl mb-6">TABLEAU DE BORD</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard 
              label="Total clients" 
              value={stats.total} 
            />
            <StatCard 
              label="Clients chauds" 
              value={stats.chaud}
              onClick={() => setStatusFilter('chaud')}
            />
            <StatCard 
              label="À relancer" 
              value={stats.aRelancer}
              onClick={() => setStatusFilter('A relancer')}
            />
            <StatCard 
              label="Urgents" 
              value={urgentCount}
              highlight
              onClick={() => setUrgencyFilter('urgent')}
            />
          </div>
        </section>

        {/* Clients Section */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-4xl">CLIENTS</h2>
            <p className="text-muted-foreground">
              {clients.length} résultat{clients.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mb-8">
            <SearchFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeStatusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              activeUrgencyFilter={urgencyFilter}
              onUrgencyFilterChange={setUrgencyFilter}
            />
          </div>

          {/* Client Cards Grid */}
          {clients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client) => (
                <ClientCard
                  key={client.id}
                  client={client}
                  onClick={() => handleClientClick(client)}
                  onEdit={() => handleEditClick(client)}
                  onAddNote={() => handleNoteClick(client)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Aucun client trouvé</p>
              <p className="text-muted-foreground/60 text-sm mt-1">
                Essayez de modifier vos filtres ou d'ajouter un nouveau client
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Client Drawer */}
      <ClientDrawer
        client={selectedClient}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleSaveClient}
        mode={drawerMode}
      />
    </div>
  );
};

export default Index;
