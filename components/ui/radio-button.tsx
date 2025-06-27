import type React from "react"
import { cn } from "@/lib/utils"

interface RadioButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string
}

export const RadioButton: React.FC<RadioButtonProps> = ({ label, className, ...props }) => {
  return (
    <label className={cn("flex cursor-pointer items-center", className)}>
      <input
        type="radio"
        className="h-4 w-4 cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        {...props}
      />
      <span className="ml-2 text-sm">{label}</span>
    </label>
  )
}
