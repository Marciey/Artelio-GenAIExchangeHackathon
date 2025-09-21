import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value = 0, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary/40 backdrop-blur-sm",
      "border border-secondary/50 shadow-inner",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full flex-1 transition-all duration-500 ease-out",
        "bg-gradient-to-r from-primary to-purple-500 shadow-[0_0_12px_rgba(99,102,241,0.35)]"
      )}
      style={{ transform: `translateX(-${100 - value}%)` }}
    />
    {/* optional floating text */}
    <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-foreground/80">
      {Math.round(value)}%
    </span>
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
