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

  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { axiosInstance } from "../../axiosRequest";


import { IDeviceStatusActive } from "../../interfaces/device_transection.interface";
import Navbar from "../../components/Navbar";

const CheckStatusDevice = () => {
  const { id } = useParams();

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchDeviceData();
  }, [id]);

  const fetchDeviceData = async () => {
    try {
      const response = await axiosInstance.get(`/devicetransection/${id}`);
      const devicebill = response.data;
      formik.setValues({
       
        statusActive: devicebill.statusActive,
        status: devicebill.status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
 
      statusActive: "",
      status: 1,
    },
    validationSchema: Yup.object({
    
      statusActive: Yup.number().oneOf([
        IDeviceStatusActive.INACTIVE,
        IDeviceStatusActive.ACTIVE
      ]).required("Please select a status"),
    }),
    
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        
        await axiosInstance.put(`/devicetransection/${id}`, {
          ...values,
          status: 1, 
        });
        alert("fireExtinguisher checked successfully!");
        window.location.href = "/checkdevice/";
      } catch (error) {
        console.log(error);
      }
      setIsSubmitting(false);
    },
  });

  return (
    <Navbar>
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
            สถานะชิ้นส่วนอุปกรณ์
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
             
              <Grid item xs={12} sm={12}>
                <Select
                  required
                  fullWidth
                  id="statusActive"
                 
                  name="statusActive" 
                  value={formik.values.statusActive}
                  onChange={(event) => {
                    const selectedValue = event.target.value;
                    formik.setFieldValue("statusActive", selectedValue); 
                  }}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value={IDeviceStatusActive.INACTIVE}>
                    ผิดปกติ
                  </MenuItem>
                  <MenuItem value={IDeviceStatusActive.ACTIVE}>
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
              {isSubmitting ? "Submitting..." : "อัพเดต"}
            </Button>
          </Box>
        </Box>
      </Container>
    </Navbar>
  );
};

export default CheckStatusDevice;
