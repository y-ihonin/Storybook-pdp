import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PokemonTypeName } from "@/lib/pokeapi";
import { TYPE_COLORS, titleCase } from "@/lib/pokemon-format";

export interface TypeBadgeProps {
  type: PokemonTypeName;
  className?: string;
}

export function TypeBadge({ type, className }: TypeBadgeProps) {
  return (
    <Badge
      className={cn("border-transparent text-white shadow-sm", className)}
      style={{ backgroundColor: TYPE_COLORS[type] }}
    >
      {titleCase(type)}
    </Badge>
  );
}
