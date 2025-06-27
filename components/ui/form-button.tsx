import type React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  variant?: "primary" | "secondary" | "outline"
  fullWidth?: boolean
}

export const FormButton: React.FC<FormButtonProps> = ({
  children,
  className,
  isLoading = false,
  variant = "primary",
  fullWidth = false,
  disabled,
  ...props
}) => {
  const baseStyles = "rounded-md px-4 py-3 text-sm font-medium transition-colors focus:outline-none"

  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    outline: "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50",
  }

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        fullWidth ? "w-full" : "",
        isLoading && "opacity-70 cursor-not-allowed",
        className,
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  )
}
