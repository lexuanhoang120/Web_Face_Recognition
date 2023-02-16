import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';

import CNavbar from '../CNavbar';
import CHeader from '../CHeader';

// const drawerWidth = 320;
// const drawerWidthSmall = 100;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const MainLayout = (props) => {
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box className="home" sx={{ display: 'flex' }}>
            <CssBaseline />
            <CHeader open={open} />
            <CNavbar
                open={open}
                handleDrawerClose={handleDrawerClose}
                handleDrawerOpen={handleDrawerOpen}
            />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Box className="home__content__page">{props.children}</Box>
            </Box>
        </Box>
    );
};

export default MainLayout;
