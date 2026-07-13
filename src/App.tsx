import { useState } from "react";
import { PokedexPage } from "@/pages/PokedexPage";
import { PokemonDetailPage } from "@/pages/PokemonDetailPage";
import type { Pokemon } from "@/lib/pokeapi";

/**
 * Minimal state-based router: the Pokédex grid on the home route, and a
 * detail view once a Pokémon is selected. Real apps would use a router here.
 */
export default function App() {
  const [selected, setSelected] = useState<Pokemon | null>(null);

  if (selected) {
    return (
      <PokemonDetailPage
        idOrName={selected.id}
        onBack={() => setSelected(null)}
      />
    );
  }

  return <PokedexPage onSelectPokemon={setSelected} />;
}
