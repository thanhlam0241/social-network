//import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DefaultLayout from '~/components/Layout/DefaulltLayout/DefaultLayout'
import AuthenticateLayout from './features/Authentication/authenLayout'

import LoginForm from './features/Authentication/login/Login'
import RegisterForm from './features/Authentication/register/Register'

import MainContent from './page/main'
import ChatPage from './page/Chat/chat-page'

import RequireRoles from './features/ProtectedRoute/RequireRole'

// import { useAppSelector } from '~/hooks/storeHook'
function App() {
  //const auth = useAppSelector((state) => state.auth)

  return (
    <Router>
      <Routes>
        <Route path='/authenticate' element={<AuthenticateLayout />}>
          <Route path='login' element={<LoginForm />} />
          <Route path='register' element={<RegisterForm />} />
        </Route>

        <Route path='/' element={<DefaultLayout />}>
          <Route path='' element={<div>H</div>} />
          <Route
            path='todo'
            element={
              <RequireRoles allowedRoles={['user']}>
                <MainContent />
              </RequireRoles>
            }
          />
        </Route>
        <Route
          path='/chat'
          element={
            <RequireRoles allowedRoles={['user']}>
              <ChatPage />
            </RequireRoles>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
