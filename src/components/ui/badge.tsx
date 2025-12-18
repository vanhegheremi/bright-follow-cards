import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-none px-2.5 py-0.5 text-xs font-display tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border border-border bg-secondary text-secondary-foreground",
        secondary: "border border-border bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "border border-foreground text-foreground",
        hot: "bg-status-hot text-card border-none",
        warm: "bg-status-warm text-card border-none",
        cold: "bg-status-cold text-card border-none",
        validated: "bg-status-validated text-card border-none",
        pending: "bg-primary text-primary-foreground border-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
