import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PokemonDetail } from "@/components/pokemon/PokemonDetail";
import { usePokemon } from "@/hooks/usePokemon";

export interface PokemonDetailContainerProps {
  idOrName: number | string;
  onBack?: () => void;
}

function DetailSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <Card className="overflow-hidden">
        <CardHeader className="items-center gap-3 pt-8">
          <Skeleton className="size-48 rounded-full" />
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-5 w-28" />
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function PokemonDetailContainer({
  idOrName,
  onBack,
}: PokemonDetailContainerProps) {
  const { pokemon, loading, error } = usePokemon(idOrName);

  if (loading) return <DetailSkeleton />;

  if (error || !pokemon) {
    return (
      <div className="mx-auto w-full max-w-3xl">
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack} className="mb-4 -ml-2">
            <ArrowLeft /> Back to Pokédex
          </Button>
        )}
        <div
          role="alert"
          className="border-destructive/50 text-destructive flex min-h-40 items-center justify-center rounded-xl border text-sm"
        >
          Could not load Pokémon “{idOrName}”.
        </div>
      </div>
    );
  }

  return <PokemonDetail pokemon={pokemon} onBack={onBack} />;
}
