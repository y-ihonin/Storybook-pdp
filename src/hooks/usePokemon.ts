import { useEffect, useState } from "react";
import { fetchPokemon, type Pokemon } from "@/lib/pokeapi";

interface PokemonState {
  pokemon: Pokemon | null;
  loading: boolean;
  error: Error | null;
  /** The target this state describes, used to reset on change. */
  target: number | string;
}

/** Fetches a single Pokémon by id or name, re-running when it changes. */
export function usePokemon(idOrName: number | string) {
  const [state, setState] = useState<PokemonState>({
    pokemon: null,
    loading: true,
    error: null,
    target: idOrName,
  });

  // Reset during render when the target changes — the sanctioned React pattern
  // for adjusting state on a prop change (no cascading effect setState).
  if (state.target !== idOrName) {
    setState({ pokemon: null, loading: true, error: null, target: idOrName });
  }

  useEffect(() => {
    const controller = new AbortController();

    fetchPokemon(idOrName, controller.signal)
      .then((pokemon) => {
        if (controller.signal.aborted) return;
        setState({ pokemon, loading: false, error: null, target: idOrName });
      })
      .catch((err: Error) => {
        if (controller.signal.aborted || err.name === "AbortError") return;
        setState({ pokemon: null, loading: false, error: err, target: idOrName });
      });

    return () => controller.abort();
  }, [idOrName]);

  return { pokemon: state.pokemon, loading: state.loading, error: state.error };
}
