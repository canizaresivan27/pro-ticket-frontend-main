export interface Routes {
  path: string
  element: React.ReactNode
  allowedRoles?: string[]
  children?: Routes[]
}
