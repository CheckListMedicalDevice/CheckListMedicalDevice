import { useEffect, useState } from "react";
import NavbarDashboard from "../../../components/NavDashboard";
import { IFire } from "../../../interfaces/fire.interface";
import { axiosInstance } from "../../../axiosRequest";
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom";

const FirePages = () => {
  const [listFires, setListFires] = useState<IFire[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedFireId, setSelectedFireId] = useState<number | null>(null);

  const handleOpenDeleteDialog = (fireId: number) => {
    setSelectedFireId(fireId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedFireId(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedFireId !== null) {
      try {
        await axiosInstance.delete(`/fireExtinguisher/${selectedFireId}`);
        fetchFireData();
        handleCloseDeleteDialog();
      } catch (error) {
        console.error("Error deleting fireExtinguisher:", error);
      }
    }
  };

 

  useEffect(() => {
    fetchFireData();
  }, []);

  const fetchFireData = async () => {
    try {
      const response = await axiosInstance.get("/fireExtinguisher/");
      const fireItems = response.data.items;
      setListFires(fireItems);
    } catch (error) {
      console.error("Error fetching fires:", error);
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
                    <TableCell>Code</TableCell>
                    <TableCell align="right">Location</TableCell>
                    <TableCell align="right">Edit</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? listFires.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : listFires
                  ).map((fire) => (
                    <TableRow key={fire.id}>
                      <TableCell component="th" scope="row">
                        {fire.id}
                      </TableCell>
                      <TableCell>{fire.code}</TableCell>
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
                          color="error"
                          onClick={() => handleOpenDeleteDialog(fire.id)}
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
              count={listFires.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
          </>
        )}
        <Link to="/firecreate">
          <Button
            variant="outlined"
            color="secondary"
            sx={{ textAlign: "center" }}
          >
            addFireExtinguisher
          </Button>
        </Link>
      </NavbarDashboard>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Fire Extinguisher</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            แน่ใจหรือว่าต้องการลบ?
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

export default FirePages;