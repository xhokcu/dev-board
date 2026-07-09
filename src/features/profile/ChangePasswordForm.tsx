import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { Eye, EyeOff } from 'lucide-react'

const schema = z.object({
  currentPassword: z.string().min(6, 'Required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
})

type FormData = z.infer<typeof schema>

function ChangePasswordForm() {
  const [success, setSuccess] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    const user = auth.currentUser
    if (!user || !user.email) return

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        data.currentPassword
      )
      await reauthenticateWithCredential(user, credential)
      await updatePassword(user, data.newPassword)
      reset()
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch {
      setError('currentPassword', { message: 'Current password is incorrect' })
    }
  }

  return (
    <div className="border-t border-gray-100 pt-6 flex flex-col gap-4">
      <p className="text-sm font-medium text-gray-700">Change Password</p>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Current Password
        </label>
        <div className="relative">
          <input
            {...register('currentPassword')}
            type={showCurrent ? 'text' : 'password'}
            placeholder="••••••••"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
          />
          <button
            type="button"
            onClick={() => setShowCurrent((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600"
          >
            {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.currentPassword && (
          <span className="text-xs text-red-500">
            {errors.currentPassword.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          New Password
        </label>
        <div className="relative">
          <input
            {...register('newPassword')}
            type={showNew ? 'text' : 'password'}
            placeholder="••••••••"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
          />
          <button
            type="button"
            onClick={() => setShowNew((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600"
          >
            {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.newPassword && (
          <span className="text-xs text-red-500">
            {errors.newPassword.message}
          </span>
        )}
      </div>

      {success && (
        <p className="text-sm text-green-600 bg-green-50 px-4 py-2 rounded-lg">
          Password updated successfully!
        </p>
      )}

      <button
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className="bg-primary-700 hover:bg-primary-800 text-white py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Updating...' : 'Update Password'}
      </button>
    </div>
  )
}

export default ChangePasswordForm
