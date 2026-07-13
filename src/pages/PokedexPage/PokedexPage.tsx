import { SiteHeader } from "@/components/layout/SiteHeader";
import { PokedexContainer } from "@/containers/PokedexContainer";
import type { Pokemon } from "@/lib/pokeapi";

export interface PokedexPageProps {
  onSelectPokemon?: (pokemon: Pokemon) => void;
}

export function PokedexPage({ onSelectPokemon }: PokedexPageProps) {
  return (
    <div className="bg-background min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Explore the Pokédex
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Browse Pokémon from the PokeAPI. Click a card to see full stats.
          </p>
        </div>
        <PokedexContainer onSelect={onSelectPokemon} />
      </main>
    </div>
  );
}
