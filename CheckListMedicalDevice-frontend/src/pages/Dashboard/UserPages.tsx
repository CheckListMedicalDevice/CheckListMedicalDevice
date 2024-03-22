import { Typography } from '@mui/material'
import React from 'react'
import NavbarDashboard from '../../components/NavDashboard'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { axiosInstance } from '../../axiosRequest';

type Props = {}

const UserPages = (props: Props) => {

  const fetchuserData = async () => {
    try {
      const response = await axiosInstance.get('/users/get-users?page=1&perPage=42');
      const userItems = response.data.items

    } catch (error) {
      
    }
  }
  
  
  return (
    <>
    <NavbarDashboard>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>firstName</TableCell>
            <TableCell align="right">lastName</TableCell>
            <TableCell align="right">username</TableCell>
            <TableCell align="right">password</TableCell>
            <TableCell align="right">role</TableCell>
            <TableCell align="right">edit</TableCell>
            <TableCell align="right">delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            {/* <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow> */}
      
        </TableBody>
      </Table>
    </TableContainer>
    </NavbarDashboard>
    </>
  )
}

export default UserPages