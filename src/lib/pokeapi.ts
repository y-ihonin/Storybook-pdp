/**
 * Thin client for https://pokeapi.co/ plus a mapper that turns the raw
 * REST payloads into the tidy domain shapes our components consume.
 */

import axios from "axios";

export const POKEAPI_BASE = "https://pokeapi.co/api/v2";

/** Shared axios instance so base URL and defaults live in one place. */
export const pokeApiClient = axios.create({
  baseURL: POKEAPI_BASE,
  headers: { Accept: "application/json" },
});

export type PokemonTypeName =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

export interface PokemonStat {
  name: string;
  /** Short, display-friendly label, e.g. "HP", "Atk". */
  label: string;
  value: number;
}

/** The normalized shape the UI works with. */
export interface Pokemon {
  id: number;
  name: string;
  /** Official artwork URL, falls back to the default sprite. */
  image: string;
  types: PokemonTypeName[];
  /** Height in metres. */
  height: number;
  /** Weight in kilograms. */
  weight: number;
  abilities: string[];
  stats: PokemonStat[];
  baseExperience: number;
}

export interface PokemonListItem {
  name: string;
  id: number;
  url: string;
}

export interface PokemonListResult {
  count: number;
  next: string | null;
  previous: string | null;
  items: PokemonListItem[];
}

/* ------------------------------------------------------------------ */
/* Raw API response types (only the fields we use)                    */
/* ------------------------------------------------------------------ */

interface RawNamedResource {
  name: string;
  url: string;
}

interface RawPokemon {
  id: number;
  name: string;
  height: number; // decimetres
  weight: number; // hectograms
  base_experience: number;
  sprites: {
    front_default: string | null;
    other?: {
      "official-artwork"?: { front_default: string | null };
    };
  };
  types: { slot: number; type: RawNamedResource }[];
  abilities: { ability: RawNamedResource; is_hidden: boolean }[];
  stats: { base_stat: number; stat: RawNamedResource }[];
}

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Atk",
  defense: "Def",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

/** Pull the numeric id out of a resource URL like `.../pokemon/25/`. */
function idFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? Number(match[1]) : 0;
}

/** Convert a raw PokeAPI pokemon payload into our domain shape. */
export function mapPokemon(raw: RawPokemon): Pokemon {
  return {
    id: raw.id,
    name: raw.name,
    image:
      raw.sprites.other?.["official-artwork"]?.front_default ??
      raw.sprites.front_default ??
      "",
    types: raw.types
      .sort((a, b) => a.slot - b.slot)
      .map((t) => t.type.name as PokemonTypeName),
    height: raw.height / 10,
    weight: raw.weight / 10,
    abilities: raw.abilities.map((a) => a.ability.name),
    stats: raw.stats.map((s) => ({
      name: s.stat.name,
      label: STAT_LABELS[s.stat.name] ?? s.stat.name,
      value: s.base_stat,
    })),
    baseExperience: raw.base_experience,
  };
}

/** Fetch a single pokemon by id or name. */
export async function fetchPokemon(
  idOrName: number | string,
  signal?: AbortSignal
): Promise<Pokemon> {
  const { data } = await pokeApiClient.get<RawPokemon>(
    `/pokemon/${idOrName}`,
    { signal }
  );
  return mapPokemon(data);
}

/** Fetch a page of the pokedex, then hydrate each entry into a full Pokemon. */
export async function fetchPokemonPage(
  { limit = 20, offset = 0 }: { limit?: number; offset?: number } = {},
  signal?: AbortSignal
): Promise<{ count: number; pokemon: Pokemon[] }> {
  const { data } = await pokeApiClient.get<{
    count: number;
    results: RawNamedResource[];
  }>("/pokemon", { params: { limit, offset }, signal });

  const pokemon = await Promise.all(
    data.results.map((r) => fetchPokemon(idFromUrl(r.url), signal))
  );

  return { count: data.count, pokemon };
}

/** Fetch just the index (name + id + url) without hydrating each entry. */
export async function fetchPokemonList(
  { limit = 20, offset = 0 }: { limit?: number; offset?: number } = {},
  signal?: AbortSignal
): Promise<PokemonListResult> {
  const { data } = await pokeApiClient.get<{
    count: number;
    next: string | null;
    previous: string | null;
    results: RawNamedResource[];
  }>("/pokemon", { params: { limit, offset }, signal });

  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    items: data.results.map((r) => ({
      name: r.name,
      id: idFromUrl(r.url),
      url: r.url,
    })),
  };
}
