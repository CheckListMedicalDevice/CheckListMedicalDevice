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
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FireExtinguisherIcon from '@mui/icons-material/FireExtinguisher';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';

import { ReactNode, useContext } from 'react';

import { Button } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';


const drawerWidth = 240;

export default function NavbarDashboard({ children }: { children: ReactNode }) {
  const { user, removeUser } = useContext(AuthContext);
  
  const logout = () => {
    removeUser();
    const navigate: NavigateFunction = useNavigate();
    return navigate("/login");
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 ,}}>
        <Toolbar sx={{justifyContent:'space-between'}}>
          <Typography variant="h6" noWrap component="div">
            CheckListMedicalDevice
          </Typography>
          <Typography variant="body1" color="#fff">ยินดีต้อนรับคุณ {user?.firstName} {user?.lastName}</Typography>
          <Button 
          sx={{backdropClasses: 'red',color:'#fff'}}
          type="submit"
          onClick={logout}>
            Log out
          </Button>
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
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </Link>
            <Link to={'/stocktools'} style={{ textDecoration: 'none', color: '#000'}}>
              <ListItemButton >
                <ListItemIcon>
                  <CheckCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="StockTools" />
              </ListItemButton>
            </Link>
            <Link to={'/users'} style={{ textDecoration: 'none', color: '#000'}}>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </Link>
            <Link to={'/device'} style={{ textDecoration: 'none', color: '#000'}}>
              <ListItemButton>
                <ListItemIcon>
                  <MedicalInformationIcon />
                </ListItemIcon>
                <ListItemText primary="Devices" />
              </ListItemButton>
            </Link>
            <Link to={'/fires'} style={{ textDecoration: 'none', color: '#000'}}>
              <ListItemButton>
                <ListItemIcon>
                  <FireExtinguisherIcon />
                </ListItemIcon>
                <ListItemText primary="FireExtingGruisher" />
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
