import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { ReactNode } from 'react';


const drawerWidth = 240;

export default function NavbarTools({ children }: { children: ReactNode }) {
  


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 ,}}>
        <Toolbar sx={{justifyContent:'space-between'}}>
          <Typography variant="h6" noWrap component="div">
            Stock Item
          </Typography>
          <Typography variant="body1" color="#fff"></Typography>

        </Toolbar>
        
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List sx={{ textDecoration: 'none', color: '#000'}}>

          <Link to={'/dashboard'} style={{ textDecoration: 'none', color: '#000'}}>
              <ListItemButton>
                <ListItemIcon>
                <SpaceDashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </Link>
            
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
        <Toolbar />
        {children} 
      </Box>
    </Box>
  );
}