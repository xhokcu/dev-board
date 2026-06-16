import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">DevBoard</h1>
          <p className="mt-1 text-sm text-gray-500">
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
