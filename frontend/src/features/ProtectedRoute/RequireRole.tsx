import { Navigate } from 'react-router-dom'
import useAuth from '~/hooks/useAuth'

export default function ReuireRoles({ allowedRoles, child }: { allowedRoles: string[]; child: React.ReactNode }) {
  const { auth } = useAuth()
  if (!auth) return <Navigate to='/authenticate/login' />
  if (auth?.role && allowedRoles.includes(auth.role)) {
    return <>{child}</>
  }
  return <Navigate to='/' />
}
