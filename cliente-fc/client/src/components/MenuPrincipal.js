import React, { useState } from 'react';
import Box from '@mui/material/Box';
import NavbarAdmin from './NavbarAdmin';
import Drawer from './Drawer';
import NavbarMenu from './Menu';

const MenuPrincipal = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    

    return (
        
        <Box component="main" sx={{ display: "flex" }}>
            <NavbarAdmin onDrawerToggle={handleDrawerToggle} />
            <Drawer open={drawerOpen} onClose={handleDrawerToggle} />
            <Box component="main" sx={{ flexGrow: 1, overflowX: "auto", flexDirection: "column", mt:7}}>
                    <NavbarMenu />         
            </Box>
        </Box>
    );
};

export default MenuPrincipal;
