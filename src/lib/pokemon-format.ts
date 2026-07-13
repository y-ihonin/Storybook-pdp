import type { PokemonTypeName } from "@/lib/pokeapi";

/** Brand colours per Pokémon type, used for badges and card accents. */
export const TYPE_COLORS: Record<PokemonTypeName, string> = {
  normal: "#9099a1",
  fire: "#ff9c54",
  water: "#4d90d5",
  electric: "#f3d23b",
  grass: "#63bb5b",
  ice: "#74cec0",
  fighting: "#ce4069",
  poison: "#ab6ac8",
  ground: "#d97746",
  flying: "#8fa8dd",
  psychic: "#f97176",
  bug: "#90c12c",
  rock: "#c7b78b",
  ghost: "#5269ac",
  dragon: "#0a6dc4",
  dark: "#5a5366",
  steel: "#5a8ea1",
  fairy: "#ec8fe6",
};

/** Capitalise a pokemon or type name for display ("bulba-saur" -> "Bulba Saur"). */
export function titleCase(value: string): string {
  return value
    .split(/[-_\s]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/** Zero-padded pokedex number, e.g. 25 -> "#025". */
export function formatDexNumber(id: number): string {
  return `#${String(id).padStart(3, "0")}`;
}

/** Max value used to scale stat bars (a generous ceiling for base stats). */
export const MAX_STAT = 255;
