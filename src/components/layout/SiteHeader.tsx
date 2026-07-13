import { cn } from "@/lib/utils";

export interface SiteHeaderProps {
  actions?: React.ReactNode;
  className?: string;
}

export function SiteHeader({ actions, className }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "bg-background/80 sticky top-0 z-20 border-b backdrop-blur",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span
            className="grid size-6 place-items-center rounded-full border-2 border-foreground"
            aria-hidden
          >
            <span className="size-1.5 rounded-full bg-foreground" />
          </span>
          <span className="text-lg font-bold tracking-tight">Pokédex</span>
        </div>
        {actions}
      </div>
    </header>
  );
}
