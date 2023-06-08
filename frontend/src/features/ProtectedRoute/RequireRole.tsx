import { Navigate, Outlet } from 'react-router-dom'
// import useAuth from '~/hooks/useAuth'

import { useAppSelector } from '~/hooks/storeHook'

export default function RequireRoles({ allowedRoles, children }: { allowedRoles: string[]; children: JSX.Element }) {
  const auth = useAppSelector((state) => state.auth)
  if (!auth.username) return <Navigate to='/authenticate/login' />
  if (auth.username && auth?.role && allowedRoles.includes(auth.role)) {
    return <>{children}</>
  }
  return <Navigate to='/' />
}
