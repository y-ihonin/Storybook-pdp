import { ArrowLeft, Ruler, Weight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Pokemon } from "@/lib/pokeapi";
import { TYPE_COLORS, formatDexNumber, titleCase } from "@/lib/pokemon-format";
import { cn } from "@/lib/utils";
import { StatsPanel } from "../StatsPanel";
import { TypeBadge } from "../TypeBadge";

export interface PokemonDetailProps {
  pokemon: Pokemon;
  onBack?: () => void;
  className?: string;
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
        {icon}
        <span className="font-medium tabular-nums text-foreground">{value}</span>
      </div>
      <span className="text-muted-foreground text-xs uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}

export function PokemonDetail({ pokemon, onBack, className }: PokemonDetailProps) {
  const accent = TYPE_COLORS[pokemon.types[0]] ?? "var(--primary)";

  return (
    <div className={cn("mx-auto w-full max-w-3xl", className)}>
      {onBack && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-4 -ml-2"
        >
          <ArrowLeft /> Back to Pokédex
        </Button>
      )}

      <Card className="overflow-hidden py-0">
        <div
          className="relative flex flex-col items-center px-6 pt-8 pb-6"
          style={{
            background: `linear-gradient(160deg, ${accent}33, transparent)`,
          }}
        >
          <span className="text-muted-foreground absolute top-4 right-6 text-lg font-bold tabular-nums">
            {formatDexNumber(pokemon.id)}
          </span>
          {pokemon.image && (
            <img
              src={pokemon.image}
              alt={titleCase(pokemon.name)}
              className="size-48 object-contain drop-shadow-xl"
            />
          )}
          <h2 className="mt-2 text-3xl font-bold">{titleCase(pokemon.name)}</h2>
          <div className="mt-3 flex gap-2">
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
        </div>

        <CardContent className="pb-6">
          <div className="flex items-center justify-around py-4">
            <Fact
              icon={<Ruler className="size-4" />}
              label="Height"
              value={`${pokemon.height} m`}
            />
            <Separator orientation="vertical" className="h-10" />
            <Fact
              icon={<Weight className="size-4" />}
              label="Weight"
              value={`${pokemon.weight} kg`}
            />
            <Separator orientation="vertical" className="h-10" />
            <Fact
              icon={<span className="text-xs font-bold">XP</span>}
              label="Base Exp"
              value={String(pokemon.baseExperience)}
            />
          </div>

          <Tabs defaultValue="stats" className="mt-2">
            <TabsList className="w-full">
              <TabsTrigger value="stats" className="flex-1">
                Base Stats
              </TabsTrigger>
              <TabsTrigger value="about" className="flex-1">
                About
              </TabsTrigger>
            </TabsList>
            <TabsContent value="stats" className="pt-4">
              <StatsPanel stats={pokemon.stats} accentType={pokemon.types[0]} />
            </TabsContent>
            <TabsContent value="about" className="pt-4">
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
                <dt className="text-muted-foreground font-medium">Abilities</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {pokemon.abilities.map((a) => (
                    <span
                      key={a}
                      className="bg-secondary rounded-md px-2 py-0.5 text-xs font-medium"
                    >
                      {titleCase(a)}
                    </span>
                  ))}
                </dd>
                <dt className="text-muted-foreground font-medium">Types</dt>
                <dd>{pokemon.types.map(titleCase).join(", ")}</dd>
              </dl>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
