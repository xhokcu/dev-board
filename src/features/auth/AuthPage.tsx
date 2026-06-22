import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import logo from '@/assets/logo-icon.svg'

function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 flex flex-col items-center gap-3">
          <img src={logo} alt="DevBoard" className="h-14 w-14" />
          <h1 className="text-2xl font-semibold text-gray-900">
            Dev<span className="text-primary-500">Board</span>
          </h1>
          <p className="text-sm text-gray-500">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </p>
        </div>

        {mode === 'login' ? (
          <LoginForm onSwitch={() => setMode('register')} />
        ) : (
          <RegisterForm onSwitch={() => setMode('login')} />
        )}
      </div>
    </div>
  )
}

export default AuthPage
