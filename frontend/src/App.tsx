//import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DefaultLayout from '~/components/Layout/DefaulltLayout/DefaultLayout'
import AuthenticateLayout from './features/Authentication/authenLayout'

// Authentication module
import LoginForm from './features/Authentication/login/Login'
import RegisterForm from './features/Authentication/register/Register'

// Chat module
import ChatEmpty from './components/components/ChatComponent/ChatEmpty'
import ChatBox from '~/components/components/ChatComponent/ChatBox/Chatbox'
import ChatPage from './page/Chat/chat-page'

// Todo module
import TodoPage from './page/Todo/main'

// Profile module
import ProfilePage from './page/Profile/Profile'

//Home module
import Home from './page/Home/home'

//Friend module
import FriendPage from './page/FriendPage/FriendPage'
import Recommend from './features/Friend/Recommend/Recommend'
import FriendRequestReceive from './features/Friend/FriendRequest/FriendRequestReceive'
import FriendRequestSend from './features/Friend/FriendRequest/FriendRequestSend'
import AllFriend from './features/Friend/All/AllFriend'

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
                <FriendPage />
              </RequireRoles>
            }
          >
            <Route path='recommend' element={<Recommend />} />
            <Route path='request-receive' element={<FriendRequestReceive />} />
            <Route path='request-send' element={<FriendRequestSend />} />
            <Route path='all' element={<AllFriend />} />
          </Route>
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
