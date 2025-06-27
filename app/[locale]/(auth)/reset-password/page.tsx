'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { FormInput } from '@/components/ui/form-input'
import { FormButton } from '@/components/ui/form-button'
import { api, type ResetPasswordRequest } from '@/lib/api'
import { validateEmail, type ValidationError } from '@/lib/validation'

// Define the state and actions for our reducer
interface ResetPasswordState {
  email: string
  errors: {
    email: ValidationError
    form: ValidationError
  }
  isSubmitted: boolean
  isSuccess: boolean
}

type ResetPasswordAction =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'VALIDATE' }
  | { type: 'SET_FORM_ERROR'; payload: string }
  | { type: 'RESET_FORM_ERROR' }
  | { type: 'SUBMIT_SUCCESS' }

const initialState: ResetPasswordState = {
  email: '',
  errors: {
    email: null,
    form: null,
  },
  isSubmitted: false,
  isSuccess: false,
}

function resetPasswordReducer(
  state: ResetPasswordState,
  action: ResetPasswordAction
): ResetPasswordState {
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
    case 'VALIDATE':
      return {
        ...state,
        errors: {
          ...state.errors,
          email: validateEmail(state.email),
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
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        isSubmitted: true,
        isSuccess: true,
      }
    default:
      return state
  }
}

export default function ResetPasswordPage() {
  const router = useRouter()
  const [state, dispatch] = React.useReducer(resetPasswordReducer, initialState)

  // Use React Query for API mutation
  const resetPasswordMutation = useMutation({
    mutationFn: (data: ResetPasswordRequest) => api.resetPassword(data),
    onSuccess: () => {
      dispatch({ type: 'SUBMIT_SUCCESS' })
    },
    onError: (error: any) => {
      dispatch({
        type: 'SET_FORM_ERROR',
        payload: error.message || 'Ha ocurrido un error. Inténtalo de nuevo.',
      })
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({ type: 'VALIDATE' })
    dispatch({ type: 'RESET_FORM_ERROR' })

    const emailError = validateEmail(state.email)
    if (emailError) return

    try {
      const response = await resetPasswordMutation.mutateAsync({ email: state.email })

      if (!response.success) {
        dispatch({
          type: 'SET_FORM_ERROR',
          payload: response.error || 'Ha ocurrido un error. Inténtalo de nuevo.',
        })
      }
    } catch (error) {
      console.error('Reset password error:', error)
    }
  }

  // If the form was submitted successfully, show success message
  if (state.isSuccess) {
    return (
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold">Revisa tu correo</h1>
        <p className="mb-6 text-gray-600">
          Hemos enviado un enlace para restablecer tu contraseña a {state.email}
        </p>
        <p className="text-sm text-gray-500">
          ¿No recibiste el correo?{' '}
          <button
            onClick={() => resetPasswordMutation.mutate({ email: state.email })}
            className="text-primary hover:underline"
            disabled={resetPasswordMutation.isPending}
          >
            Enviar de nuevo
          </button>
        </p>
        <div className="mt-6">
          <Link href="/auth/login" className="text-sm text-primary hover:underline">
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center">
      <h1 className="mb-2 text-2xl font-bold">¿Olvidaste tu contraseña?</h1>
      <p className="mb-6 text-gray-600">
        ¿Recuerdas tu contraseña?{' '}
        <Link href="/login" className="text-primary hover:underline">
          Inicia sesión
        </Link>
      </p>

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
          onBlur={() => dispatch({ type: 'VALIDATE' })}
          error={state.errors.email}
          aria-label="Email"
        />

        <FormButton type="submit" fullWidth isLoading={resetPasswordMutation.isPending}>
          CAMBIAR CONTRASEÑA
        </FormButton>
      </form>
    </div>
  )
}
