import {
  Box,
  TextField,
  Button,
  Avatar,
  Container,
  CssBaseline,
  Grid,
  Typography,
  

} from "@mui/material";
import  { useState } from "react";
import NavbarDashboard from "../../../components/NavDashboard";

import { axiosInstance } from "../../../axiosRequest";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IUser, roleAdmin } from "../../../interfaces/user.interface";

const validationSchema = Yup.object({
  firstName: Yup.string().required("กรุณากรอกชื่อ"),
  lastName: Yup.string().required("กรุณากรอกนามสกุล"),
  username: Yup.string().required("กรุณากรอกชื่อผู้ใช้"),
  password: Yup.string().min(8, "Must be at least 8 characters"),
  email: Yup.string().email("Invalid email address"),
  address: Yup.string().required("กรุณากรอกที่อยู่"),
  phoneNumber: Yup.string().required("กรุณากรอกเบอร์โทรศัพท์"),
});

const UserRegister = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      address: "",
      role: roleAdmin.user,
    }as IUser, 
    validationSchema: validationSchema,
    onSubmit: async (values: IUser) => {
      setIsLoading(true);
      try {
        await axiosInstance.post("/users/register/", {
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          password: values.password,
          email: values.email,
          address: values.address,
          phoneNumber: values.phoneNumber,
          role: values.role,
        });
        alert(" เพิ่มอุปกรณ์สำเร็จแล้ว!");

        setIsSubmitting(true);
        window.location.href = `/users/`;
      } catch (e: any) {
        if (axios.isAxiosError(e)) {
          alert(e?.response?.data.message);
        } else {
          console.error(e);
        }
      }
    },
  });

  return (
    <>
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
              Sign up
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
                   
                   required
                   fullWidth
                   id="firstName"
                   label="firstName"
                   name="firstName"
                   autoComplete="firstName"
                   onChange={formik.handleChange}
                   value={formik.values.firstName}
                   error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                   helperText={formik.touched.firstName && formik.errors.firstName}
                 />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="lastName"
                    name="lastName"
                    autoComplete="lastName"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </Grid>
               
                <Grid item xs={12}>
                  <TextField
                   
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
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
                    value={formik.values.password}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
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
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
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
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
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
                {isLoading ? "กำลังเพิ่ม..." : "เพิ่มผู้ใช้งาน"}
              </Button>
            </Box>
          </Box>
        </Container>
      </NavbarDashboard>
    </>
  );
};

export default UserRegister;
