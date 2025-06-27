import type React from 'react'
import Logo from '@/components/logo'
import Link from 'next/link'
import { Card } from './ui/card'

interface AuthLayoutProps {
  children: React.ReactNode
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary p-4">
      <Card className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <Link href="/">
            <Logo size={40} />
          </Link>
        </div>
        {children}
      </Card>
    </div>
  )
}
