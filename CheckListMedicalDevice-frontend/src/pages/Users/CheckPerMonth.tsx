import Navbar from "../../components/Navbar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { createTheme, ThemeProvider } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#E7EFF8",
    },
  },
  typography: {
    fontFamily: ["-apple-system", "sans-serif"].join(","),
  },
});

function createData(
  id: number,
  code: string,
  location: string,
) {
  return { id, code, location };
}

const rows = [
  createData(1, 'ถังดับเพลิง A', 'A',),
  createData(2, 'ถังดับเพลิง B', 'B',),
  createData(3, 'ถังดับเพลิง C', 'C',),
  createData(4, 'ถังดับเพลิง D', 'D',),
  createData(5, 'ถังดับเพลิง E', 'E',),
];

export default function CheckPerMonth() {
  const [status, setStatus] = React.useState('');
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Navbar>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: 'center' }}>ID</TableCell>
                  <TableCell align="right" sx={{ textAlign: 'center' }}>Code</TableCell>
                  <TableCell align="right" sx={{ textAlign: 'center' }}>Location</TableCell>
                  <TableCell align="right" sx={{ textAlign: 'center' }}>Status</TableCell>
                  <TableCell align="right" sx={{ textAlign: 'center' }}>หมายเหตุ</TableCell>
                  <TableCell align="right" sx={{ textAlign: 'center' }}>วันที่ตรวจสอบ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" sx={{ textAlign: 'center' }}>{row.id}</TableCell>
                    <TableCell align="right" sx={{ textAlign: 'center' }}>{row.code}</TableCell>
                    <TableCell align="right" sx={{ textAlign: 'center' }}>{row.location}</TableCell>

                    <TableCell align="right" sx={{ textAlign: 'center' }}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl sx={{ width: 250 }}>
                          <InputLabel id="test">Status</InputLabel>
                          <Select
                            labelId="test"
                            id="testt"
                            value={status}
                            label="สถานะ"
                            onChange={handleChange}
                          >
                            <MenuItem value={10}>ยังอยู่ดี</MenuItem>
                            <MenuItem value={20}>ปกติ</MenuItem>
                            <MenuItem value={30}>ฉิบหายแล้ววว</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </TableCell>

                    <TableCell align="right" sx={{ textAlign: 'center' }} >
                      <TextField
                        id={`note-${row.id}`}
                        label="หมายเหตุ"
                        variant="outlined"
                        fullWidth
                        sx={{ maxWidth: '300px' }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ display: 'flex', }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="เลือกวันที่ตรวจสอบ" />
                      </LocalizationProvider>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <Button variant="outlined">
              Submit
            </Button>
          </Box>
        </Navbar>
      </ThemeProvider>
    </>
  );
};