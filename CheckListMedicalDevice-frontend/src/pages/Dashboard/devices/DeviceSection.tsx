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
import { TablePagination, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IDeviceSection } from "../../../interfaces/devicesection.interface";

const DeviceSection = () => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [listDevices, setListDevices] = useState<IDeviceSection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
  const { id } = useParams(); 

  const handleOpenDeleteDialog = (deviceId: number) => {
    setSelectedDeviceId(deviceId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedDeviceId(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedDeviceId !== null) {
      try {
        await axiosInstance.delete(`/deviceSection/${selectedDeviceId}`);
        fetchDeviceSectionData(); 
        handleCloseDeleteDialog();
      } catch (error) {
        console.error("Error deleting device:", error);
      }
    }
  };

  useEffect(() => {
    fetchDeviceSectionData();
  }, [page, id]);

  const fetchDeviceSectionData = async () => {
    try {
      const response = await axiosInstance.get(`/deviceSections/list/${id}`);
      const DeviceItems = response.data.items;
  
      setListDevices(DeviceItems);
    } catch (error) {
      console.error("Error fetching device sections:", error);
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
                    <TableCell>ชื่ออุปกรณ์</TableCell>
                    <TableCell >ความสามารถ</TableCell>
                    <TableCell >Edit</TableCell>
                    <TableCell >Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listDevices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell component="th" scope="row">
                        {device.id}
                      </TableCell>
                      <TableCell>{device.sectionName}</TableCell>
                      <TableCell >{device.ability}</TableCell>
                      <TableCell >
                        <Link to={`/devicesectionedit/${device.id}`}>
                          <Button variant="outlined" color="primary">
                            แก้ไข
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell >
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleOpenDeleteDialog(device.id)}
                        >
                          ลบ
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[rowsPerPage]}
              component="div"
              count={listDevices.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
          </>
        )}

        <Link to={`/devicesectionadd/${id}`}>
          <Button variant="outlined" color="secondary">
            เพิ่มชิ้นส่วน
          </Button>
        </Link>
      </NavbarDashboard>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Device</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this device?
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

export default DeviceSection;
