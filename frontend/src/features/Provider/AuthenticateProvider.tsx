import { createContext, useState } from 'react'
import authenticateApi from '~/service/api/authenticate/authenticateApi'
interface Auth {
  username: string | undefined | null
  role: string | undefined | null
  token: string | undefined | null
}

interface GlobalAuth {
  auth: Auth
  setAuth: React.Dispatch<React.SetStateAction<Auth>> | null
}

const AuthenContext = createContext<GlobalAuth>({
  auth: {
    username: null,
    role: null,
    token: null
  },
  setAuth: null
})

function AuthenProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth>(() => {
    if (authenticateApi.Auth.token) {
      return {
        username: authenticateApi.getUsername(),
        role: authenticateApi.getRole(),
        token: authenticateApi.getAccessToken()
      }
    }
    return {
      username: null,
      role: null,
      token: null
    }
  })

  return <AuthenContext.Provider value={{ auth, setAuth }}>{children}</AuthenContext.Provider>
}

export default AuthenProvider

export { AuthenContext }
