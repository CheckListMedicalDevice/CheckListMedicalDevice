import {  useEffect, useState } from "react";
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
import { Link } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { IDevice } from "../../../interfaces/device.interface";

const DevicePages = () => {

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const [listDevices, setListDevices] = useState<IDevice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);

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
        await axiosInstance.delete(`/device/${selectedDeviceId}`);
        
        fetchDeviceData();
        handleCloseDeleteDialog();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  useEffect(() => {
    fetchDeviceData();
  }, [listDevices]);

  const fetchDeviceData = async () => {
    try {
      const response = await axiosInstance.get("/device/");
      const DeviceItems = response.data.items;
    
      setListDevices(DeviceItems);
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
                    <TableCell>ชื่ออุปกรณ์</TableCell>
                    <TableCell>ประเภท</TableCell>

                    <TableCell>ที่อยู่</TableCell>
                    <TableCell>โค้ดซีเรียล</TableCell>
                    <TableCell>โน้ต</TableCell>
                    <TableCell>ชิ้นส่วน</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? listDevices.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : listDevices
                  ).map((device) => (
                    <TableRow key={device.id}>
                      <TableCell component="th" scope="row">
                        {device.id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {device.name}
                      </TableCell>
                      <TableCell>{device.machineType}</TableCell>
                      <TableCell>{device.location}</TableCell>
                      <TableCell>{device.code}</TableCell>
                      <TableCell>{device.note}</TableCell>
                      <TableCell>
                      <Link to={`/devicesection/${device.id}`}>
                        <Button variant="outlined" color="primary">
                          ดูชิ้นส่วน
                        </Button>
                      </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/deviceedit/${device.id}`}>
                          <Button variant="outlined" color="primary">
                            แก้ไข
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell>
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
              rowsPerPageOptions={[10]}
              component="div"
              count={listDevices.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
          </>
        )}

        <Link to="/deviceadd">
          <Button variant="outlined" color="secondary">
            เพิ่มอุปกรณ์
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

export default DevicePages;
