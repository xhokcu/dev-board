import { useAuthStore } from '@/store/authStore'
import logoIcon from '@/assets/logo-icon.svg'

function Navbar() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={logoIcon} alt="DevBoard" className="h-7 w-7" />
        <span className="font-semibold text-gray-900">
          Dev<span className="text-primary-500">Board</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">{user?.name}</span>
        <button
          onClick={logout}
          className="text-sm border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
