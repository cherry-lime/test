import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { red } from "@mui/material/colors";

const iconTheme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      light: "#ff7961",
      main: "#ffffff",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

export const mainListItems = (
  <ThemeProvider theme={iconTheme}>
    <ListItemButton>
      <ListItemIcon>
        <HomeIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary="Evaluations" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <GroupsIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary="Teams" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SettingsIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary="Sign Out" />
    </ListItemButton>
  </ThemeProvider>
);

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </>
);
