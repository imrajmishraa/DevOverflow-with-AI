import * as React from "react"
import { cn } from "@/lib/utils"

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-indigo-500 border-t-transparent",
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}
