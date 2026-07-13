import { useCallback, useEffect, useRef, useState } from "react";
import { fetchPokemonPage, type Pokemon } from "@/lib/pokeapi";

interface PokedexState {
  pokemon: Pokemon[];
  count: number;
  loading: boolean;
  loadingMore: boolean;
  error: Error | null;
}

const PAGE_SIZE = 12;

/**
 * Loads the pokedex page-by-page. Exposes an initial loading flag, an
 * incremental `loadMore`, and a `hasMore` computed from the total count.
 */
export function usePokedex(pageSize: number = PAGE_SIZE) {
  const [state, setState] = useState<PokedexState>({
    pokemon: [],
    count: 0,
    loading: true,
    loadingMore: false,
    error: null,
  });
  const offsetRef = useRef(0);

  const load = useCallback(
    async (append: boolean, signal?: AbortSignal) => {
      setState((s) => ({
        ...s,
        loading: append ? s.loading : true,
        loadingMore: append,
        error: null,
      }));
      try {
        const { count, pokemon } = await fetchPokemonPage(
          { limit: pageSize, offset: offsetRef.current },
          signal
        );
        if (signal?.aborted) return;
        offsetRef.current += pageSize;
        setState((s) => ({
          count,
          pokemon: append ? [...s.pokemon, ...pokemon] : pokemon,
          loading: false,
          loadingMore: false,
          error: null,
        }));
      } catch (err) {
        if (signal?.aborted || (err as Error).name === "AbortError") return;
        setState((s) => ({
          ...s,
          loading: false,
          loadingMore: false,
          error: err as Error,
        }));
      }
    },
    [pageSize]
  );

  useEffect(() => {
    const controller = new AbortController();
    offsetRef.current = 0;
    load(false, controller.signal);
    return () => controller.abort();
  }, [load]);

  const loadMore = useCallback(() => {
    if (state.loadingMore || state.loading) return;
    load(true);
  }, [load, state.loading, state.loadingMore]);

  const hasMore = state.pokemon.length < state.count;

  return { ...state, hasMore, loadMore };
}
