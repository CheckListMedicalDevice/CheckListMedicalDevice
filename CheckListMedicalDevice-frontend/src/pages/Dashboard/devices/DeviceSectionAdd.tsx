import {
    Box,
    TextField,
    Button,
    Container,
    CssBaseline,
    Grid,
    Typography,
  } from "@mui/material";
  import {  useState } from "react";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  
  import CreateIcon from "@mui/icons-material/Create";
  import axios from "axios";
  import { axiosInstance } from "../../../axiosRequest";

import NavbarDashboard from "../../../components/NavDashboard";
import { IDeviceSection } from "../../../interfaces/devicesection.interface";
import { useParams } from "react-router-dom";

  
const validationSchema = Yup.object({
  sectionName: Yup.string().required('Section Name is required'),
  ability: Yup.string().required('Ability is required'),
});

  
  const DeviceSectionAdd = () => {
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const {id} = useParams();
    
    const formik = useFormik({
      initialValues: {
        sectionName: '',
        ability: '',
      } as IDeviceSection,
      validationSchema: validationSchema,
      onSubmit: async (values: IDeviceSection) => {
        setIsLoading(true);
        try {
          await axiosInstance.post<IDeviceSection>(`/deviceSections/createDeviceSection/${id}`, {
            sectionName: values.sectionName,
            ability: values.ability,
            
            
           
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
                      name="sectionName"
                      required
                      fullWidth
                      id="sectionName"
                      label="ชื่อชิ้นส่วน"
                      autoFocus
                      value={formik.values.sectionName}
                      onChange={formik.handleChange}
                      error={formik.touched.sectionName && Boolean(formik.errors.sectionName)}
                      helperText={formik.touched.sectionName && formik.errors.sectionName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="off"
                      required
                      fullWidth
                      id="ability"
                      label="ความสามารถ"
                      name="ability"
                      value={formik.values.ability}
                      onChange={formik.handleChange}
                      error={formik.touched.ability && Boolean(formik.errors.ability)}
                      helperText={formik.touched.ability && formik.errors.ability}
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
  
  export default DeviceSectionAdd;
  