import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import MenuList from './menu';
import { IconButton, styled } from '@mui/material';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    overflow: 'hidden',
    // height: window.innerHeight,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

export default function TemporaryDrawer(props) {
    const { state, setState } = props

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState(open);
    };

    return (
        <div>
            <React.Fragment key={'anchor'}>
                <Drawer
                    anchor={'left'}
                    open={state}
                    onClose={toggleDrawer(false)}
                >
                    <DrawerHeader>
                        <IconButton>
                            {/* {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
                        </IconButton>
                    </DrawerHeader>
                    <MenuList toggleDrawer={toggleDrawer} />
                </Drawer>
            </React.Fragment>
        </div>
    );
}