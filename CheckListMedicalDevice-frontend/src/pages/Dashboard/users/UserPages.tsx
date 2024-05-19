import { useEffect, useState } from "react";
import NavbarDashboard from "../../../components/NavDashboard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { axiosInstance } from "../../../axiosRequest";
import { IUser } from "../../../interfaces/user.interface";
import { TablePagination, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




const UserPages = () => {

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const [listUsers, setListUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleOpenDeleteDialog = (userId: number) => {
    setSelectedUserId(userId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedUserId(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId !== null) {
      try {
        await axiosInstance.delete(`/users/${selectedUserId}`);
        fetchStoreData();
        handleCloseDeleteDialog();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

 

  useEffect(() => {
    fetchStoreData();
  }, []);

  const fetchStoreData = async () => {
    try {
      const response = await axiosInstance.get("/users/");
      const userItems = response.data.items;
      setListUsers(userItems);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <>
      <NavbarDashboard>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
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
                    <TableCell align="right">Role</TableCell>
                    
                    <TableCell align="right">Edit</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? listUsers.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : listUsers
                  ).map((user) => (
                    <TableRow key={user.id}>
                      <TableCell component="th" scope="row">
                        {user.id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.firstName}
                      </TableCell>
                      <TableCell align="right">{user.lastName}</TableCell>
                      <TableCell align="right">{user.username}</TableCell>
                      <TableCell align="right">{user.address}</TableCell>
                      <TableCell align="right">{user.phoneNumber}</TableCell>
                      <TableCell align="right">{user.email}</TableCell>
                      <TableCell align="right">{user.role}</TableCell>
                      <TableCell align="right">
                        <Link to={`/edituser/${user.id}`}>
                          <Button variant="outlined" color="primary">
                            Edit
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleOpenDeleteDialog(user.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={listUsers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
          </>
        )}

        <Link to="/register">
          <Button variant="outlined" color="secondary">
            สมัครสมาชิก
          </Button>
        </Link>
      </NavbarDashboard>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserPages;