import React from "react"
import { cn } from "@/lib/utils"

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  className?: string
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ children, size = 24, className, width, height, viewBox = "0 0 24 24", ...props }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={width || size}
        height={height || size}
        viewBox={viewBox}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("inline-block", className)}
        {...props}
      >
        {children}
      </svg>
    )
  },
)

Icon.displayName = "Icon"
