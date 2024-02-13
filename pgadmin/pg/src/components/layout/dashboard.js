import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom';
import Slider from './drawer/slide';
import TemporaryDrawer from './drawer/swipe';
import postgres from '../../components/images/postgres.png'
import { Avatar } from '@mui/material';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

export default function Dashboard() {
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState(false)

    const handleDrawerOpen = () => {
        window.innerWidth >= 768 ? setOpen(true) : setState(true);
    };

    const handleDrawerClose = () => {
        window.innerWidth >= 768 ? setOpen(false) : setState(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={open ? handleDrawerClose : handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            // ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Avatar
                        alt="Remy Sharp"
                        src={postgres}
                        
                        sx={{ width: 36, height: 36 }}
                    />
                </Toolbar>
            </AppBar>
            {
                window.innerWidth >= 768 ?
                    <Slider open={open} handleDrawerClose={handleDrawerClose} />
                    :
                    <TemporaryDrawer state={state} setState={setState} />
            }
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
}