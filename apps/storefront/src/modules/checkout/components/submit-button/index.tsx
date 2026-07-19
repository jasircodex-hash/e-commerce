"use client"

import { Button } from "@modules/common/components/ui"
import React from "react"
import { useFormStatus } from "react-dom"

export function SubmitButton({
  children,
  variant = "primary",
  size = "medium",
  className,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | null
  size?: "small" | "medium" | "large"
  className?: string
  "data-testid"?: string
}) {
  const { pending } = useFormStatus()

  const mappedSize = size === "medium" ? "base" : size === "small" ? "small" : "large"

  return (
    <Button
      size={mappedSize}
      className={className}
      type="submit"
      isLoading={pending}
      variant={variant === "transparent" ? "ghost" : (variant || "primary") as any}
      data-testid={dataTestId}
    >
      {children}
    </Button>
  )
}
