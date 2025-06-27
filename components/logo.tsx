import type React from 'react'
import { cn } from '@/lib/utils'
import { CobriaHandIcon } from '@/components/icons/cobria-hand-icon'
import { CobriaLogoIcon } from './icons'

export interface LogoProps {
  size?: number | string
  className?: string
  iconClassName?: string
  textClassName?: string
  textOnly?: boolean
  iconOnly?: boolean
}

export const Logo: React.FC<LogoProps> = ({
  size = 80,
  className,
  iconClassName,
  textClassName,
  textOnly = false,
  iconOnly = false,
}) => {
  // Calculate text size based on icon size
  const fontSize = typeof size === 'number' ? `${size * 0.8}px` : size

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {!textOnly && <CobriaLogoIcon size={size} className={cn('text-primary', iconClassName)} />}
      {!iconOnly && (
        <span
          className={cn('font-bold tracking-wider text-primary', textClassName)}
          style={{ fontSize }}
        >
          COBRIA
        </span>
      )}
    </div>
  )
}

export default Logo
