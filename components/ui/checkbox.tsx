import type React from "react"
import { cn } from "@/lib/utils"

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: React.ReactNode
  error?: string | null
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className, error, ...props }) => {
  return (
    <div className="w-full">
      <label className={cn("flex cursor-pointer items-center", className)}>
        <input
          type="checkbox"
          className="h-4 w-4 cursor-pointer rounded accent-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          {...props}
        />
        <span className="ml-2 text-sm">{label}</span>
      </label>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  )
}
