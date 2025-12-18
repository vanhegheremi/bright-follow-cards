import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface HeaderProps {
  onAddClient: () => void;
}

export function Header({ onAddClient }: HeaderProps) {
  return (
    <header className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="font-display text-2xl tracking-wider">STUNT CRM</h1>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium text-background/80 hover:text-background transition-colors">
              Dashboard
            </a>
            <a href="/clients" className="text-sm font-medium text-background/80 hover:text-background transition-colors">
              Clients
            </a>
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
