import type { Pokemon } from "@/lib/pokeapi";
import { cn } from "@/lib/utils";
import { PokemonCard } from "../PokemonCard";
import { PokemonCardSkeleton } from "../PokemonCardSkeleton";

export interface PokemonGridProps {
  pokemon: Pokemon[];
  loading?: boolean;
  skeletonCount?: number;
  onSelect?: (pokemon: Pokemon) => void;
  emptyMessage?: string;
  className?: string;
}

export function PokemonGrid({
  pokemon,
  loading = false,
  skeletonCount = 8,
  onSelect,
  emptyMessage = "No Pokémon found.",
  className,
}: PokemonGridProps) {
  const gridClass = cn(
    "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
    className
  );

  if (loading) {
    return (
      <div className={gridClass} data-testid="pokemon-grid-loading">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <PokemonCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className="text-muted-foreground flex min-h-40 items-center justify-center rounded-xl border border-dashed text-sm">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} onSelect={onSelect} />
      ))}
    </div>
  );
}
