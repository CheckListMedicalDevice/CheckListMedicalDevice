import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from 'react-router-dom';
import { Container, CssBaseline, Box, Typography, Grid, TextField, Button } from "@mui/material";

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { axiosInstance } from "../../../axiosRequest";
import { IDevice } from "../../../interfaces/device.interface";

const DeviceEdit = () => {
  const { id } = useParams();


  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchFireData();
  }, [id]);

  const fetchFireData = async () => {
    try {
      const response = await axiosInstance.get<IDevice>(`/device/${id}`);
      const device = response.data;
      formik.setValues({
        name: device.name,
        machineType: device.machineType,
        note: device.note,
        location: device.location,
        code: device.code,

      });
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      machineType: "",
      note: "",
      location: "",
      code: "",
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      note: Yup.string(),
      machineType: Yup.string(),
      location: Yup.string(),
      code: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        await axiosInstance.put(`/device/${id}`, values);
        alert("แก้ไขอุปกรณ์สำเร็จแล้ว");
        window.location.href = `/device/`;
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
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="name"
                  autoFocus
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  helperText={formik.errors.name}
                  onBlur={formik.handleBlur}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="machineType"
                  label="machineType"
                  name="machineType"
                  onChange={formik.handleChange}
                  value={formik.values.machineType}
                  helperText={formik.errors.machineType}
                  onBlur={formik.handleBlur}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="location"
                  label="location"
                  name="location"
                  onChange={formik.handleChange}
                  value={formik.values.location}
                  helperText={formik.errors.location}
                  onBlur={formik.handleBlur}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="code"
                  label="code"
                  name="code"
                  onChange={formik.handleChange}
                  value={formik.values.code}
                  helperText={formik.errors.code}
                  onBlur={formik.handleBlur}

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="note"
                  label="note"
                  name="note"
                  onChange={formik.handleChange}
                  value={formik.values.note}
                  helperText={formik.errors.note}
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

export default DeviceEdit;
