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
  import React, { useState } from "react";
  import NavbarDashboard from "../../../components/NavDashboard";
  import { axiosInstance } from "../../../axiosRequest";
  import { IFire } from "../../../interfaces/fire.interface";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  
  interface IFireForm {
    code: string;
    location: string;
  }
  
  const validationSchema = Yup.object({
    code: Yup.string()
      .min(3, 'กรุณากรอกอักขระ 3 ตัวขึ้นไป')
      .max(8, 'กรุณากรอกอักขระไม่เกิน 8 ตัวอักษร')
      .required('กรุณากรอกโค้ดเนม'),
    location: Yup.string()
      .min(8, 'กรุณากรอกอักขระ 8 ตัวขึ้นไป')
      .required('กรุณากรอกตำแหน่ง'),
  });
  
  const FireCreatePage = () => {
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formik = useFormik({
      initialValues: {
        code: "",
        location: "",
      } as IFireForm,
      validationSchema: validationSchema,
      onSubmit: async (values: IFireForm) => {
        setIsLoading(true);
        try {
            setIsSubmitting(true);
          await axiosInstance.post("/fireExtinguisher/createFireExtinguisher/", {
            code: values.code,
            location: values.location,
          });
          alert("fireExtinguisher create successfully!");

          window.location.href = `/fires/`;
        } catch (e) {
          console.error(e);
        }
        setIsSubmitting(true);
        setIsLoading(false);
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
                Create
              </Typography>
              <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="off"
                      name="code"
                      required
                      fullWidth
                      id="code"
                      label="Code"
                      autoFocus
                      value={formik.values.code}
                      onChange={formik.handleChange}
                      error={formik.touched.code && Boolean(formik.errors.code)}
                      helperText={formik.touched.code && formik.errors.code}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="off"
                      required
                      fullWidth
                      id="location"
                      label="Location"
                      name="location"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      error={formik.touched.location && Boolean(formik.errors.location)}
                      helperText={formik.touched.location && formik.errors.location}
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
                  {isLoading ? "Loading..." : "Create"}
                </Button>
              </Box>
            </Box>
          </Container>
        </NavbarDashboard>
      </>
    );
  };
  
  export default FireCreatePage;
  