import { Navigate, Outlet } from 'react-router-dom'
// import useAuth from '~/hooks/useAuth'

import { useAppSelector } from '~/hooks/storeHook'

export default function RequireRoles({ allowedRoles, children }: { allowedRoles: string[]; children: JSX.Element }) {
  console.log('RequireRoles')
  const auth = useAppSelector((state) => state.auth)
  console.log(auth)
  console.log(allowedRoles)
  if (!auth) return <Navigate to='/authenticate/login' />
  if (auth && auth?.role && allowedRoles.includes(auth.role)) {
    return <>{children}</>
  }
  return <Navigate to='/' />
}
