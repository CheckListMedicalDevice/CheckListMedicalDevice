import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import HomePages from './pages/HomePages'
import Dashboard from './pages/Dashboard/DashboardPage'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './contexts/AuthContext'
import { Box } from '@mui/material'
import DevicePage from './pages/Dashboard/DevicePage'
import CheckList from './pages/Dashboard/ChekList'
import UserPages from './pages/Dashboard/users/UserPages'
import DashboardPage from './pages/Dashboard/DashboardPage'
import LoginPage from './pages/LoginPage'
import UserRegister from './pages/Dashboard/users/UserRegisterPage'
import UserEditPage from './pages/Dashboard/users/UserEditPage'



type Props = {}

const RouterApp = (props: Props) => {

  const {user } = useContext(AuthContext);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAuthLoaded(true);
    },500)
  },[]);

  if(!authLoaded) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontSize:"2rem",
      }}
    >
      Loading...
    </Box>
  )
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {user ? (
            <>
              <Route path="/home" element={<HomePages />} />
              <Route path="/device" element={<DevicePage />} />
              <Route path="/checklist" element={<CheckList />} />
              <Route path="/users" element={<UserPages />} />
              {user.isOwner ? (
                <>
                <Route path="/dashboard" element={<Dashboard />} /> 
                <Route path="/register" element={<UserRegister />} />
                <Route path="/edituser" element={<UserEditPage />} />

                </>
              ) : (
                undefined
              )}
            </>
          ) : (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
          {user && user.isOwner && (
            <Route path="*" element={<Navigate to="/dashboard" />} />
            
          )}
          {user && !user.isOwner && (
  <Route path="*" element={<Navigate to="/home" />} />
)}
        </Routes>
      </BrowserRouter>
    </>
  );
  
}

export default RouterApp