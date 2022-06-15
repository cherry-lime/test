import { Link, useLocation } from "react-router-dom";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PageLayout from "../../PageLayout";
import userTypes from "../../../components/Sidebar/listUsersTypes";
import PageCard from "../../../components/PageCard/PageCard";
import testimageFigma from "../../../components/PageCard/testimageFigma.png"

/**
 * Home page visible to anyone with the user role
 */
function UserInterface() {
  const location = useLocation();
  const data = location.state;

  return (
    <PageLayout title="Home" sidebarType={userTypes.USER}>
      <h2> User Interface Here </h2>
      <PageCard
        bodyText="This is a description for the home page card"
        headerText="Individual Evaluations"
        cardHeight="15vh"
        icon={<AssessmentIcon color="primary" fontSize="small" />}
        image={testimageFigma}
        isImageLeft
        
      />

      <Link to="/user/self_evaluations" state={data} data-testid="user-evals">
        {" "}
        Individual Evaluations{" "}
      </Link>
      <br />
      <Link to="/teams" state={data} data-testid="user-teams">
        {" "}
        Teams{" "}
      </Link>

      <h3>Progress</h3>

      <h3>Notifications</h3>
    </PageLayout>
  );
}

export default UserInterface;
