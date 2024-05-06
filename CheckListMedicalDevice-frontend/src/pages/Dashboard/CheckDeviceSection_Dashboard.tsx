import React, { useEffect, useState } from "react";

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  SelectChangeEvent,

} from "@mui/material";


import { axiosInstance } from "../../axiosRequest";
import { useParams } from "react-router-dom";
import { IDeviceStatusActive, IDeviceTransection, IDeviceTransectionStatus } from "../../interfaces/device_transection.interface";
import NavbarDashboard from "../../components/NavDashboard";
import getStatusDescriptionDevice from "../../utils/GetStatusDescriptionDevice";
import getStatusDevice from "../../utils/GetStatusDevice";

const CheckDeviceSection_Dashboard = () => {
  const [billDevices, setbillDevices] = useState<IDeviceTransection[]>([]);
  const [groupedTransections, setGroupedTransections] = useState<{
    [date: string]: IDeviceTransection[];
  }>({});
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // const [totalDevices, setTotalDevices] = useState(0);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const { id } = useParams();


  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedDate(event.target.value);
    setOpenDropdown(false);
    handleGroupSelection(event.target.value); 
  };
  
  const handleGroupSelection = (date: string) => {
    setbillDevices(groupedTransections[date]);
    setOpenDropdown(false);
  };

  useEffect(() => {
    fetchDeviceTransection();
  }, [id]);
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const fetchDeviceTransection = async () => {
    try {
      const response = await axiosInstance.get(`/devicetransection/`);
      const devicebills = response.data.items;
 

      const grouped = devicebills.reduce(
        (
          acc: { [date: string]: IDeviceTransection[] },
          transection: IDeviceTransection
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

      // Filter bills based on status


   
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NavbarDashboard>
      <Box>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="select-date-label">Select Date and Time</InputLabel>
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
          <Table sx={{  }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ไอดี</TableCell>
                <TableCell>ชื่อชิ้นส่วน</TableCell>
                <TableCell>ความสามารถ </TableCell>
                <TableCell align="center">สถานะอุปกรณ์</TableCell>
                <TableCell align="center">สถานะการเช็ค</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billDevices.map((bill: IDeviceTransection) => (
               <TableRow key={bill.id} component="th" scope="row">
               <TableCell>{bill.id}</TableCell>
               <TableCell>{bill.sectionName}</TableCell>
               <TableCell>{bill.ability}</TableCell>
               <TableCell
                      align="center"
                              style={{
                                color:
                                  bill.statusActive ===
                                  IDeviceStatusActive.INACTIVE
                                    ? "#E74C3C"
                                    : bill.statusActive ===
                                    IDeviceStatusActive.ACTIVE 
                                    ? "#2ECC71" 
                                    : "#000000",
                              }}
                            >
                              {getStatusDescriptionDevice(bill.statusActive)}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                color:
                                  bill.status === IDeviceTransectionStatus.WAITING
                                    ? "#F1C40F"
                                    : "#2ECC71",
                              }}
                            >
                              {getStatusDevice(bill.status)}
                            </TableCell>
              
             </TableRow>
             
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={billDevices.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Box>
    </NavbarDashboard>
  );
};

export default CheckDeviceSection_Dashboard;
