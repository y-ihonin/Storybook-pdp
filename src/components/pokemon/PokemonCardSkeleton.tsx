import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PokemonCardSkeleton() {
  return (
    <Card className="overflow-hidden py-0">
      <CardHeader className="px-4 pt-4">
        <Skeleton className="h-4 w-10" />
      </CardHeader>
      <CardContent className="flex items-center justify-center px-4 pb-2">
        <Skeleton className="size-32 rounded-full" />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 px-4 pb-4">
        <Skeleton className="h-5 w-24" />
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-14 rounded-md" />
          <Skeleton className="h-5 w-14 rounded-md" />
        </div>
      </CardFooter>
    </Card>
  );
}
