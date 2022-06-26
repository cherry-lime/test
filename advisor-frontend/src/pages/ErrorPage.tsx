import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../app/store";
import ButtonRegular from "../components/ButtonRegular/ButtonRegular";
import userTypes from "../components/Sidebar/listUsersTypes";
import PageLayout from "./PageLayout";

export default function ErrorPage() {
  const { userRole } = useSelector((state: RootState) => state.userData);
  return (
    <PageLayout title="ERROR 404" sidebarType={userTypes[userRole]}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid>
          <Typography variant="h2"> You should not be here.</Typography>
        </Grid>
        <Grid>
          <Link to="/">
            <ButtonRegular text="Go back home" />
          </Link>
        </Grid>
      </Grid>
    </PageLayout>
  );
}