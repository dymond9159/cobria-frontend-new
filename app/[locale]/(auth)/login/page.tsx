'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FormInput } from '@/components/ui/form-input'
import { FormButton } from '@/components/ui/form-button'
import { Checkbox } from '@/components/ui/checkbox'
import { validateEmail, validateRequired, type ValidationError } from '@/lib/validation'

// Define the state and actions for our reducer
interface LoginState {
  email: string
  password: string
  rememberMe: boolean
  errors: {
    email: ValidationError
    password: ValidationError
    form: ValidationError
  }
}

type LoginAction =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_REMEMBER_ME'; payload: boolean }
  | { type: 'VALIDATE_FIELD'; field: 'email' | 'password' }
  | { type: 'VALIDATE_ALL' }
  | { type: 'SET_FORM_ERROR'; payload: string }
  | { type: 'RESET_FORM_ERROR' }

const initialState: LoginState = {
  email: '',
  password: '',
  rememberMe: false,
  errors: {
    email: null,
    password: null,
    form: null,
  },
}

function loginReducer(state: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload,
        errors: {
          ...state.errors,
          email: null,
        },
      }
    case 'SET_PASSWORD':
      return {
        ...state,
        password: action.payload,
        errors: {
          ...state.errors,
          password: null,
        },
      }
    case 'SET_REMEMBER_ME':
      return {
        ...state,
        rememberMe: action.payload,
      }
    case 'VALIDATE_FIELD': {
      const field = action.field
      let error = null

      if (field === 'email') {
        error = validateEmail(state.email)
      } else if (field === 'password') {
        error = validateRequired(state.password, 'Contraseña')
      }

      return {
        ...state,
        errors: {
          ...state.errors,
          [field]: error,
        },
      }
    }
    case 'VALIDATE_ALL':
      return {
        ...state,
        errors: {
          ...state.errors,
          email: validateEmail(state.email),
          password: validateRequired(state.password, 'Contraseña'),
        },
      }
    case 'SET_FORM_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          form: action.payload,
        },
      }
    case 'RESET_FORM_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          form: null,
        },
      }
    default:
      return state
  }
}

export default function LoginPage() {
  const router = useRouter()
  const [state, dispatch] = React.useReducer(loginReducer, initialState)
  const [isLoading, setIsLoading] = React.useState(false)

  const validateForm = (): boolean => {
    dispatch({ type: 'VALIDATE_ALL' })

    const hasErrors =
      !!validateEmail(state.email) || !!validateRequired(state.password, 'Contraseña')

    return !hasErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({ type: 'RESET_FORM_ERROR' })

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, we'll just redirect to the dashboard
      // In a real app, you would authenticate with your API
      router.push('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      dispatch({
        type: 'SET_FORM_ERROR',
        payload: 'Credenciales inválidas. Por favor, inténtalo de nuevo.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="text-center">
      <h1 className="mb-6 text-2xl font-bold">Iniciar sesión</h1>

      {state.errors.form && (
        <div className="mb-4 rounded-md bg-error/10 p-3 text-sm text-error">
          {state.errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          id="email"
          type="email"
          placeholder="Email"
          value={state.email}
          onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
          onBlur={() => dispatch({ type: 'VALIDATE_FIELD', field: 'email' })}
          error={state.errors.email}
        />

        <FormInput
          id="password"
          type="password"
          placeholder="Contraseña"
          value={state.password}
          onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
          onBlur={() => dispatch({ type: 'VALIDATE_FIELD', field: 'password' })}
          error={state.errors.password}
          showPasswordToggle
        />

        <div className="flex items-center justify-between">
          <Checkbox
            id="rememberMe"
            label="Recordar me"
            checked={state.rememberMe}
            onChange={(e) => dispatch({ type: 'SET_REMEMBER_ME', payload: e.target.checked })}
          />

          <Link href="/reset-password" className="text-sm text-primary hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <FormButton type="submit" fullWidth isLoading={isLoading}>
          INICIAR SESIÓN
        </FormButton>

        <div className="text-center">
          <Link href="/register" className="text-sm text-primary hover:underline">
            ¿No tienes una cuenta? Regístrate
          </Link>
        </div>
      </form>
    </div>
  )
}
