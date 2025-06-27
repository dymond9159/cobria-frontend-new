import React from "react"
import { Icon, type IconProps } from "@/components/ui/icon"

export const CobriaHandIcon = React.forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  return (
    <Icon ref={ref} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      {/* Hand/flower stylized icon paths */}
      <path d="M10.5 20C12.5 15 17 13 20 15C23 17 23 21 20 23C17 25 12.5 23 10.5 20Z" strokeLinecap="round" />
      <path d="M15 12C18 10 22 11 24 14C26 17 25 21 22 23" strokeLinecap="round" />
      <path d="M25 10C28 11 30 15 29 19C28 23 24 25 20 24" strokeLinecap="round" />
      <path d="M8 24C7 21 8 17 11 15" strokeLinecap="round" />
      <path d="M30 22C31 19 30 15 27 13" strokeLinecap="round" />
    </Icon>
  )
})

CobriaHandIcon.displayName = "CobriaHandIcon"
