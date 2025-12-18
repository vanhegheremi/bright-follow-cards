import { Header } from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { useClients } from "@/hooks/useClients";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Dashboard = () => {
  const { clients, stats, urgentCount } = useClients();
  const navigate = useNavigate();

  // Get all urgent/overdue clients
  const urgentClients = clients.filter(c => c.urgence === 'urgent' || c.urgence === 'en-retard');

  return (
    <div className="min-h-screen bg-background">
      <Header onAddClient={() => navigate('/clients')} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Section */}
        <section className="mb-12">
          <h2 className="font-display text-4xl mb-6">TABLEAU DE BORD</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total prospects" value={stats.total} />
            <StatCard label="Clients chauds" value={stats.chaud} />
            <StatCard label="À relancer" value={stats.aRelancer} />
            <StatCard label="Urgents" value={urgentCount} highlight />
          </div>
        </section>

        {/* Quick Stats Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Urgent Section */}
          <section className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl">URGENTS</h3>
              <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded">
                {urgentCount}
              </span>
            </div>
            {urgentClients.length > 0 ? (
              <ul className="space-y-3 max-h-48 overflow-y-auto">
                {urgentClients.map(client => (
                  <li key={client.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div>
                      <p className="font-medium">{client.entreprise}</p>
                      <p className="text-sm text-muted-foreground">{client.nom}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      client.urgence === 'en-retard' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
                    }`}>
                      {client.urgence === 'en-retard' ? 'En retard' : 'Urgent'}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">Aucun client urgent</p>
            )
          }</section>

          {/* Status Breakdown */}
          <section className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-display text-xl mb-4">RÉPARTITION</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Chauds</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${stats.total ? (stats.chaud / stats.total) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="font-medium w-8 text-right">{stats.chaud}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Contact établi</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-foreground/60 rounded-full" 
                      style={{ width: `${stats.total ? (stats.contactEtabli / stats.total) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="font-medium w-8 text-right">{stats.contactEtabli}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Froids</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-muted-foreground rounded-full" 
                      style={{ width: `${stats.total ? (stats.froid / stats.total) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="font-medium w-8 text-right">{stats.froid}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">À relancer</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary/70 rounded-full" 
                      style={{ width: `${stats.total ? (stats.aRelancer / stats.total) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="font-medium w-8 text-right">{stats.aRelancer}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Validés</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${stats.total ? (stats.valide / stats.total) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="font-medium w-8 text-right">{stats.valide}</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Quick Link to Clients */}
        <section>
          <Link 
            to="/clients" 
            className="flex items-center justify-between bg-foreground text-background p-6 rounded-lg hover:bg-foreground/90 transition-colors group"
          >
            <div>
              <h3 className="font-display text-2xl mb-1">VOIR TOUS LES CLIENTS</h3>
              <p className="text-background/70">{stats.total} prospects dans la base</p>
            </div>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
