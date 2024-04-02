import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePages from "./pages/HomePages";
import Dashboard from "./pages/Dashboard/DashboardPage";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Box } from "@mui/material";
import DevicePage from "./pages/Dashboard/DevicePage";
import CheckList from "./pages/Dashboard/ChekList";
import UserPages from "./pages/Dashboard/users/UserPages";
import LoginPage from "./pages/LoginPage";
import UserRegister from "./pages/Dashboard/users/UserRegisterPage";
import UserEditPage from "./pages/Dashboard/users/UserEditPage";
import FirePages from "./pages/Dashboard/fireExtingruisher/FirePages";
import FireEditPage from "./pages/Dashboard/fireExtingruisher/FIreEditPage";
import FireCreatePage from "./pages/Dashboard/fireExtingruisher/FireCreate";



type Props = {};

const RouterApp = (props: Props) => {
  const { user } = useContext(AuthContext);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAuthLoaded(true);
    }, 500);
  }, []);

  if (!authLoaded) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontSize: "2rem",
        }}
      >
        Loading...
      </Box>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          {user ? (
            <>
             {user && !user.isAdmin && (
              <>
             <Route path="/home" element={<HomePages />} />
              <Route path="*" element={<Navigate to="/home" />} />
              </>
              )}
     
              {user.isAdmin ? (
                <>
                
                
                 
                  <Route path="/device" element={<DevicePage />} />
                  <Route path="/checklist" element={<CheckList />} />
                  <Route path="/users" element={<UserPages />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/register" element={<UserRegister />} />
                  <Route path="/edituser/:id" element={<UserEditPage />} />
                  <Route path="/fires/" element={<FirePages />} />
                  <Route path="/fireEdit/:id" element={<FireEditPage />} />
                  <Route path="/firecreate" element={<FireCreatePage />} />
                  
                  
                </>
              ) : undefined}
               
            </>
          ) : (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
          {user && user.isAdmin && (
            <Route path="*" element={<Navigate to="/dashboard" />} />
          )}
     
           
         
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouterApp;
