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

function createData(
  id: number,
  code: string,
  location: string,
) {
  return { id, code, location };
}

const rows = [
  createData(1, 'ไม่รู้ A', 'A',),
  createData(2, ' ไม่รู้ B', 'B',),
  createData(3, ' ไม่รู้ C', 'C',),
  createData(4, ' ไม่รู้ D', 'D',),
  createData(5, ' ไม่รู้ E', 'E',),
];

export default function CheckPerDay() {
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
                <TableCell sx={{textAlign:'center'}}>ID</TableCell>
                <TableCell align="right" sx={{textAlign:'center'}}>Code</TableCell>
                <TableCell align="right" sx={{textAlign:'center'}}>Location</TableCell>
                <TableCell align="right" sx={{textAlign:'center'}}>Status</TableCell>
                <TableCell align="right" sx={{textAlign:'center'}}>หมายเหตุ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{textAlign:'center'}}>{row.id}</TableCell>
                  <TableCell align="right" sx={{textAlign:'center'}}>{row.code}</TableCell>
                  <TableCell align="right" sx={{textAlign:'center'}}>{row.location}</TableCell>

                  <TableCell align="right" sx={{textAlign:'center'}}>
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

                  <TableCell align="right" sx={{textAlign:'center'}} >
                    <TextField
                      id={`note-${row.id}`}
                      label="หมายเหตุ"
                      variant="outlined"
                      fullWidth
                      sx={{ maxWidth: '300px' }}
                    />
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
    </>
  );
};