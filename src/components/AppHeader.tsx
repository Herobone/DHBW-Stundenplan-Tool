import {AppBar, Box, Container, Drawer, Toolbar, Typography} from "@mui/material";
import React from "react";
import {Adb as AdbIcon} from "@mui/icons-material";
import MobileNavDrawer from "@/components/MobileNavDrawer";
import Navigation from "@/components/Navigation";
import {Defaults} from "@/appDefaults"

export default function AppHeader() {

    return (
        <>
            <AppBar position="fixed" sx={{zIndex: {sm: 1300}}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{flexGrow: 1, display: "flex"}}>
                            <MobileNavDrawer/>
                            <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                            <Typography
                                variant="h4"
                                noWrap
                                sx={{
                                    mr: 2,
                                    fontFamily: 'var(--font-roboto)',
                                    fontWeight: 700,
                                    letterSpacing: '.1rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                {Defaults.appName}
                            </Typography>

                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <div id="navigation-drawer-anchor"/>
            <Box
                sx={{display: {xs: 'none', sm: 'block'}, width: {sm: Defaults.drawerWidth}, flexShrink: {sm: 0}}}
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: Defaults.drawerWidth},
                    }}
                    open
                >
                    <Navigation/>
                </Drawer>
            </Box>
        </>
    );
}
