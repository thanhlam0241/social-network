import { useContext } from 'react'
import { AuthenContext } from '~/features/Provider/AuthenticateProvider'

function useAuth() {
  return useContext(AuthenContext)
}

export default useAuth
