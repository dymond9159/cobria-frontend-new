'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { FormInput } from '@/components/ui/form-input'
import { FormButton } from '@/components/ui/form-button'
import { RadioButton } from '@/components/ui/radio-button'
import { Checkbox } from '@/components/ui/checkbox'
import { api, type RegisterRequest } from '@/lib/api'
import {
  validateEmail,
  validatePassword,
  validateRequired,
  validateTerms,
  type ValidationError,
} from '@/lib/validation'

// Define the state and actions for our reducer
interface RegisterState {
  companyType: 'collection' | 'other'
  companyName: string
  username: string
  email: string
  password: string
  acceptTerms: boolean
  errors: {
    companyName: ValidationError
    username: ValidationError
    email: ValidationError
    password: ValidationError
    acceptTerms: ValidationError
    form: ValidationError
  }
  isSubmitted: boolean
  isSuccess: boolean
}

type RegisterAction =
  | { type: 'SET_COMPANY_TYPE'; payload: 'collection' | 'other' }
  | { type: 'SET_COMPANY_NAME'; payload: string }
  | { type: 'SET_USERNAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_ACCEPT_TERMS'; payload: boolean }
  | { type: 'VALIDATE_FIELD'; field: keyof Omit<RegisterState['errors'], 'form'> }
  | { type: 'VALIDATE_ALL' }
  | { type: 'SET_FORM_ERROR'; payload: string }
  | { type: 'RESET_FORM_ERROR' }
  | { type: 'SUBMIT_SUCCESS' }

const initialState: RegisterState = {
  companyType: 'collection',
  companyName: '',
  username: '',
  email: '',
  password: '',
  acceptTerms: false,
  errors: {
    companyName: null,
    username: null,
    email: null,
    password: null,
    acceptTerms: null,
    form: null,
  },
  isSubmitted: false,
  isSuccess: false,
}

function registerReducer(state: RegisterState, action: RegisterAction): RegisterState {
  switch (action.type) {
    case 'SET_COMPANY_TYPE':
      return {
        ...state,
        companyType: action.payload,
      }
    case 'SET_COMPANY_NAME':
      return {
        ...state,
        companyName: action.payload,
        errors: {
          ...state.errors,
          companyName: null,
        },
      }
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.payload,
        errors: {
          ...state.errors,
          username: null,
        },
      }
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
    case 'SET_ACCEPT_TERMS':
      return {
        ...state,
        acceptTerms: action.payload,
        errors: {
          ...state.errors,
          acceptTerms: null,
        },
      }
    case 'VALIDATE_FIELD': {
      const field = action.field
      let error = null

      switch (field) {
        case 'companyName':
          error = validateRequired(state.companyName, 'Nombre del estudio jurídico')
          break
        case 'username':
          error = validateRequired(state.username, 'Nombre de usuario')
          break
        case 'email':
          error = validateEmail(state.email)
          break
        case 'password':
          error = validatePassword(state.password)
          break
        case 'acceptTerms':
          error = validateTerms(state.acceptTerms)
          break
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
          companyName: validateRequired(state.companyName, 'Nombre del estudio jurídico'),
          username: validateRequired(state.username, 'Nombre de usuario'),
          email: validateEmail(state.email),
          password: validatePassword(state.password),
          acceptTerms: validateTerms(state.acceptTerms),
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

export default function RegisterPage() {
  const router = useRouter()
  const [state, dispatch] = React.useReducer(registerReducer, initialState)

  // Use React Query for API mutation
  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => api.register(data),
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

  const validateForm = (): boolean => {
    dispatch({ type: 'VALIDATE_ALL' })

    const hasErrors =
      !!validateRequired(state.companyName, 'Nombre del estudio jurídico') ||
      !!validateRequired(state.username, 'Nombre de usuario') ||
      !!validateEmail(state.email) ||
      !!validatePassword(state.password) ||
      !!validateTerms(state.acceptTerms)

    return !hasErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({ type: 'RESET_FORM_ERROR' })

    if (!validateForm()) return

    try {
      const response = await registerMutation.mutateAsync({
        companyType: state.companyType,
        companyName: state.companyName,
        username: state.username,
        email: state.email,
        password: state.password,
        acceptTerms: state.acceptTerms,
      })

      if (!response.success) {
        dispatch({
          type: 'SET_FORM_ERROR',
          payload: response.error || 'Ha ocurrido un error. Inténtalo de nuevo.',
        })
      }
    } catch (error) {
      console.error('Registration error:', error)
    }
  }

  // If the form was submitted successfully, show success message
  if (state.isSuccess) {
    return (
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold">¡Registro exitoso!</h1>
        <p className="mb-6 text-gray-600">
          Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.
        </p>
        <FormButton onClick={() => router.push('/auth/login')} fullWidth>
          IR A INICIAR SESIÓN
        </FormButton>
      </div>
    )
  }

  return (
    <div className="text-center">
      {state.errors.form && (
        <div className="mb-4 rounded-md bg-error/10 p-3 text-sm text-error">
          {state.errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <p className="mb-3 text-sm text-left">
            ¿Es una empresa de cobranza o realiza cobranza para distintas empresas?
          </p>
          <div className="flex gap-6">
            <RadioButton
              name="companyType"
              label="Sí"
              checked={state.companyType === 'collection'}
              onChange={() => dispatch({ type: 'SET_COMPANY_TYPE', payload: 'collection' })}
            />
            <RadioButton
              name="companyType"
              label="No"
              checked={state.companyType === 'other'}
              onChange={() => dispatch({ type: 'SET_COMPANY_TYPE', payload: 'other' })}
            />
          </div>
        </div>

        <FormInput
          id="companyName"
          placeholder="Nombre del estudio jurídico"
          value={state.companyName}
          onChange={(e) => dispatch({ type: 'SET_COMPANY_NAME', payload: e.target.value })}
          onBlur={() => dispatch({ type: 'VALIDATE_FIELD', field: 'companyName' })}
          error={state.errors.companyName}
        />

        <FormInput
          id="username"
          placeholder="Nombre de usuario"
          value={state.username}
          onChange={(e) => dispatch({ type: 'SET_USERNAME', payload: e.target.value })}
          onBlur={() => dispatch({ type: 'VALIDATE_FIELD', field: 'username' })}
          error={state.errors.username}
        />

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

        <Checkbox
          id="acceptTerms"
          label={
            <span>
              Acepto los
              <Link href="/terms" className="text-primary hover:underline">
                términos y condiciones
              </Link>
            </span>
          }
          checked={state.acceptTerms}
          onChange={(e) => dispatch({ type: 'SET_ACCEPT_TERMS', payload: e.target.checked })}
          error={state.errors.acceptTerms}
        />

        <FormButton type="submit" fullWidth isLoading={registerMutation.isPending}>
          REGISTRAR
        </FormButton>

        <div className="text-center">
          <Link href="/login" className="text-sm text-primary hover:underline">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  )
}
