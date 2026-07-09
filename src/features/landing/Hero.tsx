import { useNavigate } from 'react-router-dom'
import logo from '@/assets/logo-icon.svg'

function Hero() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <img src={logo} alt="DevBoard" className="h-16 w-16 mb-6" />
      <h1 className="text-5xl font-semibold tracking-tight text-white max-w-xl leading-tight">
        Manage your work.
        <br />
        <span className="text-primary-500">Ship faster.</span>
      </h1>
      <p className="mt-6 text-lg text-gray-400 max-w-md">
        A minimal Kanban board built for developers. Organize tasks, track
        progress, and stay focused on what matters.
      </p>
      <div className="mt-10 flex gap-4">
        <button
          onClick={() => navigate('/auth')}
          className="bg-primary-700 hover:bg-primary-800 text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          Get Started
        </button>
        <a
          href="https://github.com/xhokcu/devboard"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-medium px-6 py-3 rounded-lg transition-colors"
        >
          View on GitHub
        </a>
      </div>
    </div>
  )
}

export default Hero
