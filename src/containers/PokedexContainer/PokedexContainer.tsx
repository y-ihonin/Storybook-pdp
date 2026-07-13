import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PokemonGrid } from "@/components/pokemon/PokemonGrid";
import { SearchBar } from "@/components/pokemon/SearchBar";
import { usePokedex } from "@/hooks/usePokedex";
import type { Pokemon } from "@/lib/pokeapi";

export interface PokedexContainerProps {
  onSelect?: (pokemon: Pokemon) => void;
  pageSize?: number;
}

export function PokedexContainer({ onSelect, pageSize }: PokedexContainerProps) {
  const { pokemon, loading, loadingMore, error, hasMore, loadMore } =
    usePokedex(pageSize);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pokemon;
    return pokemon.filter(
      (p) => p.name.includes(q) || String(p.id) === q
    );
  }, [pokemon, query]);

  return (
    <div className="flex flex-col gap-6">
      <SearchBar value={query} onChange={setQuery} className="max-w-md" />

      {error ? (
        <div
          role="alert"
          className="border-destructive/50 text-destructive flex min-h-40 flex-col items-center justify-center gap-2 rounded-xl border text-sm"
        >
          <p>Failed to load Pokémon: {error.message}</p>
        </div>
      ) : (
        <>
          <PokemonGrid
            pokemon={filtered}
            loading={loading}
            skeletonCount={pageSize ?? 12}
            onSelect={onSelect}
            emptyMessage={
              query ? `No Pokémon match "${query}".` : "No Pokémon found."
            }
          />

          {!query && hasMore && !loading && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={loadMore}
                disabled={loadingMore}
              >
                {loadingMore && <Loader2 className="animate-spin" />}
                {loadingMore ? "Loading…" : "Load more"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
