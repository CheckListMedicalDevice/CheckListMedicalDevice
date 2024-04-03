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
} from "@mui/material";
import { Link } from "react-router-dom";

const FirePages = () => {
  const [listFires, setListFires] = useState<IFire[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const deleteFireExtinguisherById = async (id: number) => {
    try {
      await axiosInstance.delete(`/fireExtinguisher/${id}`);
      fetchFireData();
    } catch (error) {
      console.error("Error deleting fireExtinguisher:", error);
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
    event: React.MouseEvent<HTMLButtonElement> | null,
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
                          onClick={() => deleteFireExtinguisherById(fire.id)}
                          
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
    </>
  );
};

export default FirePages;
