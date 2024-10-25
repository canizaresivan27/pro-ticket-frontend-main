import { useAuthStore } from '@/store'

export const useUserRole = () => {
  const user = useAuthStore((state) => state.user)

  if (user?.role?.includes('ADMIN_ROLE')) return 'admin'
  if (user?.role?.includes('USER_ROLE')) return 'user'
  if (user?.role?.includes('RESELLER_ROLE')) return 'reseller'
}
