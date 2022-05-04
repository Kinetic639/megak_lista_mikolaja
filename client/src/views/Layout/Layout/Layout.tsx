import React from 'react';
import Box from '@mui/material/Box';
import {motion} from "framer-motion"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Appbar} from "../Appbar/Appbar";

import './Layout.scss'
import {PermanentDrawer} from "../../../components/Drawer/Drawer";
import Typography from "@mui/material/Typography";

export const Layout = ({children}) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = ()  => {
        setMobileOpen(!mobileOpen);
    };

    const drawerWidth = 180;
    const animations = {
        initial: {opacity: 0, y: 50},
        animate: {opacity: 1, y: 0},
        exit: {opacity: 0, y: -50},
    }
    return (
        <Box
            sx={{display: 'flex'}}
        >

            <Appbar mobileOpen={mobileOpen} drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle}>
                Santa's Gifts List
            </Appbar>
            <PermanentDrawer width={drawerWidth} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
            <Box
                component="main"
                className='layout__main'
                sx={{flexGrow: 1, p: 3}}
            >
                <motion.div variants={animations} initial="initial" animate="animate" exit="exit">
                    {children}
                </motion.div>
            </Box>
        </Box>
    )
}
