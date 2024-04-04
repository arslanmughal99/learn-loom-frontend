"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/utils/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    varient: "default" | "yellow";
  }
>(({ className, value, varient = "yellow", ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      varient === "yellow" ? "bg-yellow-400/20" : "bg-primary/20",
      "relative h-2 w-full overflow-hidden rounded-full",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        varient === "yellow" ? "bg-yellow-400" : "bg-primary",
        "h-full w-full flex- transition-all"
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
