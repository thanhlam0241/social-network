import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import GlobalStyles from './components/GlobalStyles/GlobalStyles'
import AuthenProvider from './features/Provider/AuthenticateProvider'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalStyles>
    <AuthenProvider>
      <App />
    </AuthenProvider>
  </GlobalStyles>
)
