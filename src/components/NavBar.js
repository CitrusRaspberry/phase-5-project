import { useState } from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";


const pages = ["Home", "How It Works", "Add Your Own", "For Developers"];
const styleLinkToPlain = { color: "inherit", textDecoration: "none" };
const getPathFrom = page => {
    switch (page.toLowerCase()) {
        case "home":
            return "/";
        default:
            return page.toLowerCase().replace(/ /g, "-");
    }
}

function NavBar() {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const list = () => (
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
                        <Link key={page} style={styleLinkToPlain} to={path}>
                            <ListItem button>
                                <ListItemText primary={page} />
                            </ListItem>
                        </Link>
                    );
                })}
            </List>
        </Box>
    );

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                    >
                        LOGO
                    </Typography>
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
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" }
                        }}
                    >
                        LOGO
                    </Typography>
                    <Drawer
                        anchor={"left"}
                        open={drawerIsOpen}
                        onClose={() => setDrawerIsOpen(false)}
                    >
                        {list()}
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
                                <Link
                                    key={page}
                                    style={styleLinkToPlain}
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
                                </Link>
                            );
                        })}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;
