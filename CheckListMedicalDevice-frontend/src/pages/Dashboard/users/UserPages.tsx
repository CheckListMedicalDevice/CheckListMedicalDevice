import React, { useEffect, useState } from 'react';
import NavbarDashboard from '../../../components/NavDashboard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'; 
import { axiosInstance } from '../../../axiosRequest';
import { IUser } from '../../../interfaces/user.interface';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

type Props = {};

const UserPages = (props: Props) => {
  const [listUsers, setListUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await axiosInstance.get('/users/');
        const userItems = response.data.items;
        setListUsers(userItems);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchStoreData();
  }, []);

  return (
    <>
      <NavbarDashboard>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">Username</TableCell>
                  <TableCell align="right">Address</TableCell>
                  <TableCell align="right">PhoneNumber</TableCell>
                  <TableCell align="right">Email</TableCell>
               
                  <TableCell align="right">Edit</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">{user.id}</TableCell>
                    <TableCell component="th" scope="row">{user.firstName}</TableCell>
                    <TableCell align="right">{user.lastName}</TableCell>
                    <TableCell align="right">{user.username}</TableCell>
                    <TableCell align="right">{user.address}</TableCell>
                    <TableCell align="right">{user.phoneNumber}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    
                    <TableCell align="right">
                      
                      <Link to='edituser'>
                      <Button variant="outlined" color="primary">Edit</Button>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="outlined" color="secondary">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              
            </Table>
           
           
          </TableContainer>
          
        )}
          <Link to='/register'>
            <Button variant="outlined" color="secondary">สมัครสมาชิก</Button>
            </Link>
      </NavbarDashboard>
    </>
  );
};

export default UserPages;
