import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

type SidebarListProps = {
  userType: Map<string, boolean>;
};

export default function SidebarList({ userType }: SidebarListProps) {
  return (
    <>
      {userType.get("home") && (
        <Link to="/">
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon color="info" />
            </ListItemIcon>
            <ListItemText primary="Home" style={{ color: "background" }} />
          </ListItemButton>
        </Link>
      )}
      {userType.get("evaluation") && (
        <Link to="/user/self_evaluations">
          <ListItemButton>
            <ListItemIcon>
              <BarChartIcon color="info" />
            </ListItemIcon>
            <ListItemText
              primary="Evaluations"
              style={{ color: "background" }}
            />
          </ListItemButton>
        </Link>
      )}
      {userType.get("teams") && (
        <Link to="/teams">
          <ListItemButton>
            <ListItemIcon>
              <GroupsIcon color="info" />
            </ListItemIcon>
            <ListItemText primary="Teams" style={{ color: "background" }} />
          </ListItemButton>
        </Link>
      )}
      {userType.get("template") && (
        <ListItemButton>
          <ListItemIcon>
            <EditIcon color="info" style={{ color: "background" }} />
          </ListItemIcon>
          <ListItemText primary="Templates" />
        </ListItemButton>
      )}
      {userType.get("settings") && (
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon color="info" />
          </ListItemIcon>
          <ListItemText primary="Settings" style={{ color: "background" }} />
        </ListItemButton>
      )}
      {userType.get("signout") && (
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon color="info" />
          </ListItemIcon>
          <ListItemText primary="Sign Out" style={{ color: "background" }} />
        </ListItemButton>
      )}
    </>
  );
}
