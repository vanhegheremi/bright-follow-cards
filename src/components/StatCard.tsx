interface StatCardProps {
  label: string;
  value: number;
  highlight?: boolean;
  onClick?: () => void;
}

export function StatCard({ label, value, highlight, onClick }: StatCardProps) {
  return (
    <button
      onClick={onClick}
      className={`text-left transition-all duration-200 ${
        highlight 
          ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
          : 'bg-card border border-border hover:border-foreground'
      } ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className="p-6">
        <p className={`text-xs uppercase tracking-widest font-medium mb-2 ${
          highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'
        }`}>
          {label}
        </p>
        <p className="font-display text-5xl">{value}</p>
      </div>
    </button>
  );
}
