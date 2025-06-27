// Simulated API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export interface ResetPasswordRequest {
  email: string
}

export interface RegisterRequest {
  companyType: "collection" | "other"
  companyName: string
  username: string
  email: string
  password: string
  acceptTerms: boolean
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export const api = {
  resetPassword: async (data: ResetPasswordRequest): Promise<ApiResponse<null>> => {
    await delay(1000) // Simulate API delay

    // Simulate validation error for specific test email
    if (data.email === "error@example.com") {
      return {
        success: false,
        error: "No se encontró una cuenta con este email",
      }
    }

    // Success case
    return {
      success: true,
      data: null,
    }
  },

  register: async (data: RegisterRequest): Promise<ApiResponse<{ userId: string }>> => {
    await delay(1500) // Simulate API delay

    // Simulate validation error for specific test email
    if (data.email === "existing@example.com") {
      return {
        success: false,
        error: "Este email ya está registrado",
      }
    }

    // Success case
    return {
      success: true,
      data: {
        userId: "user_" + Math.random().toString(36).substr(2, 9),
      },
    }
  },
}
