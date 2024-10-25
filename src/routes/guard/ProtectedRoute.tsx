import { useAuthStore } from '@/store'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const isLoggedIn = useAuthStore((state) => state.status) === 'authorized'
  const user = useAuthStore((state) => state.user)
  const userRole = user?.role || []

  const { pathname } = useLocation()

  // Verifica si el usuario está autenticado
  if (!isLoggedIn) {
    return <Navigate to={`/login?from=${pathname}`} />
  }

  // Verifica si el rol del usuario está permitido
  const isRoleAllowed = allowedRoles?.some((role) => userRole.includes(role))

  if (allowedRoles && !isRoleAllowed) {
    return <Navigate to="/unauthorized" />
  }
  return <>{children}</>
}
