import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../features/userSlice";
import { clearDataBeforeLogout } from "../features/teamNumbersSlice";

const pages = [
    { page: "Team History", to: "team-history" },
    { page: "My History", to: "my-history" },
    { page: "Evaluations", to: "evaluations" },
    { page: "Evaluate", to: "evaluate" },
    // { page: "Activites", to: "activities" },
];
const settings = ["Account", "Logout"];

function Navbar() {
    const { isLogged, user } = useSelector((state) => state.userSlice);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const linkStyle = {
        color: "inherit",
        textDecoration: "none",
    };

    return (
        <AppBar
            position="static"
            style={{ backgroundColor: "#eee", color: "black", marginBottom: "25px" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {isLogged ? (
                        <>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", md: "flex" },
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}>
                                <Link
                                    to={"/"}
                                    style={linkStyle}>
                                    ARQAAM
                                </Link>
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit">
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: "block", md: "none" },
                                    }}>
                                    {pages.map((page, index) => (
                                        <MenuItem
                                            key={index}
                                            onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">
                                                <NavLink
                                                    to={`/${page.to}`}
                                                    style={linkStyle}>
                                                    {page.page}
                                                </NavLink>
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>

                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    mr: 2,
                                    display: { xs: "flex", md: "none" },
                                    flexGrow: 1,
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}>
                                ARQAAM
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                                {pages.map((page, index) => {
                                    if (page.page === "My History") {
                                        if (user.role === "team-leader" || user.role === "quality") return;
                                    }
                                    if (page.page === "Team History") {
                                        if (user.role === "quality") return;
                                    }
                                    if (page.page === "Evaluations") {
                                        if (user.role === "quality") return;
                                    }

                                    if (page.page === "Evaluate") {
                                        if (user.role === "agent") return;
                                    }

                                    return (
                                        <NavLink
                                            to={`/${page.to}`}
                                            style={linkStyle}
                                            key={index}>
                                            <Button
                                                onClick={handleCloseNavMenu}
                                                sx={{ my: 2, color: "black", display: "block" }}>
                                                {page.page}
                                            </Button>
                                        </NavLink>
                                    );
                                })}
                            </Box>

                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}>
                                        {/* !REMOVE */}
                                        <span style={{ fontSize: "12px", color: "red" }}>{user.role}</span>
                                        <Avatar
                                            alt={user?.name || "-"}
                                            src="/static/images/avatar/2.jpg"
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}>
                                    {settings.map((setting) => (
                                        <MenuItem
                                            key={setting}
                                            onClick={handleCloseUserMenu}>
                                            <Typography
                                                textAlign="center"
                                                onClick={() => {
                                                    dispatch(clearDataBeforeLogout());
                                                    dispatch(logout());
                                                    navigate("/login");
                                                }}>
                                                {setting}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </>
                    ) : (
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}>
                            <Link
                                to={"/"}
                                style={linkStyle}>
                                ARQAAM
                            </Link>
                        </Typography>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
