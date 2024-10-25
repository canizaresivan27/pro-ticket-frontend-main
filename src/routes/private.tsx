import {
  CreateTicketPage,
  DashboardAdminPage,
  DashboardResellerPage,
  DashboardUserPage,
  DetailProjectsPage,
  DetailTicketPage,
  DetailUserPage,
  NotificationPage,
  OverviewPage,
  ProjectsPage,
  ResellerDetailProjectsPage,
  ResellerOverviewPage,
  ResellerProjectsPage,
  UserDetailProjectsPage,
  UserOverviewPage,
  UserProjectsPage,
  UsersPage,
} from '@/pages'

export const privateRoutes = [
  {
    path: '/admin',
    element: <DashboardAdminPage />,
    allowedRoles: ['ADMIN_ROLE'],
    children: [
      //Overview
      {
        path: 'overview',
        element: <OverviewPage />,
      },

      // projects
      {
        path: 'project/list',
        element: <ProjectsPage />,
      },
      {
        path: 'project/detail/:projectId?',
        element: <DetailProjectsPage />,
      },
      {
        path: 'ticket/detail/:ticketId',
        element: <DetailTicketPage />,
      },
      {
        path: 'ticket/create/:ticketNumber',
        element: <CreateTicketPage />,
      },

      // users
      {
        path: 'user/list',
        element: <UsersPage />,
      },
      {
        path: 'user/detail/:userId',
        element: <DetailUserPage />,
      },

      // notifications
      {
        path: 'notification',
        element: <NotificationPage />,
      },
    ],
  },

  {
    path: '/user',
    element: <DashboardUserPage />,
    allowedRoles: ['USER_ROLE'],
    children: [
      //Overview
      {
        path: 'overview',
        element: <UserOverviewPage />,
      },

      // projects
      {
        path: 'project/list',
        element: <UserProjectsPage />,
      },
      {
        path: 'project/detail/:projectId',
        element: <UserDetailProjectsPage />,
      },
      {
        path: 'ticket/detail/:ticketId',
        element: <DetailTicketPage />,
      },
      {
        path: 'ticket/create/:ticketNumber',
        element: <CreateTicketPage />,
      },

      // users
      {
        path: 'reseller/list',
        element: <UsersPage />,
      },
      {
        path: 'reseller/detail/:userId',
        element: <DetailUserPage />,
      },
    ],
  },

  {
    path: '/reseller',
    element: <DashboardResellerPage />,
    allowedRoles: ['RESELLER_ROLE'],
    children: [
      //Overview
      {
        path: 'overview',
        element: <ResellerOverviewPage />,
      },

      // projects
      {
        path: 'project/list',
        element: <ResellerProjectsPage />,
      },
      {
        path: 'project/detail/:projectId',
        element: <ResellerDetailProjectsPage />,
      },
      {
        path: 'ticket/detail/:ticketId',
        element: <DetailTicketPage />,
      },
      {
        path: 'ticket/create/:ticketNumber',
        element: <CreateTicketPage />,
      },
    ],
  },
]
