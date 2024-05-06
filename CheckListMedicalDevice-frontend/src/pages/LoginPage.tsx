import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {  NavigateFunction, useNavigate } from "react-router-dom";
import { Alert, createTheme, ThemeProvider } from "@mui/material";
import CLMD from "../assets/CLMD.png";
import Chiwa from "../assets/chiwa.png";

import { useState } from "react";
import { axiosInstance } from "../axiosRequest";
import axios from "axios";
import Bg from "../assets/Chiwas.png";
import { AuthContext } from "../contexts/AuthContext";
const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#82CAFF",
    },
  },
  typography: {
    fontFamily: ["-apple-system", "sans-serif"].join(","),
  },
});

export default function LoginPage() {
  const { saveUser } = React.useContext(AuthContext);
  const [message, setMessage] = useState<string>();

  const navigate: NavigateFunction = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if ((data.get("username")! as string).length < 4) {
      setMessage("Username must be at least 4 characters");
      setTimeout(() => setMessage(undefined), 3000);
      return;
    }
    if ((data.get("password")! as string).length < 8) {
      setMessage("Password must be at least 8 characters");
      setTimeout(() => setMessage(undefined), 3000);
      return;
    }
    try {
      const response = await axiosInstance.post<{ token: string }>(
        `/users/login`,
        {
          username: data.get("username")! as string,
          password: data.get("password")! as string,
        }
      );
      saveUser(response.data.token);
      return navigate("/home");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data.message);
        setTimeout(() => setMessage(undefined), 3000);
      }
    }
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: "100vh",
            minWidth: "100vw",
            backgroundImage: `url(${Bg})`,
          }}
        >
          {message && (
            <Alert
              severity="warning"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
            >
              {message}
            </Alert>
          )}
          <CssBaseline />
          <Box
            sx={{
              marginTop: "45vh",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
              width: "45vh",
              backdropFilter: "blur(5px)",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              borderRadius: "20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                position: "absolute",
                top: "10px",
                left: "10px",
              }}
            >
              CheckListMedicalDevice
            </Typography>
            <img
              style={{
                height: 45,
                width: "auto",
                borderRadius: 90,
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
              src={Chiwa}
              alt="logo"
            />
            <img style={{ height: 150, width: "auto" }} src={CLMD} alt="logo" />
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
              CLMD
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                sx={{ width: "30vh" }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 5, width: 180 }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
