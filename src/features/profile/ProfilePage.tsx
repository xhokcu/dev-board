import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { updateProfile } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuthStore } from '@/store/authStore'
import Navbar from '@/components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import ChangePasswordForm from './ChangePasswordForm'

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
})

type ProfileFormData = z.infer<typeof profileSchema>

function ProfilePage() {
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const [deleting, setDeleting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    defaultValues: { name: user?.name || '' },
  })

  const currentName = watch('name')
  const isUnchanged = currentName === user?.name

  const onSubmit = async (data: ProfileFormData) => {
    if (!auth.currentUser) return
    await updateProfile(auth.currentUser, { displayName: data.name })
    setUser({ ...user!, name: data.name })
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure? This action cannot be undone.')) return
    setDeleting(true)
    try {
      await auth.currentUser?.delete()
    } catch {
      alert('Please log out and log back in before deleting your account.')
      setDeleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <button
          onClick={() => navigate('/board')}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors mb-6 flex items-center gap-1"
        >
          ← Back to Board
        </button>
        <h1 className="text-xl font-semibold text-gray-900 mb-6">Profile</h1>
        <div className="flex items-center gap-4 mb-8">
          <div className="h-14 w-14 rounded-full bg-primary-500 text-white text-lg font-semibold flex items-center justify-center">
            {user?.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              {...register('name')}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            />
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              value={user?.email}
              disabled
              className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2 text-sm text-gray-400 cursor-not-allowed"
            />
            <span className="text-xs text-gray-400">
              Email cannot be changed
            </span>
          </div>

          {success && (
            <p className="text-sm text-green-600 bg-green-50 px-4 py-2 rounded-lg">
              Profile updated successfully!
            </p>
          )}

          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || isUnchanged}
            className="bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
          <ChangePasswordForm />
          <div className="border-t border-gray-100 pt-4 mt-2">
            <p className="text-sm font-medium text-gray-700 mb-1">
              Danger Zone
            </p>
            <p className="text-xs text-gray-400 mb-3">
              Deleting your account is permanent and cannot be undone.
            </p>
            <button
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="w-full border border-red-200 text-red-500 hover:bg-red-50 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {deleting ? 'Deleting...' : 'Delete Account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
