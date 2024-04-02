import React, { useContext, useEffect, useState } from 'react'
import NavbarDashboard from '../../../components/NavDashboard'
import { IFire } from '../../../interfaces/fire.interface';
import { AuthContext } from '../../../contexts/AuthContext';
import { axiosInstance } from '../../../axiosRequest';
import { Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { Link } from 'react-router-dom';

type Props = {}

const FirePages = (props: Props) => {

  
  const { user } = useContext(AuthContext);

  const [listFires, setListUsers] = useState<IFire[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const deleteFireExtingruisherById = async (id: number) => {
    try {
      await axiosInstance.delete(`/fireExtinguisher/${id}`);
      fetchStoreData();
    } catch (error) {
      console.error("Error deleting fireExtinguisher:", error);
    }
  };

  useEffect(() => {
    fetchStoreData();
  }, []);

  const fetchStoreData = async () => {
    try {
      const response = await axiosInstance.get("/fireExtinguisher/");
      const userItems = response.data.items;
      setListUsers(userItems);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
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
                  <TableCell>Code</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right">Edit</TableCell>
                  <TableCell align="right">Delete</TableCell>
                 
                </TableRow>
              </TableHead>
              <TableBody>
                {listFires.map((fire) => (
                  <TableRow key={fire.id}>
                    <TableCell component="th" scope="row">
                      {fire.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {fire.code}
                    </TableCell>
                    <TableCell align="right">{fire.location}</TableCell>
                    
                    <TableCell align="right">
                      <Link to={`/fireEdit/${fire.id}`}>
                        <Button variant="outlined" color="primary">
                          Edit
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => deleteFireExtingruisherById(fire.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Link to="/firecreate">
          <Button variant="outlined" color="secondary">
            addFireExtinguisher
          </Button>
        </Link>
    </NavbarDashboard>
    </>
  )
}

export default FirePages
