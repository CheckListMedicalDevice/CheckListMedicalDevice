import { Container, CssBaseline, Box, Avatar, Typography, Grid, TextField, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../axiosRequest';
import NavbarDashboard from '../../../components/NavDashboard';

type Props = {}

const UserEditPage = (props: Props) => {

    const [message, setMessage] = useState<string>();
  const navigate: NavigateFunction = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if ((data.get("firstName")! as string).length < 4) {
      setTimeout(() => setMessage(undefined), 3000);
      setMessage("Password must be at least 8 characters");
      return;
    }
    if ((data.get("lastName")! as string).length < 4) {
      setTimeout(() => setMessage(undefined), 3000);
      setMessage("Password must be at least 8 characters");
      return;
    }
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
    if ((data.get("email")! as string).length < 4) {
     
      setTimeout(() => setMessage(undefined), 3000);
      setMessage("Password must be at least 8 characters");
      return;
    }
    if ((data.get("address")! as string).length < 4) {
      setTimeout(() => setMessage(undefined), 3000);
      setMessage("Password must be at least 8 characters");
      return;
    }
    if ((data.get("phoneNumber")! as string).length < 4) {
      setTimeout(() => setMessage(undefined), 3000);
      setMessage("Password must be at least 8 characters");
      return;
    }
    try {
      await axiosInstance.post("/users/register/", {
        firstName: data.get("firstName")! as string,
        lastName: data.get("lastName")! as string,
        username: data.get("username")! as string,
        password: data.get("password")! as string,
        email: data.get("email")! as string,
        address: data.get("address")! as string,
        phoneNumber: data.get("phoneNumber")! as string,
      });
      toast.success('Registration successful');
      navigate("/users/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data.message);
        setTimeout(() => setMessage(undefined), 3000);
      }
      toast.error("Failed to register");
    }
  };
  return (
    <>
    <NavbarDashboard>
    
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit}  sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phoneNumber"
                label="phoneNumber"
                name="phoneNumber"
                autoComplete="phoneNumber"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="role"
                label="role"
                name="role"
                autoComplete="role"
              />
            </Grid> */}
          
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>

    </Container>

        </NavbarDashboard>
    </>
  )
}

export default UserEditPage