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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FireExtinguisherIcon from '@mui/icons-material/FireExtinguisher';
import HomeIcon from '@mui/icons-material/Home';
import { ReactNode, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Button } from '@mui/material';

const drawerWidth = 240;

export default function Navbar({ children }: { children: ReactNode }) {
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

          <Link to={'/home'} style={{ textDecoration: 'none', color: '#000'}}>
              <ListItemButton>
                <ListItemIcon>
                <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </Link>
            
            <Link to={'/CheckPerDay'} style={{ textDecoration: 'none', color: '#000'}}>
              <ListItemButton >
                <ListItemIcon>
                  <CalendarTodayIcon />
                </ListItemIcon>
                <ListItemText primary="รายวัน" />
              </ListItemButton>
            </Link>
           
            <Link to={'/CheckPerMonth'} style={{ textDecoration: 'none', color: '#000'}}>
              <ListItemButton>
                <ListItemIcon>
                  <DateRangeIcon />
                </ListItemIcon>
                <ListItemText primary="รายเดือน" />
              </ListItemButton>
            </Link>

            <Link to={'/EverySixMonths'} style={{ textDecoration: 'none', color: '#000'}}>
              <ListItemButton>
                <ListItemIcon>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary="ทุก6เดือน" />
              </ListItemButton>
            </Link>

            <Link to={'/MapFire'} style={{ textDecoration: 'none', color: '#000'}}>
              <ListItemButton>
                <ListItemIcon>
                  <FireExtinguisherIcon />
                </ListItemIcon>
                <ListItemText primary="จุดติดตั้งถังดับเพลิง" />
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
