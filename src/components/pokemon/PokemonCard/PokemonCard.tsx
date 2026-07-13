import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Pokemon } from "@/lib/pokeapi";
import { TYPE_COLORS, formatDexNumber, titleCase } from "@/lib/pokemon-format";
import { TypeBadge } from "../TypeBadge";

export interface PokemonCardProps {
  pokemon: Pokemon;
  onSelect?: (pokemon: Pokemon) => void;
  className?: string;
}

export function PokemonCard({ pokemon, onSelect, className }: PokemonCardProps) {
  const accent = TYPE_COLORS[pokemon.types[0]] ?? "var(--primary)";
  const interactive = Boolean(onSelect);

  return (
    <Card
      className={cn(
        "group relative overflow-hidden py-0 transition-all",
        interactive &&
          "cursor-pointer hover:-translate-y-1 hover:shadow-lg focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
        className
      )}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? () => onSelect?.(pokemon) : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect?.(pokemon);
              }
            }
          : undefined
      }
      aria-label={interactive ? `View ${titleCase(pokemon.name)}` : undefined}
    >
      <CardHeader className="relative flex items-start justify-between px-4 pt-4">
        <span className="text-muted-foreground text-sm font-semibold tabular-nums">
          {formatDexNumber(pokemon.id)}
        </span>
      </CardHeader>

      <CardContent className="relative flex items-center justify-center px-4 pb-2">
        <div
          className="absolute inset-x-6 top-2 bottom-0 rounded-full opacity-15 blur-2xl transition-opacity group-hover:opacity-30"
          style={{ backgroundColor: accent }}
          aria-hidden
        />
        {pokemon.image ? (
          <img
            src={pokemon.image}
            alt={titleCase(pokemon.name)}
            loading="lazy"
            className="relative z-10 size-32 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="bg-muted relative z-10 flex size-32 items-center justify-center rounded-full text-3xl">
            ?
          </div>
        )}
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 px-4 pb-4">
        <h3 className="text-lg leading-tight font-semibold">
          {titleCase(pokemon.name)}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
