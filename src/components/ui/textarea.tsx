import * as React from "react"

import { controlStyles } from "@/components/ui/input"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(controlStyles, "resize-none", className)}
      {...props}
    />
  )
}

export { Textarea }
