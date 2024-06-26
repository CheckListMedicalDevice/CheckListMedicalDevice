import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import NavbarDashboard from "../../components/NavDashboard";
import GroupIcon from "@mui/icons-material/Group";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import DevicesIcon from "@mui/icons-material/Devices";
import { axiosInstance } from "../../axiosRequest";
import {
  IFireTransection,
  IFireTransectionStatus,
  IFireTransectionStatusActive,
} from "../../interfaces/fire_transection.interface";
import GetStatusDescription from "../../utils/GetStatusDescription";
import getStatus from "../../utils/GetStatus";

import { IDevice } from "../../interfaces/device.interface";
import { Link } from "react-router-dom";


type Props = {};

function DashboardPage({}: Props) {
  const [loading, setLoading] = useState<boolean>(true);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFires, setTotalFires] = useState(0);
  const [totalDevices, setTotalDevices] = useState(0);


  const [billFires, setBillFires] = useState<IFireTransection[]>([]);
  
  const [listDevices, setListDevices] = useState<IDevice[]>([]);


  
  const [groupedTransections, setGroupedTransections] = useState<{
    [date: string]: IFireTransection[];
  }>({});


  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  


  // const [totalDevices, setTotalDevices] = useState(0);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedDate(event.target.value);
    setOpenDropdown(false);
    handleGroupSelection(event.target.value);
  };
 


  const fetchListDevices = async () => {
    try {
      const response = await axiosInstance.get("/device");
      const DeviceItems = response.data.items;
      setListDevices(DeviceItems);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchFireTransection = async () => {
    try {
      const response = await axiosInstance.get("/transection/");
      const bills = response.data.items;

      const grouped = bills.reduce(
        (
          acc: { [date: string]: IFireTransection[] },
          transection: IFireTransection
        ) => {
          const date = new Date(transection.createdAt);
          const dateTimeString = date.toLocaleString();
          if (!acc[dateTimeString]) {
            acc[dateTimeString] = [];
          }
          acc[dateTimeString].push(transection);
          return acc;
        },
        {}
      );

      setGroupedTransections(grouped);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleGroupSelection = (date: string) => {
    setBillFires(groupedTransections[date]);
    setOpenDropdown(false);
  };



  const fetchFireData = async () => {
    try {
      const response = await axiosInstance.get("/fireExtinguisher/");
      const fireItems = response.data.items;
      setLoading(false);
      const totalFires = fireItems.length;
      setTotalFires(totalFires);
    } catch (error) {
      console.error("Error fetching fire data:", error);
    }
  };
  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get("/users/");
      const userItems = response.data.items;
  

      const totalUsers = userItems.length;
      setTotalUsers(totalUsers);
    } catch (error) {
      console.error("Error fetching fires:", error);
    }
  };
  const fetchDeviceData = async () => {
    try {
      const response = await axiosInstance.get("/device/");
      const deviceItems = response.data.items;
   

      const totalDevice = deviceItems.length;
      setTotalDevices(totalDevice);
    } catch (error) {
      console.error("Error fetching fires:", error);
    }
  };


  useEffect(() => {
    fetchListDevices();
    fetchFireTransection();

    fetchFireData();
    fetchUserData();
    fetchDeviceData();
    setLoading(false);
  }, []);

  

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <NavbarDashboard>
          <Container maxWidth="lg" sx={{ display: "flex" }}>
            <Grid
              container
              spacing={0}
              sx={{ gap: 2, justifyContent: "flex-start" }}
            >
              <Grid
                item
                xs={10}
                lg={3}
                sx={{
                  backgroundColor: "#F5F5F5",
                  width: 200,
                  height: 220,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#838996",
                    width: "100%",
                    py: 1,
                    px: 2,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      textShadow: "0px 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    ผู้ใช้
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      fontSize: "2rem",
                      width: "100%",
                      height: "50%",
                      px: 3,
                    }}
                  >
                    <GroupIcon />
                    &nbsp; Total
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      fontSize: "3rem",
                      width: "100%",
                      height: "50%",
                      px: 2,
                      py: 3,
                    }}
                  >
                    {totalUsers} คน
                  </Box>
                </Box>
              </Grid>

              <Grid
                item
                xs={10}
                lg={3}
                sx={{
                  backgroundColor: "#EEEEEE",
                  width: 200,
                  height: 220,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#838996",
                    width: "100%",
                    py: 1,
                    px: 2,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      textShadow: "0px 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    ถังดับเพลิง
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      fontSize: "2rem",
                      width: "100%",
                      height: "50%",
                      px: 3,
                    }}
                  >
                    <WhatshotIcon />
                    &nbsp; Total
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      fontSize: "3rem",
                      width: "100%",
                      height: "50%",
                      px: 2,
                      py: 3,
                    }}
                  >
                    {totalFires} ถัง
                  </Box>
                </Box>
              </Grid>

              <Grid
                item
                xs={10}
                lg={3}
                sx={{
                  backgroundColor: "#E5E4E2",
                  width: 200,
                  height: 220,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#838996",
                    width: "100%",
                    py: 1,
                    px: 2,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      textShadow: "0px 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    อุปกรณ์การแพทย์
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      fontSize: "2rem",
                      width: "100%",
                      height: "50%",
                      px: 3,
                    }}
                  >
                    <DevicesIcon />
                    &nbsp; Total
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      fontSize: "3rem",
                      width: "100%",
                      height: "50%",
                      px: 2,
                      py: 3,
                    }}
                  >
                    {totalDevices} เครื่อง
                  </Box>
                </Box>
              </Grid>

              <Grid
                item
                xs={10}
                lg={9.34}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#838996",
                    width: "100%",
                    py: 1,
                    px: 2,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                >
                  FireExtingruisher
                </Box>
                <Box>
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id="select-date-label">
                        Select Date and Time
                      </InputLabel>
                      <Select
                        labelId="select-date-label"
                        id="select-date"
                        open={openDropdown}
                        onClose={() => setOpenDropdown(false)}
                        onOpen={() => setOpenDropdown(true)}
                        value={selectedDate}
                        onChange={handleChange}
                      >
                        {Object.keys(groupedTransections).map((date) => (
                          <MenuItem key={date} value={date}>
                            {date}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>โค้ด</TableCell>
                          <TableCell >ตำแหน่งที่อยู่</TableCell>
                          <TableCell >หมายเหตุ</TableCell>
                          <TableCell >สถานะถัง</TableCell>
                          <TableCell >สถานะการดำเนิน</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(rowsPerPage > 0
                          ? billFires.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                          : billFires
                        ).map((bill) => (
                          <TableRow key={bill.code} component="th" scope="row">
                            <TableCell component="th" scope="row">
                              {bill.code}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {bill.location}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {bill.note}
                            </TableCell>
                            <TableCell
                           
                              style={{
                                color:
                                  bill.statusActive ===
                                  IFireTransectionStatusActive.INACTIVE 
                                    ? "#E74C3C"
                                    : bill.statusActive ===
                                      IFireTransectionStatusActive.ACTIVE 
                                    ? "#2ECC71" 
                                    : "#000000",
                              }}

                            >
                              {GetStatusDescription(bill.statusActive)}
                            </TableCell>
                            <TableCell
                         
                              style={{
                                color:
                                  bill.status === IFireTransectionStatus.WAITING
                                    ? "#F1C40F"
                                    : "#2ECC71",
                              }}
                            >
                              {getStatus(bill.status)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={billFires.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                  />
                </Box>
              </Grid>

              <Grid
                item
                xs={10}
                lg={9.34}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#838996",
                    width: "100%",
                    py: 1,
                    px: 2,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                >
                  Device
                </Box>
                <Box>
                <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>ชื่ออุปกรณ์</TableCell>
                    <TableCell>ประเภท</TableCell>
                    <TableCell >ที่อยู่</TableCell>
                    <TableCell >โค้ดซีเรียล</TableCell>
                
                    <TableCell>ชิ้นส่วน</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listDevices
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((device) => (
                      <TableRow key={device.id}>
                        <TableCell>{device.id}</TableCell>
                        <TableCell>{device.name}</TableCell>
                        <TableCell >{device.machineType}</TableCell>
                        <TableCell >{device.location}</TableCell>
                        <TableCell >{device.code}</TableCell>
                       
                        <TableCell >
                          <Link to={`/devicesectiondashboard/${device.id}`}>
                            <Button variant="outlined" color="primary">
                              ดูชิ้นส่วน
                            </Button>
                          </Link>
                        </TableCell>
                       
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={billFires.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                  />
                </Box>
                
                
                
               
              </Grid>
            </Grid>
          </Container>
        </NavbarDashboard>
      )}
    </>
  );
}

export default DashboardPage;

