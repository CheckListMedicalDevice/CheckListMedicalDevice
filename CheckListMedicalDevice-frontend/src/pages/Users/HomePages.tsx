import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { ITools } from "../../interfaces/tools.interface";
import dayjs from "dayjs";
import "dayjs/locale/th";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { axiosInstance } from "../../axiosRequest";
import { Typography, TableContainer, Paper, Box, Table, TableHead, TableRow, TableCell, TableBody, Button, TablePagination } from "@mui/material";


import RemoveQuantityDialog from "../../components/RemoveQuantityDialog";
import Search from "../../components/Search";


function HomePages() {
  const [listTools, setListTools] = useState<ITools[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [quantityToRemove, setQuantityToRemove] = useState("");
  const [toolToRemove, setToolToRemove] = useState<number | null>(null);

  dayjs.extend(localizedFormat);
  dayjs.locale("th");

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

  

  return (
    <>
    <Navbar>
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
                   
                    <TableCell align="center">นำไปใช้</TableCell>
                    
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
                         
                          <Button
                            variant="outlined"
                            color="warning"
                            onClick={() => {
                              setToolToRemove(item.id)
                              setOpenRemoveDialog(true);
                            }}
                          >
                            ใช้งาน
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
       
     
       

        <RemoveQuantityDialog
          open={openRemoveDialog}
          onClose={() => setOpenRemoveDialog(false)}
          quantityToRemove={quantityToRemove}
          setQuantityToRemove={setQuantityToRemove}
          onConfirm={handleRemoveQuantityConfirm}
        />

      </Navbar></>
  );
}

export default HomePages;
