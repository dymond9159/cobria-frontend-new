"use client"

import React, { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string | null
  showPasswordToggle?: boolean
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, error, type = "text", showPasswordToggle = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const inputType = showPassword ? "text" : type

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={props.id} className="mb-1 block text-sm font-medium">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={cn(
              "w-full rounded-md border bg-gray-50 p-3 text-sm outline-none transition-colors",
              error ? "border-error focus:border-error" : "border-gray-200 focus:border-primary",
              className,
            )}
            {...props}
          />
          {showPasswordToggle && type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-error">{error}</p>}
      </div>
    )
  },
)

FormInput.displayName = "FormInput"
