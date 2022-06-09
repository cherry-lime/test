import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import { createTheme, ThemeProvider } from "@mui/material";
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

type SidebarListProps = {
  userType: Map<string, boolean>;
};

export default function SidebarList({ userType }: SidebarListProps) {
  return (
    <ThemeProvider theme={iconTheme}>
      {userType.get("home") && (
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      )}
      {userType.get("evaluation") && (
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Evaluations" />
        </ListItemButton>
      )}
      {userType.get("teams") && (
        <ListItemButton>
          <ListItemIcon>
            <GroupsIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Teams" />
        </ListItemButton>
      )}
      {userType.get("template") && (
        <ListItemButton>
          <ListItemIcon>
            <EditIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Templates" />
        </ListItemButton>
      )}
      {userType.get("settings") && (
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      )}
      {userType.get("signout") && (
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItemButton>
      )}
    </ThemeProvider>
  );
}
