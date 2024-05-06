import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
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
  Button,
} from "@mui/material";

import { axiosInstance } from "../../axiosRequest";
import { Link, useParams } from "react-router-dom";
import { IDeviceTransection } from "../../interfaces/device_transection.interface";

const CheckDeviceSection = () => {
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

  const sortedDates = Object.keys(groupedTransections).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });

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

  useEffect(() => {
    if (sortedDates.length > 0) {
      setSelectedDate(sortedDates[0]);
      handleGroupSelection(sortedDates[0]);
    }
  }, [groupedTransections]);

  const fetchDeviceTransection = async () => {
    try {
      const response = await axiosInstance.get("/devicetransection/");
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

      const filteredBills = devicebills.filter(
        (devicebill: IDeviceTransection) => devicebill.status === 0
      );

      setbillDevices(filteredBills);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Navbar>
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
              {sortedDates.map((date) => (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ไอดี</TableCell>
                <TableCell>ชื่อชิ้นส่วน</TableCell>
                <TableCell>ความสามารถ</TableCell>
                <TableCell>สถานะ</TableCell>
                <TableCell>Check</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billDevices.map((bill: IDeviceTransection) => (
                <TableRow key={bill.id} component="th" scope="row">
                  <TableCell>{bill.id}</TableCell>
                  <TableCell>{bill.sectionName}</TableCell>
                  <TableCell>{bill.ability}</TableCell>
                  <TableCell
                    sx={{
                      color: bill.statusActive === 0 ? "#ffb74d" : "green",
                    }}
                  >
                    {bill.status === 0 ? "ยังไม่ได้เช็ค" : "เช็คแล้ว"}
                  </TableCell>
                  {bill.status === 0 && (
                    <TableCell>
                      <Link to={`/checkstatusdevice/${bill.id}`}>
                        <Button variant="outlined" color="primary">
                          Check
                        </Button>
                      </Link>
                    </TableCell>
                  )}
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
    </Navbar>
  );
};

export default CheckDeviceSection;
