import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePages from "./pages/Users/HomePages";
import Dashboard from "./pages/Dashboard/DashboardPage";
import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import DevicePage from "./pages/Dashboard/DevicePage";

import UserPages from "./pages/Dashboard/users/UserPages";
import LoginPage from "./pages/LoginPage";
import UserRegister from "./pages/Dashboard/users/UserRegisterPage";
import UserEditPage from "./pages/Dashboard/users/UserEditPage";
import FirePages from "./pages/Dashboard/fireExtingruisher/FirePages";
import FireEditPage from "./pages/Dashboard/fireExtingruisher/FIreEditPage";
import FireCreatePage from "./pages/Dashboard/fireExtingruisher/FireCreate";
import { AuthContext } from "../contexts/AuthContext";
import { roleAdmin } from "./interfaces/user.interface";


import MapFire from "./pages/Users/MapFire";
import CheckDevice from "./pages/Users/CheckDevice";
import CheckFireExtingruisher from "./pages/Users/CheckFireExtingruisher";
import StockTools from "./pages/Dashboard/stockItem/StockTools";
import AddTools from "./pages/Dashboard/stockItem/AddTools";
import EditTools from "./pages/Dashboard/stockItem/EditTools";
import CheckStatusFire from "./pages/Users/CheckStatusFire";




 


const RouterApp = () => {
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
              {user && user.role === roleAdmin.user && (
                <>
                  <Route path="/home" element={<HomePages />} />
                  <Route path="*" element={<Navigate to="/home" />} />
                  <Route path="/checkdevice" element={<CheckDevice />} />
                  <Route path="/checkfireextingruisher" element={<CheckFireExtingruisher />} />
                  <Route path="/mapFire" element={<MapFire />} />
                  <Route path="/checkstatusfire/:id" element={<CheckStatusFire />} />
                
                

                </>
              )}

              {user.role === roleAdmin.admin ? (
                <>
                  <Route path="/device" element={<DevicePage />} />
                  <Route path="/users" element={<UserPages />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/register" element={<UserRegister />} />
                  <Route path="/edituser/:id" element={<UserEditPage />} />
                  <Route path="/fires/" element={<FirePages />} />
                  <Route path="/fireEdit/:id" element={<FireEditPage />} />
                  <Route path="/firecreate" element={<FireCreatePage />} />
                  <Route path="/stocktools" element={<StockTools />} />
                  <Route path="/addtools" element={<AddTools />} />
                  <Route path="/edittools/:id" element={<EditTools />} />

                  
                </>
              ) : undefined}

            </>
          ) : (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
          {user && user.role === roleAdmin.admin && (
            <Route path="*" element={<Navigate to="/dashboard" />} />
          )}



        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouterApp;
