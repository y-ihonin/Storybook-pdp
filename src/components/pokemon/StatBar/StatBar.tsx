import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { MAX_STAT } from "@/lib/pokemon-format";

export interface StatBarProps {
  label: string;
  value: number;
  color?: string;
  className?: string;
}

export function StatBar({ label, value, color, className }: StatBarProps) {
  const pct = Math.min(100, Math.round((value / MAX_STAT) * 100));

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-muted-foreground w-16 shrink-0 text-xs font-medium">
        {label}
      </span>
      <span className="w-8 shrink-0 text-right text-sm font-semibold tabular-nums">
        {value}
      </span>
      <Progress
        value={pct}
        className="h-2 flex-1"
        style={
          color
            ? ({ "--primary": color } as React.CSSProperties)
            : undefined
        }
        aria-label={`${label} base stat`}
      />
    </div>
  );
}
