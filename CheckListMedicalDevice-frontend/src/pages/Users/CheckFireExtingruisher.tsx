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
import { IFireTransection } from "../../interfaces/fire_transection.interface";

import { axiosInstance } from "../../axiosRequest";
import { Link } from "react-router-dom";

const CheckFireExtingruisher = () => {
  const [billFires, setBillFires] = useState<IFireTransection[]>([]);
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

    const filteredBills = groupedTransections[event.target.value].filter(
      (bill) => bill.status === 0
    );
    setBillFires(filteredBills);
  };
  const handleGroupSelection = (date: string) => {
    setBillFires(groupedTransections[date]);
    setOpenDropdown(false);
  };

  useEffect(() => {
    fetchFireTransection();
  }, []);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

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

      // Filter bills based on status
      const filteredBills = bills.filter((bill: IFireTransection) => bill.status === 0);
      setBillFires(filteredBills);
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
                <TableCell align="right">ตำแหน่งที่อยู่</TableCell>
                <TableCell align="right">Check</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billFires.map((bill: IFireTransection) => (
                <TableRow key={bill.code} component="th" scope="row">
                  <TableCell component="th" scope="row">
                    {bill.code}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {bill.location}
                  </TableCell>
                  <TableCell align="right">
                    <Link to={`/checkstatusfire/${bill.id}`}>
                      <Button variant="outlined" color="primary">
                        Edit
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
    </Navbar>
  );
};

export default CheckFireExtingruisher;
