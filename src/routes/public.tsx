import { BuyerTicketPage, HomePage, LoginPage, UnauthorizedPage } from '@/pages'

export const publicRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/your-ticket/:ticketId',
    element: <BuyerTicketPage />,
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
  },
]
