import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MuiAppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge"; // Import Badge component
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useNotificationContext } from "../../context/notification";
import ThemeToggleButton from "../Themetogglebutton";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? { ...openedMixin(theme), "& .MuiDrawer-paper": openedMixin(theme) }
    : { ...closedMixin(theme), "& .MuiDrawer-paper": closedMixin(theme) }),
}));

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const { notifications, anchorEl, handleClick, handleClose, addNotification } =
    useNotificationContext();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onLogout = () => {
    navigate("/login");
    addNotification("You Logged out See You Soon !");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#213f7e " }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              fontFamily: '"Housttely Signature", cursive',
              fontSize: "1rem",
            }}
          >
            Welcome to Stock Prices Project
          </Typography>

          {/* Notification Icon with Badge */}
          <IconButton color="inherit" onClick={handleClick}>
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <MenuItem key={index}>{notification}</MenuItem>
              ))
            ) : (
              <MenuItem>No new notifications</MenuItem>
            )}
          </Menu>

          <ThemeToggleButton />

          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography
            variant="h2"
            noWrap
            align="center"
            sx={{
              flexGrow: 1,
              fontFamily: '"Housttely Signature", cursive',
              fontSize: "1rem",
            }}
          >
            Menu
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon />
          </IconButton>
        </DrawerHeader>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/stocklist")}>
                <ListItemIcon>
                  <InventoryRoundedIcon sx={{ color: "black" }} />
                </ListItemIcon>
                <Typography
                  variant="h2"
                  noWrap
                  sx={{
                    flexGrow: 1,
                    fontFamily: '"Housttely Signature", cursive',
                    fontSize: "1rem",
                  }}
                >
                  Stock List
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/watchlist")}>
                <ListItemIcon>
                  <VisibilityIcon sx={{ color: "black" }} />
                </ListItemIcon>
                <Typography
                  variant="h2"
                  noWrap
                  sx={{
                    flexGrow: 1,
                    fontFamily: '"Housttely Signature", cursive',
                    fontSize: "1rem",
                  }}
                >
                  Watch List
                </Typography>
              </ListItemButton>
            </ListItem>
          </List>

          {/* Logout button at the bottom */}
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={onLogout}>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: "black" }} />
                </ListItemIcon>
                <Typography
                  variant="h2"
                  noWrap
                  sx={{
                    flexGrow: 1,
                    fontFamily: '"Housttely Signature", cursive',
                    fontSize: "1rem",
                  }}
                >
                  Logout
                </Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
