import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

function Badge({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(
        "inline-flex items-center border border-border bg-secondary px-2.5 py-1 text-xs text-secondary-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
