import { Button } from '@/components/ui/button';
import { Plus, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface HeaderProps {
  onAddClient: () => void;
}

export function Header({ onAddClient }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de se déconnecter",
        variant: "destructive",
      });
    } else {
      navigate('/auth');
    }
  };
  
  return (
    <header className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="font-display text-2xl tracking-wider">STUNT CRM</h1>
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-background' : 'text-background/60 hover:text-background'}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/clients" 
              className={`text-sm font-medium transition-colors ${location.pathname === '/clients' ? 'text-background' : 'text-background/60 hover:text-background'}`}
            >
              Clients
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="yellow" onClick={onAddClient}>
            <Plus className="w-4 h-4 mr-2" />
            NOUVEAU CLIENT
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleLogout}
            className="text-background/70 hover:text-background hover:bg-background/10"
            title="Se déconnecter"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
