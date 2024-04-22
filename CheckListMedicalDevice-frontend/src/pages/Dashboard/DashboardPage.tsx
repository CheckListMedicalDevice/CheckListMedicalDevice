import {
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import NavbarDashboard from "../../components/NavDashboard";
import GroupIcon from "@mui/icons-material/Group";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import DevicesIcon from "@mui/icons-material/Devices";
import { axiosInstance } from "../../axiosRequest";
import { IFireTransection } from "../../interfaces/fire_transection.interface";

type Props = {};

function DashboardPage({}: Props) {
  const [loading, setLoading] = useState<boolean>(true);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalFires, setTotalFires] = useState(0);
  const [billFires, setBillFires] = useState<IFireTransection[]>([]);
  // const [totalDevices, setTotalDevices] = useState(0);

  const fetchFireTransection = async () => {
    try {
      const response = await axiosInstance.get<IFireTransection[]>(
        "/getbillfireextingruisher/"
      );
      const bills = response.data;
      setBillFires(bills);
    } catch (error) {
      console.error(error);
    }
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
      console.log(response.data);

      const totalUsers = userItems.length;
      setTotalUsers(totalUsers);
    } catch (error) {
      console.error("Error fetching fires:", error);
    }
  };
  useEffect(() => {
    fetchFireTransection();
    fetchFireData();
    fetchUserData();
    setLoading(false);
  }, []);

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
                    21 เครื่อง
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
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>โค้ด</TableCell>
                          <TableCell align="right">ตำแหน่งที่อยู่</TableCell>
                          <TableCell align="right">สถานะถัง</TableCell>
                          <TableCell align="right">สถานะการดำเนิน</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {billFires.map((bill) => (
                          <TableRow
                            key={bill.code}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {bill.location}
                            </TableCell>
                            <TableCell align="right">
                              {bill.statusActive}
                            </TableCell>
                            <TableCell align="right">{bill.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>

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
                  {/* <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Dessert (100g serving)</TableCell>
                          <TableCell align="right">Calories</TableCell>
                          <TableCell align="right">Fat&nbsp;(g)</TableCell>
                          <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                          <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer> */}
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
