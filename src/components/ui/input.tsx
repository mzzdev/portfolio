import * as React from "react"

import { cn } from "@/lib/utils"

const controlStyles =
  "w-full border border-input bg-background px-3 py-2 text-sm text-foreground outline-hidden placeholder:text-muted-foreground focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(controlStyles, className)}
      {...props}
    />
  )
}

export { Input, controlStyles }
