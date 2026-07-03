import { createBrowserRouter, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import AuthPage from '@/features/auth/AuthPage'
import LandingPage from '@/features/landing/LandingPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return !isAuthenticated ? <>{children}</> : <Navigate to="/board" replace />
}

export { ProtectedRoute, PublicRoute }

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/auth',
    element: (
      <PublicRoute>
        <AuthPage />
      </PublicRoute>
    ),
  },
  {
    path: '/board',
    element: (
      <ProtectedRoute>
        <div className="p-8 text-2xl font-bold">Board coming soon...</div>
      </ProtectedRoute>
    ),
  },
])
