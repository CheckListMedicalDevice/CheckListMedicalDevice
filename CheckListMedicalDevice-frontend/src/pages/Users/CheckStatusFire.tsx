import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { axiosInstance } from "../../axiosRequest";
import NavbarDashboard from "../../components/NavDashboard";
import { IFireTransectionStatusActive } from "../../interfaces/fire_transection.interface";

const CheckStatusFire = () => {
  const { id } = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchFireData();
  }, [id]);

  const fetchFireData = async () => {
    try {
      const response = await axiosInstance.get(`/transection/${id}`);
      const bill = response.data;
      formik.setValues({
        note: bill.note,
        statusActive: bill.statusActive,
        status: bill.status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      note: "",
      statusActive: "",
      status: 1,
    },
    validationSchema: Yup.object({
      note: Yup.string().required("Please provide a note"), 
      statusActive: Yup.number().oneOf([
        IFireTransectionStatusActive.INACTIVE,
        IFireTransectionStatusActive.ACTIVE
      ]).required("Please select a status"),
    }),
    
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        
        await axiosInstance.put(`/transection/${id}`, {
          ...values,
          status: 1, 
        });
        alert("fireExtinguisher checked successfully!");
        window.location.href = "/checkfireextingruisher/";
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
            Checker
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
                  name="note"
                  required
                  fullWidth
                  id="note"
                  label="หมายเหตุ"
                  autoFocus
                  onChange={formik.handleChange}
                  value={formik.values.note}
                  helperText={formik.errors.note}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  required
                  fullWidth
                  id="statusActive"
                  label="สถานะถัง"
                  name="statusActive" // Corrected
                  value={formik.values.statusActive}
                  onChange={(event) => {
                    const selectedValue = event.target.value;
                    formik.setFieldValue("statusActive", selectedValue); // Corrected
                  }}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value={IFireTransectionStatusActive.INACTIVE}>
                    ผิดปกติ
                  </MenuItem>
                  <MenuItem value={IFireTransectionStatusActive.ACTIVE}>
                    ปกติ
                  </MenuItem>
                </Select>
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

export default CheckStatusFire;
