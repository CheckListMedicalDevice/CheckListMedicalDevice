import {
    Box,
    TextField,
    Button,
    Container,
    CssBaseline,
    Grid,
    Typography,
  } from "@mui/material";
  import { useState } from "react";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  
  import CreateIcon from "@mui/icons-material/Create";
  import axios from "axios";
  import { axiosInstance } from "../../../axiosRequest";
import { IDevice } from "../../../interfaces/device.interface";
import NavbarDashboard from "../../../components/NavDashboard";

  
  const validationSchema = Yup.object({
    name: Yup.string().required("กรุณากรอกชื่อ"),
    machinneType: Yup.string(),
    code: Yup.string(),
    location: Yup.string(),
    note: Yup.string(),
  });
  
  const DeviceAdd = () => {
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formik = useFormik({
      initialValues: {
        name: "",
        machineType: "",
        code: "",
        location: "",
        note: "",
      } as IDevice,
      validationSchema: validationSchema,
      onSubmit: async (values: IDevice) => {
        setIsLoading(true);
        try {
          await axiosInstance.post<IDevice>("/device/createDevice/", {
            name: values.name,
            machineType: values.machineType,
            code: values.code,
            location: values.location,
            note: values.note,
          });
          alert(" เพิ่มอุปกรณ์สำเร็จแล้ว!");
          
          setIsSubmitting(true);
          window.location.href = `/device/`;
        } catch (e: any) {
          if (axios.isAxiosError(e)) {
            alert(e?.response?.data.message);
          } else {
            console.error(e);
          }
        }
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
              <CreateIcon />
              <Typography component="h1" variant="h5">
                เพิ่มอุปกรณ์
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="off"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      autoFocus
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="off"
                      required
                      fullWidth
                      id="machineType"
                      label="machineType"
                      name="machineType"
                      value={formik.values.machineType}
                      onChange={formik.handleChange}
                      error={formik.touched.machineType && Boolean(formik.errors.machineType)}
                      helperText={formik.touched.machineType && formik.errors.machineType}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="off"
                      required
                      fullWidth
                      id="location"
                      label="location"
                      name="location"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      error={formik.touched.location && Boolean(formik.errors.location)}
                      helperText={formik.touched.location && formik.errors.location}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="off"
                      required
                      fullWidth
                      id="code"
                      label="code"
                      name="code"
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
                      id="note"
                      label="note"
                      name="note"
                      value={formik.values.note}
                      onChange={formik.handleChange}
                      error={formik.touched.note && Boolean(formik.errors.note)}
                      helperText={formik.touched.note && formik.errors.note}
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
                  {isLoading ? "กำลังเพิ่ม..." : "เพิ่มอุปกรณ์"}
                </Button>
              </Box>
            </Box>
          </Container>
          </NavbarDashboard>
      </>
    );
  };
  
  export default DeviceAdd;
  