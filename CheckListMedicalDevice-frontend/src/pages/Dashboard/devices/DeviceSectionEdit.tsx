import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from 'react-router-dom';
import { Container, CssBaseline, Box, Typography, Grid, TextField, Button } from "@mui/material";

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { axiosInstance } from "../../../axiosRequest";

import { IDeviceSection } from "../../../interfaces/devicesection.interface";

const DeviceSectionEdit = () => {
  const { id } = useParams();


  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchDeviceSectionData();
  }, [id]);

  const fetchDeviceSectionData = async () => {
    try {
      const response = await axiosInstance.get<IDeviceSection>(`/deviceSections/${id}`);
      const device = response.data;
      formik.setValues({
        sectionName: device.sectionName,
        ability: device.ability,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
        sectionName: "",
        ability: "",
    },
    validationSchema: Yup.object({
        sectionName: Yup.string(),
        ability: Yup.string(),
  
    }),
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        await axiosInstance.put(`/devicesections/${id}`, values);
        alert("แก้ไขอุปกรณ์สำเร็จแล้ว");
        window.location.href = `/devicesection/`;
      } catch (error) {
        console.log(error);

      }

      setIsSubmitting(false);
    },
  });

  return (

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

          <AutoFixHighIcon />

          <Typography component="h1" variant="h5">
            แก้ไขชื่อและจำนวนของอุปกรณ์
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="sectionName"
                  required
                  fullWidth
                  id="sectionName"
                  label="ชื่อชิ้นส่วน"
                  autoFocus
                  onChange={formik.handleChange}
                  value={formik.values.sectionName}
                  helperText={formik.errors.sectionName}
                  onBlur={formik.handleBlur}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="ability"
                  label="ความสามารถ"
                  name="ability"
                  onChange={formik.handleChange}
                  value={formik.values.ability}
                  helperText={formik.errors.ability}
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
              {isSubmitting ? "กำลังแก้ไข..." : "แก้ไข"}
            </Button>
          </Box>
        </Box>
      </Container>

  );
};

export default DeviceSectionEdit;
