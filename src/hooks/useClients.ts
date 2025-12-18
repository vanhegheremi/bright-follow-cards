import { useState, useMemo } from 'react';
import { Client, ClientStatus, ClientStats } from '@/types/client';
import { mockClients } from '@/data/mockClients';

export function useClients() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ClientStatus | 'all'>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<'all' | 'urgent' | 'en-retard'>('all');

  const stats: ClientStats = useMemo(() => {
    return {
      total: clients.length,
      chaud: clients.filter(c => c.statut === 'chaud').length,
      froid: clients.filter(c => c.statut === 'froid').length,
      aRelancer: clients.filter(c => c.statut === 'A relancer').length,
      contactEtabli: clients.filter(c => c.statut === 'contact établi').length,
      valide: clients.filter(c => c.statut === 'Validé').length,
    };
  }, [clients]);

  const urgentCount = useMemo(() => {
    return clients.filter(c => c.urgence === 'urgent' || c.urgence === 'en-retard').length;
  }, [clients]);

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          client.entreprise?.toLowerCase().includes(query) ||
          client.nom?.toLowerCase().includes(query) ||
          client.mail?.toLowerCase().includes(query) ||
          client.secteur?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (statusFilter !== 'all' && client.statut !== statusFilter) {
        return false;
      }

      // Urgency filter - 'urgent' includes both urgent and en-retard
      if (urgencyFilter === 'urgent' && client.urgence !== 'urgent' && client.urgence !== 'en-retard') {
        return false;
      }
      if (urgencyFilter === 'en-retard' && client.urgence !== 'en-retard') {
        return false;
      }

      return true;
    });
  }, [clients, searchQuery, statusFilter, urgencyFilter]);

  const updateClient = (updatedClient: Client) => {
    setClients(prev => 
      prev.map(c => c.id === updatedClient.id ? updatedClient : c)
    );
  };

  const addClient = (newClient: Omit<Client, 'id'>) => {
    const client: Client = {
      ...newClient,
      id: crypto.randomUUID(),
    };
    setClients(prev => [client, ...prev]);
  };

  const deleteClient = (clientId: string) => {
    setClients(prev => prev.filter(c => c.id !== clientId));
  };

  return {
    clients: filteredClients,
    allClients: clients,
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
    deleteClient,
  };
}
