import React from "react";

import {
  AppBar as MuiAppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Close as CloseIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

import CInput from "../controls/CInput/CInput";
import CButton from "../controls/CButton/CButton";
import CInfoUser from "../controls/InfoUser/CInfoUser";
import CNavbar from "./CNavbar";
import logo from "../../assets/images/logo.png";

import * as routes from "@/routes/constant";

const drawerWidth = 320;
const drawerWidthSmall = 100;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  // width: `calc(100% - ${drawerWidthSmall}px)`,
  width: "100%",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    width: "100%",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function CHeader(props) {
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  return (
    <AppBar id="header" className="header" position="fixed" open={props.open}>
      <Toolbar>
        <Box className="header-logo">
          <img className="header_logo_img filter" src={logo} alt="logo" />
          <Box className="header-title">
            {window.location.pathname == routes.FACERECOGNITION.LIST.path &&
              routes.FACERECOGNITION.LIST.title}
          </Box>
        </Box>
        <Box className="header-info">
          <Box className="header-info-noti">
            <IconButton>
              <NotificationsIcon />
            </IconButton>
          </Box>
          <CInfoUser />
          <Box className="sidebar-mobile">
            <IconButton
              onClick={toggleDrawer(true)}
              className="sidebar-mobile-button"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              id="sidebar-mobile-drawer"
              open={state}
              onClose={toggleDrawer(false)}
            >
              <Box role="presentation" onKeyDown={toggleDrawer(false)}>
                <IconButton
                  className="sidebar-mobile-drawer-close"
                  onClick={toggleDrawer(false)}
                >
                  <CloseIcon />
                </IconButton>
                <CNavbar
                  open={props.open}
                  closeSidebarMobile={toggleDrawer(false)}
                ></CNavbar>
              </Box>
            </Drawer>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default CHeader;
