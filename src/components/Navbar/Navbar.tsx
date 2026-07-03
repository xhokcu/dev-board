import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import logoIcon from '@/assets/logo-icon.svg'
import ProfileDropdown from '@/components/ProfileDropdown/ProfileDropdown'

function Navbar() {
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <button
        onClick={() => navigate('/board')}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <img src={logoIcon} alt="DevBoard" className="h-7 w-7" />
        <span className="font-semibold text-gray-900">
          Dev<span className="text-primary-500">Board</span>
        </span>
      </button>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">{user?.name}</span>
        <ProfileDropdown />
      </div>
    </div>
  )
}

export default Navbar
