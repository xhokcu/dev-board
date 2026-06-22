import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormData } from './authSchemas'
import { useAuthStore } from '@/store/authStore'

interface IRegisterFormProps {
  onSwitch: () => void
}

function RegisterForm({ onSwitch }: IRegisterFormProps) {
  const register_ = useAuthStore((s) => s.register)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data: RegisterFormData) => {
    const success = register_(data.name, data.email, data.password)
    if (!success) {
      setError('email', { message: 'Email already exists' })
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Name</label>
        <input
          {...register('name')}
          type="text"
          placeholder="John Doe"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
        />
        {errors.name && (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          {...register('email')}
          type="email"
          placeholder="you@example.com"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
        />
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
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
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          {...register('confirmPassword')}
          type="password"
          placeholder="••••••••"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
        />
        {errors.confirmPassword && (
          <span className="text-xs text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <button
        onClick={handleSubmit(onSubmit)}
        className="rounded-lg bg-primary-600 py-2 text-sm font-semibold text-white hover:bg-primary-700"
      >
        Create Account
      </button>
      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <button
          onClick={onSwitch}
          className="font-medium text-primary-500 hover:underline"
        >
          Sign In
        </button>
      </p>
    </div>
  )
}
export default RegisterForm
