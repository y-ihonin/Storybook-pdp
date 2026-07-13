import type { Pokemon } from "@/lib/pokeapi";

/**
 * Hand-built domain fixtures for stories and tests. Keeping these separate
 * from the raw API mocks lets presentational stories stay network-free.
 */

const artwork = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const bulbasaur: Pokemon = {
  id: 1,
  name: "bulbasaur",
  image: artwork(1),
  types: ["grass", "poison"],
  height: 0.7,
  weight: 6.9,
  abilities: ["overgrow", "chlorophyll"],
  baseExperience: 64,
  stats: [
    { name: "hp", label: "HP", value: 45 },
    { name: "attack", label: "Atk", value: 49 },
    { name: "defense", label: "Def", value: 49 },
    { name: "special-attack", label: "Sp. Atk", value: 65 },
    { name: "special-defense", label: "Sp. Def", value: 65 },
    { name: "speed", label: "Speed", value: 45 },
  ],
};

export const charizard: Pokemon = {
  id: 6,
  name: "charizard",
  image: artwork(6),
  types: ["fire", "flying"],
  height: 1.7,
  weight: 90.5,
  abilities: ["blaze", "solar-power"],
  baseExperience: 267,
  stats: [
    { name: "hp", label: "HP", value: 78 },
    { name: "attack", label: "Atk", value: 84 },
    { name: "defense", label: "Def", value: 78 },
    { name: "special-attack", label: "Sp. Atk", value: 109 },
    { name: "special-defense", label: "Sp. Def", value: 85 },
    { name: "speed", label: "Speed", value: 100 },
  ],
};

export const pikachu: Pokemon = {
  id: 25,
  name: "pikachu",
  image: artwork(25),
  types: ["electric"],
  height: 0.4,
  weight: 6.0,
  abilities: ["static", "lightning-rod"],
  baseExperience: 112,
  stats: [
    { name: "hp", label: "HP", value: 35 },
    { name: "attack", label: "Atk", value: 55 },
    { name: "defense", label: "Def", value: 40 },
    { name: "special-attack", label: "Sp. Atk", value: 50 },
    { name: "special-defense", label: "Sp. Def", value: 50 },
    { name: "speed", label: "Speed", value: 90 },
  ],
};

export const gengar: Pokemon = {
  id: 94,
  name: "gengar",
  image: artwork(94),
  types: ["ghost", "poison"],
  height: 1.5,
  weight: 40.5,
  abilities: ["cursed-body"],
  baseExperience: 250,
  stats: [
    { name: "hp", label: "HP", value: 60 },
    { name: "attack", label: "Atk", value: 65 },
    { name: "defense", label: "Def", value: 60 },
    { name: "special-attack", label: "Sp. Atk", value: 130 },
    { name: "special-defense", label: "Sp. Def", value: 75 },
    { name: "speed", label: "Speed", value: 110 },
  ],
};

export const snorlax: Pokemon = {
  id: 143,
  name: "snorlax",
  image: artwork(143),
  types: ["normal"],
  height: 2.1,
  weight: 460.0,
  abilities: ["immunity", "thick-fat", "gluttony"],
  baseExperience: 189,
  stats: [
    { name: "hp", label: "HP", value: 160 },
    { name: "attack", label: "Atk", value: 110 },
    { name: "defense", label: "Def", value: 65 },
    { name: "special-attack", label: "Sp. Atk", value: 65 },
    { name: "special-defense", label: "Sp. Def", value: 110 },
    { name: "speed", label: "Speed", value: 30 },
  ],
};

export const mockPokemonList: Pokemon[] = [
  bulbasaur,
  charizard,
  pikachu,
  gengar,
  snorlax,
];
