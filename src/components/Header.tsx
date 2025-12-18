import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  onAddClient: () => void;
}

export function Header({ onAddClient }: HeaderProps) {
  const location = useLocation();
  
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
        <Button variant="yellow" onClick={onAddClient}>
          <Plus className="w-4 h-4 mr-2" />
          NOUVEAU CLIENT
        </Button>
      </div>
    </header>
  );
}
