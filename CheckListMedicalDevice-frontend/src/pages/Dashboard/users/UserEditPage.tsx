import { useEffect, useState } from "react";
import {  useFormik } from "formik";
import * as Yup from "yup";
import {  useParams } from 'react-router-dom';
import { IUser } from "../../../interfaces/user.interface";
import NavbarDashboard from "../../../components/NavDashboard";
import { axiosInstance } from "../../../axiosRequest";
import { Container, CssBaseline, Box, Avatar, Typography, Grid, TextField, Button } from "@mui/material";

// interface FormValues {
//   firstName: string;
//   lastName: string;
//   username: string;
//   password: string;
//   email: string;
//   address: string;
//   phoneNumber: string;
// }

const UserEditPage = () => {
  const { id } = useParams();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get<IUser[]>(`/users/${id}`);
      const user = response.data[0];
      formik.setValues({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        hashPassword:user.hashPassword ?? ""
      });
    } catch (error) {
      console.log(error);
    }
    
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName:  "",
      username:  "",
      hashPassword: "",
      email:  "",
      address:  "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string(),
      lastName: Yup.string(),
      username: Yup.string(),
      hashPassword: Yup.string().min(8, "Must be at least 8 characters"),
      email: Yup.string().email("Invalid email address"),
      address: Yup.string(),
      phoneNumber: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        await axiosInstance.put(`/users/${id}`, values);
     
        alert("User updated successfully!");
    
        window.location.href = `/users/`;
      } catch (error) {
        console.log(error);
      }
      setIsSubmitting(false);
    },
  });

  return (
    <NavbarDashboard>
       <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Edit
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 3 }}
            >
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
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    
                    helperText={formik.errors.firstName}
                    onBlur={formik.handleBlur}
                    disabled={isSubmitting}


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
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                 
                    helperText={formik.errors.lastName}
                    onBlur={formik.handleBlur}
                    
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
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    
                    helperText={formik.errors.username}
                    onBlur={formik.handleBlur}
                    
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
                    onChange={formik.handleChange}
                    value={formik.values.hashPassword}
                    helperText={formik.errors.hashPassword}
                    
                    onBlur={formik.handleBlur}
                    

                    
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
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    helperText={formik.errors.email}
                    
                    onBlur={formik.handleBlur}
                   
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
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    helperText={formik.errors.address}
                    
                    onBlur={formik.handleBlur}
                   

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
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                    helperText={formik.errors.phoneNumber}
                    
                    onBlur={formik.handleBlur}
                    

                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Container>
      
    </NavbarDashboard>
  );
};

export default UserEditPage;
