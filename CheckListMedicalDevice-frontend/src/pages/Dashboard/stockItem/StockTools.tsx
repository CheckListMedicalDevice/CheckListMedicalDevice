import { useEffect, useState } from "react";
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
  Box,

} from "@mui/material";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import 'dayjs/locale/th';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import EditIcon from '@mui/icons-material/Edit';

import NavbarDashboard from "../../../components/NavDashboard";
import { ITools } from "../../../interfaces/tools.interface";
import { axiosInstance } from "../../../axiosRequest";
import Search from "../../../components/Search";
import DeleteConfirmationDialog from "../../../components/Delete";
import AddQuantityDialog from "../../../components/AddQuantityDialog";
import RemoveQuantityDialog from "../../../components/RemoveQuantityDialog";


const StockTools = () => {
  const [listTools, setListTools] = useState<ITools[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [toolToDelete, setToolToDelete] = useState<number | null>(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [quantityToAdd, setQuantityToAdd] = useState("");
  const [toolToAdd, setToolToAdd] = useState<number | null>(null);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [quantityToRemove, setQuantityToRemove] = useState("");
  const [toolToRemove, setToolToRemove] = useState<number | null>(null);


  dayjs.extend(localizedFormat);
  dayjs.locale('th');


  useEffect(() => {
    fetchToolsData();
  }, []);

  const fetchToolsData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/tools/");
      setListTools(response.data.items || []);
    } catch (error) {
      console.error("Error fetching tools:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirmationOpen = (id: number) => {
    setToolToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
    setToolToDelete(null);
  };

  const handleDeleteTool = async () => {
    if (toolToDelete !== null) {
      try {
        await axiosInstance.delete(`/tools/${toolToDelete}`);
        fetchToolsData();
      } catch (error) {
        console.error("Error deleting tool:", error);
      } finally {
        handleDeleteConfirmationClose();
      }
    }
  };

  const filteredTools = listTools.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  const handleAddQuantityConfirm = async () => {
    if (toolToAdd !== null && quantityToAdd !== "") {
      try {
        const tool = listTools.find(tool => tool.id === toolToAdd);
        if (tool) {
          await axiosInstance.put(`/tools/${toolToAdd}`, {
            count: tool.count + parseInt(quantityToAdd)
          });
          fetchToolsData();
        } else {
          console.error("Tool not found with id:", toolToAdd);
        }
      } catch (error) {
        console.error("Error editing tool:", error);
      } finally {
        setOpenAddDialog(false);
      }
    }
  };

  const handleRemoveQuantityConfirm = async () => {
    if (toolToRemove !== null && quantityToRemove !== "") {
      try {
        const tool = listTools.find(tool => tool.id === toolToRemove);
        if (tool) {
          const newQuantity = Math.max(0, tool.count - parseInt(quantityToRemove));
          await axiosInstance.put(`/tools/${toolToRemove}`, {
            count: newQuantity
          });
          fetchToolsData();
        } else {
          console.error("Tool not found with id:", toolToRemove);
        }
      } catch (error) {
        console.error("Error editing tool:", error);
      } finally {
        setOpenRemoveDialog(false);
      }
    }
  };


  return (
    <>
      <NavbarDashboard>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Box sx={{ display: 'flex' }}>
                <Search value={search} onChange={(text) => setSearch(text)} />
              </Box>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">id</TableCell>
                    <TableCell align="center">ชื่ออุปกรณ์</TableCell>
                    <TableCell align="center">จำนวน</TableCell>
                    <TableCell align="center">หมายเหตุ</TableCell>
                    <TableCell align="center">วันที่เพิ่ม</TableCell>
                    <TableCell align="center">แก้ไขข้อมูล</TableCell>
                    <TableCell align="center">เพิ่ม/ลบ</TableCell>
                    <TableCell align="center">ลบอุปกรณ์</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTools
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell component="th" scope="row" align="center">
                          {item.id}
                        </TableCell>
                        <TableCell align="center">{item.name}</TableCell>
                        <TableCell align="center">{item.count}</TableCell>
                        <TableCell align="center">{item.note}</TableCell>
                        <TableCell align="center">
                          {dayjs(item.updateAt).format('DD MMMM YYYY')}
                        </TableCell>
                        <TableCell align="center">
                          <Link to={`/edittools/${item.id}`}>
                            <Button variant="outlined" color="primary">
                              <EditIcon />
                            </Button>
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            color="success"
                            onClick={() => {
                              setToolToAdd(item.id);
                              setOpenAddDialog(true);
                            }}
                          >
                            เพิ่ม
                          </Button>
                          <Button
                            variant="outlined"
                            color="warning"
                            onClick={() => {
                              setToolToRemove(item.id)
                              setOpenRemoveDialog(true);
                            }}
                          >
                            ลบ
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDeleteConfirmationOpen(item.id)}
                          >
                            <DeleteForeverIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box>
              <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={filteredTools.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </>
        )}
        <Link to="/addtools">
          <Button variant="outlined" color="secondary" sx={{ textAlign: "center" }}>
            เพิ่มอุปกรณ์ที่นี่
          </Button>
        </Link>
        <DeleteConfirmationDialog
          open={deleteConfirmationOpen}
          onClose={handleDeleteConfirmationClose}
          onConfirm={handleDeleteTool}
        />
        <AddQuantityDialog
          open={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
          quantityToAdd={quantityToAdd}
          setQuantityToAdd={setQuantityToAdd}
          onConfirm={handleAddQuantityConfirm}
        />

        <RemoveQuantityDialog
          open={openRemoveDialog}
          onClose={() => setOpenRemoveDialog(false)}
          quantityToRemove={quantityToRemove}
          setQuantityToRemove={setQuantityToRemove}
          onConfirm={handleRemoveQuantityConfirm}
        />

      </NavbarDashboard>
    </>
  );
};

export default StockTools;
