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


export default function CheckPerMonth() {
  const [status, setStatus] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  return (
    <>
      <Navbar>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Code</TableCell>
                <TableCell align="right">Location</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">หมายเหตุ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">01</TableCell>
                <TableCell align="right">FreeFire</TableCell>
                <TableCell align="right">Fablab</TableCell>

                <TableCell align="right">
                  <Box sx={{ minWidth: 10 }}>
                    <FormControl sx={{ width: 150 }}>
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

                <TableCell align="right">
                  <TextField id="outlined-basic" label="หมายเหตุ" variant="outlined" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <Button variant="outlined">
            ส่งค่า
          </Button>
        </Box>
      </Navbar>
    </>
  );
};