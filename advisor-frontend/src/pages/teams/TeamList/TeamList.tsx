import { Link, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import ExampleButton from "../../../components/ExampleButton/ExampleButton";
import PageLayout from "../../PageLayout";
import userTypes from "../../../components/Sidebar/listUsersTypes";
import TeamGrid from "../../../components/Grids/Specific/TeamGrid";
import INGTheme from "../../../Theme";
/**
 * Page with the list of teams that the user or assessor is part of
 */
function TeamList() {
  const location = useLocation();
  const data = location.state;
  const teamIds = [2, 4, 5];

  const userId = 0;
  const userRole = "USER";

  return (
    <PageLayout title="Teams" sidebarType={userTypes.USER}>
      <Grid container direction="column" alignItems="left">
        <strong> Teams </strong>
      </Grid>
      <TeamGrid theme={INGTheme} userId={userId} userRole={userRole} />
      <div>
        <p> {data} view </p>

        <Link to={`/${data}`} state={data}>
          {" "}
          Go back to {data} interface{" "}
        </Link>

        <h2> List of Teams </h2>

        {data === "assessor" && <ExampleButton name="Create New Team" />}

        <br />

        {teamIds.map((teamId) => (
          <div key={`t-${teamId}`}>
            <Link
              to={`/teams/${teamId}`}
              state={data}
              data-testid={`team-${teamId}`}
            >
              {" "}
              Go to Team with id {teamId}{" "}
            </Link>
            <br />
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

export default TeamList;
