import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { SearchFilter } from "@/components/SearchFilter";
import { ClientCard } from "@/components/ClientCard";
import { ClientDrawer } from "@/components/ClientDrawer";
import { useClients } from "@/hooks/useClients";
import { Client, ClientStatus } from "@/types/client";

const Clients = () => {
  const [searchParams] = useSearchParams();
  const {
    clients,
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
  const [drawerMode, setDrawerMode] = useState<"view" | "edit" | "note">("view");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Apply filters from URL params on mount
  useEffect(() => {
    const status = searchParams.get('status') as ClientStatus | null;
    const urgency = searchParams.get('urgency') as 'urgent' | 'en-retard' | null;
    const clientId = searchParams.get('clientId');
    
    if (status) {
      setStatusFilter(status);
    }
    if (urgency) {
      setUrgencyFilter(urgency);
    }
    if (clientId) {
      // Find client and open drawer
      const client = clients.find(c => c.id === clientId);
      if (client) {
        setSelectedClient(client);
        setDrawerMode("view");
        setIsDrawerOpen(true);
      }
    }
  }, [searchParams, setStatusFilter, setUrgencyFilter, clients]);

  const handleClientClick = (client: Client) => {
    setSelectedClient(client);
    setDrawerMode("view");
    setIsDrawerOpen(true);
  };

  const handleEditClick = (client: Client) => {
    setSelectedClient(client);
    setDrawerMode("edit");
    setIsDrawerOpen(true);
  };

  const handleNoteClick = (client: Client) => {
    setSelectedClient(client);
    setDrawerMode("note");
    setIsDrawerOpen(true);
  };

  const handleAddClient = () => {
    const newClient: Client = {
      id: "",
      entreprise: "",
      nom: "",
      secteur: "",
      poste: "",
      mail: "",
      telephone: "",
      canalContact: "",
      statut: "",
      dernierEchange: "",
      prochaineAction: "",
      note: "",
      aProposer: "",
      categorie: "",
      scoreStunt: "",
      urgence: "normal",
    };
    setSelectedClient(newClient);
    setDrawerMode("edit");
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
        {/* Clients Section */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-4xl">CLIENTS</h2>
            <p className="text-muted-foreground">
              {clients.length} résultat{clients.length !== 1 ? "s" : ""}
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

export default Clients;
