import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";

import NavBarSpacer from "./NavBarSpacer";
import styled from "styled-components";


const pages = ["Home", "How It Works", "Create Your Own", "Community Lexicons", "For Developers"];
const getPathFrom = page => {
    switch (page.toLowerCase()) {
        case "home":
            return "/";
        default:
            return page.toLowerCase().replace(/ /g, "-");
    }
}

const CenterLogo = styled(Box)`
height: 50px;
position: absolute;
left: 50%;
transform: translateX(-50%);
`
const LeftLogo = styled(Box)`
height: 50px;
margin-right: 10px;
`

const PlainLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`


function NavBar() {
    const [ drawerIsOpen, setDrawerIsOpen ] = useState(false);
    const [ navBarHeight, setNavBarHeight ] = useState(0)
    const appBarRef = useRef();
    
    useEffect(() => {
        setNavBarHeight(appBarRef.current.offsetHeight)
    }, [appBarRef])
    
    return (
        <>
        <NavBarSpacer height={navBarHeight} />
        <AppBar ref={appBarRef}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/">
                    <LeftLogo
                        src="./fwm_logo_white.png"
                        component="img"
                        sx={{ display: { xs: "none", md: "flex" } }}
                    />
                    </Link>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => setDrawerIsOpen(true)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                    <CenterLogo
                        src="./fwm_logo_white.png"
                        component="img"
                        sx={{display: { xs: "flex", md: "none" }}}
                    />
                    <Drawer
                        anchor={"left"}
                        open={drawerIsOpen}
                        onClose={() => setDrawerIsOpen(false)}
                    >
                        <Box
                            sx={{ width: 250 }}
                            role="presentation"
                            onClick={() => setDrawerIsOpen(false)}
                            onKeyDown={() => setDrawerIsOpen(false)}
                        >
                            <List>
                                {pages.map((page) => {
                                    const path = getPathFrom(page);
                                    return (
                                        <PlainLink key={page} to={path}>
                                            <ListItem button>
                                                <ListItemText primary={page} />
                                            </ListItem>
                                        </PlainLink>
                                    );
                                })}
                            </List>
                        </Box>
                    </Drawer>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => {
                            const path = getPathFrom(page);
                            return (
                                <PlainLink
                                    key={page}
                                    to={path}
                                >
                                    <Button
                                        key={page}
                                        sx={{
                                            my: 2,
                                            color: "white",
                                            display: "block",
                                        }}
                                    >
                                        {page}
                                    </Button>
                                </PlainLink>
                            );
                        })}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        </>
    );
}

export default NavBar;
