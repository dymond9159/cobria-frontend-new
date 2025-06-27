export type ValidationError = string | null

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, ValidationError>
}

export const validateEmail = (email: string): ValidationError => {
  if (!email) return "Email es requerido"
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return "Email no es válido"
  return null
}

export const validatePassword = (password: string): ValidationError => {
  if (!password) return "Contraseña es requerida"
  if (password.length < 8) return "Contraseña debe tener al menos 8 caracteres"
  return null
}

export const validateRequired = (value: string, fieldName: string): ValidationError => {
  if (!value) return `${fieldName} es requerido`
  return null
}

export const validateTerms = (accepted: boolean): ValidationError => {
  if (!accepted) return "Debes aceptar los términos y condiciones"
  return null
}
