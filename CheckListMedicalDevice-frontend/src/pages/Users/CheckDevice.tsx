import React, {  useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

import { IDevice } from "../../interfaces/device.interface";
import { axiosInstance } from "../../axiosRequest";

import Navbar from "../../components/Navbar";
import QRCode from "react-qr-code";

const CheckDevice = () => {

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const [listDevices, setListDevices] = useState<IDevice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {id} = useParams();

  

  const fetchDeviceData = async () => {
    try {
      const response = await axiosInstance.get("/device/");
      const deviceItems = response.data.items;
      setListDevices(deviceItems);
    } catch (error) {
      console.error("Error fetching devices:", error);
    } finally {
      setLoading(false);
    }
  };


  

  useEffect(() => {
    fetchDeviceData();
  }, []);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <Navbar>
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
                    <TableCell >ประเภท</TableCell>
                    <TableCell >ที่อยู่</TableCell>
                    <TableCell >โค้ดซีเรียล</TableCell>
                    <TableCell >โน้ต</TableCell>
                    <TableCell >ชิ้นส่วน</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listDevices
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((device) => (
                      <TableRow key={device.id}>
                        <TableCell>{device.id}</TableCell>
                        <TableCell>{device.name}</TableCell>
                        <TableCell >{device.machineType}</TableCell>
                        <TableCell >{device.location}</TableCell>
                        <TableCell >{device.code}</TableCell>
                        <TableCell >{device.note}</TableCell>
                        <TableCell >
                          <Link to={`/checkdevicesection/${device.id}`}>
                            <Button variant="outlined" color="primary">
                              ดูชิ้นส่วน
                            </Button>
                          </Link>
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
      </Navbar>
    </>
  );
};

export default CheckDevice;
