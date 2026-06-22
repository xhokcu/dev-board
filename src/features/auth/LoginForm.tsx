import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from './authSchemas'
import { useAuthStore } from '@/store/authStore'

interface ILoginFormProps {
  onSwitch: () => void
}

function LoginForm({ onSwitch }: ILoginFormProps) {
  const login = useAuthStore((s) => s.login)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })

  const onSubmit = (data: LoginFormData) => {
    const success = login(data.email, data.password)
    if (!success) {
      setError('email', { message: 'Invalid email or password' })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          {...register('email')}
          type="email"
          placeholder="you@example.com"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
        />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message} </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Password</label>
        <input
          {...register('password')}
          type="password"
          placeholder="••••••••"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
        />
        {errors.password && (
          <span className="text-xs text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>
      <button
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className="rounded-lg bg-primary-600 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
      >
        Sign In
      </button>
      <p className="text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <button
          onClick={onSwitch}
          className="font-medium text-primary-500 hover:underline"
        >
          Register
        </button>
      </p>
    </div>
  )
}

export default LoginForm
