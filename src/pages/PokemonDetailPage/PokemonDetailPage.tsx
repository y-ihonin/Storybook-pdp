import { SiteHeader } from "@/components/layout/SiteHeader";
import { PokemonDetailContainer } from "@/containers/PokemonDetailContainer";

export interface PokemonDetailPageProps {
  idOrName: number | string;
  onBack?: () => void;
}

export function PokemonDetailPage({ idOrName, onBack }: PokemonDetailPageProps) {
  return (
    <div className="bg-background min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <PokemonDetailContainer idOrName={idOrName} onBack={onBack} />
      </main>
    </div>
  );
}
