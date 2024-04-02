import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from 'react-router-dom';
import NavbarDashboard from "../../../components/NavDashboard";
import { axiosInstance } from "../../../axiosRequest";
import { Container, CssBaseline, Box, Avatar, Typography, Grid, TextField, Button } from "@mui/material";

const validationSchema = Yup.object({
  code: Yup.string()
    .min(3, 'กรุณากรอกอักขระ 3 ตัวขึ้นไป')
    .max(8, 'กรุณากรอกอักขระไม่เกิน 8 ตัวอักษร')
    .required('กรุณากรอกโค้ดเนม'),
  location: Yup.string()
    .min(8, 'กรุณากรอกอักขระ 8 ตัวขึ้นไป')
    .required('กรุณากรอกตำแหน่ง'),
});

const FireEditPage = () => {
  const { id } = useParams();
 
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get(`/fireExtinguisher/${id}`);
      const fire = response.data[0];
      formik.setValues({
        code: fire.firstName,
        location: fire.lastName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      code: "",
      location: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        await axiosInstance.put(`/fireExtinguisher/${id}`, values);
        alert("fireExtinguisher updated successfully!");
        window.location.href = `/fires/`;
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
                  name="code"
                  required
                  fullWidth
                  id="code"
                  label="Code"
                  autoFocus
                  onChange={formik.handleChange}
                  value={formik.values.code}
                  helperText={formik.touched.code && formik.errors.code}
                  onBlur={formik.handleBlur}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="location"
                  label="Location"
                  name="location"
                  autoComplete="family-name"
                  onChange={formik.handleChange}
                  value={formik.values.location}
                  helperText={formik.touched.location && formik.errors.location}
                  onBlur={formik.handleBlur}
                  disabled={isSubmitting}
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
              {isSubmitting ? "Submitting..." : "Edit"}
            </Button>
          </Box>
        </Box>
      </Container>
    </NavbarDashboard>
  );
};

export default FireEditPage;
