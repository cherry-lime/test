import * as React from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid } from "@mui/material";
import  mainListItems  from "./listItems";

import INGTheme from "../../Theme";

const drawerWidth = 220;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(1),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(7),
      },
    }),
  },
}));

type SidebarProps = {
  children?: React.ReactNode;
};

const defaultProps = {
  children: null,
}

export default function Sidebar({children}: SidebarProps) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen((isOpen) => !isOpen);
  };
  return (
    <ThemeProvider theme={INGTheme}>
      <Grid sx={{ display: "flex", minHeight: "100vh" }} data-testid="Sidebar">
        <CssBaseline />
        <Drawer
          variant="permanent"
          open={open}
          PaperProps={{
            sx: {
              backgroundColor: "#9e9e9e",
            },
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={toggleDrawer}
              data-testid="DrawerButton"
              sx={{
                padding: "16px",
              }}
            >
              <MenuIcon color="info" />
            </IconButton>
          </Toolbar>
          <Divider />
          <List
            component="nav"
            sx={{
              alignItems: "center",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            width: "100vw",
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
Sidebar.defaultProps = defaultProps;