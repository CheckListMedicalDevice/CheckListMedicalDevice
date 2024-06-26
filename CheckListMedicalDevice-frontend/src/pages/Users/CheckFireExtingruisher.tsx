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

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const sortedDates = Object.keys(groupedTransections).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });

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
      const filteredBills = bills.filter(
        (bill: IFireTransection) => bill.status === 0
      );
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
              {sortedDates.map((date) => (
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
                <TableCell align="left">โค้ด</TableCell>
                <TableCell align="center">ตำแหน่งที่อยู่</TableCell>
                <TableCell align="center">Check</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billFires.map((bill: IFireTransection) => (
                <TableRow key={bill.code} component="th" scope="row">
                  <TableCell align="left" component="th" scope="row">
                    {bill.code}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {bill.location}
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`/checkstatusfire/${bill.id}`}>
                      <Button variant="outlined" color="primary">
                        Check
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
