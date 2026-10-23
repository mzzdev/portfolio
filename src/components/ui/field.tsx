import * as React from "react"

import { cn } from "@/lib/utils"

function Field({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="field" className={cn("grid gap-1", className)} {...props} />
  )
}

function FieldError({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-error"
      className={cn("min-h-[1.5em] text-xs text-destructive", className)}
      {...props}
    />
  )
}

export { Field, FieldError }
