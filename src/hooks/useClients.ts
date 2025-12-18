import { useState, useMemo, useEffect, useCallback } from 'react';
import { Client, ClientStatus, ClientStats, ClientCategory } from '@/types/client';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Map database row to Client type
function mapDbToClient(row: any): Client {
  return {
    id: row.id,
    entreprise: row.entreprise || '',
    nom: row.nom || '',
    secteur: row.secteur || '',
    poste: row.poste || '',
    mail: row.mail || '',
    telephone: row.telephone || '',
    canalContact: row.canal_contact || '',
    statut: row.statut || '',
    dernierEchange: row.dernier_echange || '',
    prochaineAction: row.prochaine_action || '',
    note: row.note || '',
    aProposer: row.a_proposer || '',
    categorie: row.categorie || '',
    scoreStunt: row.score_stunt || '',
    dateRelance: row.date_relance || undefined,
    urgence: row.urgence || 'normal',
  };
}

// Map Client type to database row
function mapClientToDb(client: Omit<Client, 'id'> | Client) {
  return {
    entreprise: client.entreprise,
    nom: client.nom,
    secteur: client.secteur,
    poste: client.poste,
    mail: client.mail,
    telephone: client.telephone,
    canal_contact: client.canalContact,
    statut: client.statut,
    dernier_echange: client.dernierEchange,
    prochaine_action: client.prochaineAction,
    note: client.note,
    a_proposer: client.aProposer,
    categorie: client.categorie,
    score_stunt: client.scoreStunt,
    date_relance: client.dateRelance || null,
    urgence: client.urgence || 'normal',
  };
}

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ClientStatus | 'all'>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<'all' | 'urgent' | 'en-retard'>('all');
  const [categoryFilter, setCategoryFilter] = useState<ClientCategory | 'all'>('all');

  // Fetch clients from database
  const fetchClients = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setClients(data?.map(mapDbToClient) || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Erreur lors du chargement des clients');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

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

      // Category filter
      if (categoryFilter !== 'all' && client.categorie !== categoryFilter) {
        return false;
      }

      return true;
    });
  }, [clients, searchQuery, statusFilter, urgencyFilter, categoryFilter]);

  const updateClient = async (updatedClient: Client) => {
    try {
      const { error } = await supabase
        .from('clients')
        .update(mapClientToDb(updatedClient))
        .eq('id', updatedClient.id);

      if (error) throw error;

      setClients(prev => 
        prev.map(c => c.id === updatedClient.id ? updatedClient : c)
      );
      toast.success('Client mis à jour');
    } catch (error) {
      console.error('Error updating client:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const addClient = async (newClient: Omit<Client, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert(mapClientToDb(newClient))
        .select()
        .single();

      if (error) throw error;

      const client = mapDbToClient(data);
      setClients(prev => [client, ...prev]);
      toast.success('Client ajouté');
    } catch (error) {
      console.error('Error adding client:', error);
      toast.error('Erreur lors de l\'ajout');
    }
  };

  const deleteClient = async (clientId: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', clientId);

      if (error) throw error;

      setClients(prev => prev.filter(c => c.id !== clientId));
      toast.success('Client supprimé');
    } catch (error) {
      console.error('Error deleting client:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  return {
    clients: filteredClients,
    allClients: clients,
    stats,
    urgentCount,
    loading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    urgencyFilter,
    setUrgencyFilter,
    categoryFilter,
    setCategoryFilter,
    updateClient,
    addClient,
    deleteClient,
    refetch: fetchClients,
  };
}
