import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../app/store";

type SidebarListProps = {
  userType: Map<string, boolean>;
};

export default function SidebarList({ userType }: SidebarListProps) {
  const { userRole } = useSelector((state: RootState) => state.userData);
  return (
    <>
      {userType.get("home") && (
          <ListItemButton component={Link} to={`/${userRole}`}>
            <ListItemIcon>
              <HomeIcon color="info" />
            </ListItemIcon>
            <ListItemText primary="Home" style={{ color: "background" }} />
          </ListItemButton>
      )}
      {userType.get("evaluation") && (
        <ListItemButton component={Link} to={`/${userRole}/self_evaluations`}>
          <ListItemIcon>
            <BarChartIcon color="info" />
          </ListItemIcon>
          <ListItemText primary="Evaluations" style={{ color: "background" }} />
        </ListItemButton>
      )}
      {userType.get("teams") && (
        <ListItemButton component={Link} to='/teams'>
          <ListItemIcon>
            <GroupsIcon color="info" />
          </ListItemIcon>
          <ListItemText primary="Teams" style={{ color: "background" }} />
        </ListItemButton>
      )}
      {userType.get("template") && (
        <ListItemButton component={Link} to={`/${userRole}`}>
          <ListItemIcon>
            <EditIcon color="info" style={{ color: "background" }} />
          </ListItemIcon>
          <ListItemText primary="Templates" />
        </ListItemButton>
      )}
      {userType.get("settings") && (
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <SettingsIcon color="info" />
          </ListItemIcon>
          <ListItemText primary="Settings" style={{ color: "background" }} />
        </ListItemButton>
      )}
      {userType.get("signout") && (
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <LogoutIcon color="info" />
          </ListItemIcon>
          <ListItemText primary="Sign Out" style={{ color: "background" }} />
        </ListItemButton>
      )}
    </>
  );
}
