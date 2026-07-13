import { http, HttpResponse, delay } from "msw";
import { POKEAPI_BASE, type Pokemon } from "@/lib/pokeapi";
import { mockPokemonList } from "./pokemon";

/** Rebuild a raw PokeAPI payload from a domain fixture. */
function toRaw(p: Pokemon) {
  return {
    id: p.id,
    name: p.name,
    height: Math.round(p.height * 10),
    weight: Math.round(p.weight * 10),
    base_experience: p.baseExperience,
    sprites: {
      front_default: p.image,
      other: { "official-artwork": { front_default: p.image } },
    },
    types: p.types.map((name, i) => ({
      slot: i + 1,
      type: { name, url: `${POKEAPI_BASE}/type/${name}/` },
    })),
    abilities: p.abilities.map((name, i) => ({
      ability: { name, url: `${POKEAPI_BASE}/ability/${name}/` },
      is_hidden: i === p.abilities.length - 1 && p.abilities.length > 1,
    })),
    stats: p.stats.map((s) => ({
      base_stat: s.value,
      stat: { name: s.name, url: `${POKEAPI_BASE}/stat/${s.name}/` },
    })),
  };
}

const byId = new Map(mockPokemonList.map((p) => [String(p.id), p]));
const byName = new Map(mockPokemonList.map((p) => [p.name, p]));

/** Happy-path handlers backed by the fixture set. */
export const handlers = [
  http.get(`${POKEAPI_BASE}/pokemon`, ({ request }) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get("limit") ?? "20");
    const offset = Number(url.searchParams.get("offset") ?? "0");
    const slice = mockPokemonList.slice(offset, offset + limit);

    return HttpResponse.json({
      count: mockPokemonList.length,
      next: null,
      previous: null,
      results: slice.map((p) => ({
        name: p.name,
        url: `${POKEAPI_BASE}/pokemon/${p.id}/`,
      })),
    });
  }),

  http.get(`${POKEAPI_BASE}/pokemon/:idOrName`, ({ params }) => {
    const key = String(params.idOrName);
    const match = byId.get(key) ?? byName.get(key);
    if (!match) return new HttpResponse(null, { status: 404 });

    return HttpResponse.json(toRaw(match));
  }),
];

/** A handler set that never resolves — used to freeze stories in loading. */
export const loadingHandlers = [
  http.get(`${POKEAPI_BASE}/pokemon`, async () => {
    await delay("infinite");
    return HttpResponse.json({});
  }),
  http.get(`${POKEAPI_BASE}/pokemon/:idOrName`, async () => {
    await delay("infinite");
    return HttpResponse.json({});
  }),
];

/** A handler set that fails — used to exercise error states. */
export const errorHandlers = [
  http.get(`${POKEAPI_BASE}/pokemon`, () => {
    return new HttpResponse(null, { status: 500 });
  }),
  http.get(`${POKEAPI_BASE}/pokemon/:idOrName`, () => {
    return new HttpResponse(null, { status: 500 });
  }),
];
