//import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DefaultLayout from '~/components/Layout/DefaulltLayout/DefaultLayout'
import AuthenticateLayout from './features/Authentication/authenLayout'

import LoginForm from './features/Authentication/login/Login'
import RegisterForm from './features/Authentication/register/Register'

import ChatEmpty from './components/components/ChatComponent/ChatEmpty'
import ChatBox from '~/components/components/ChatComponent/ChatBox/Chatbox'

import TodoPage from './page/Todo/main'
import ChatPage from './page/Chat/chat-page'
import ProfilePage from './page/Profile/Profile'
import Home from './page/Home/home'
import Friend from './page/Friend/index'

import PostPage from './page/PostPage/PostPage'

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
          <Route
            path=''
            element={
              <RequireRoles allowedRoles={['user']}>
                <Home />
              </RequireRoles>
            }
          />
          <Route
            path='friends'
            element={
              <RequireRoles allowedRoles={['user']}>
                <Friend />
              </RequireRoles>
            }
          />
          <Route
            path='todo'
            element={
              <RequireRoles allowedRoles={['user']}>
                <TodoPage />
              </RequireRoles>
            }
          />
          <Route path='profile' element={<ProfilePage />} />
        </Route>

        <Route
          path='/chat'
          element={
            <RequireRoles allowedRoles={['user']}>
              <ChatPage />
            </RequireRoles>
          }
        >
          <Route path='' element={<ChatEmpty />} />
          <Route path=':id' element={<ChatBox />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
