import * as React from "react"
import NextLink from "next/link"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textLinkVariants = cva("interactive inline-flex items-center gap-1", {
  variants: {
    variant: {
      default: "hover:bg-accent hover:underline",
      subtle: "hover:underline",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function TextLink({
  className,
  variant,
  external = false,
  ...props
}: React.ComponentProps<typeof NextLink> &
  VariantProps<typeof textLinkVariants> & {
    external?: boolean
  }) {
  return (
    <NextLink
      data-slot="text-link"
      className={cn(textLinkVariants({ variant, className }))}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
    />
  )
}

export { TextLink, textLinkVariants }
