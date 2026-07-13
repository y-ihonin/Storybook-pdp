import type { PokemonStat, PokemonTypeName } from "@/lib/pokeapi";
import { TYPE_COLORS } from "@/lib/pokemon-format";
import { cn } from "@/lib/utils";
import { StatBar } from "./StatBar";

export interface StatsPanelProps {
  stats: PokemonStat[];
  accentType?: PokemonTypeName;
  className?: string;
}

export function StatsPanel({ stats, accentType, className }: StatsPanelProps) {
  const total = stats.reduce((sum, s) => sum + s.value, 0);
  const color = accentType ? TYPE_COLORS[accentType] : undefined;

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      {stats.map((stat) => (
        <StatBar
          key={stat.name}
          label={stat.label}
          value={stat.value}
          color={color}
        />
      ))}
      <div className="mt-1 flex items-center gap-3 border-t pt-2.5">
        <span className="text-foreground w-16 shrink-0 text-xs font-semibold">
          Total
        </span>
        <span className="w-8 shrink-0 text-right text-sm font-bold tabular-nums">
          {total}
        </span>
        <span className="flex-1" />
      </div>
    </div>
  );
}
