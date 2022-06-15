import { Link, useLocation } from "react-router-dom";

/**
 * Home page for anyone with the assessor role
 */
function AssessorInterface() {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <h2> Assessor Interface Here </h2>
      <Link to="/teams" state={data} data-testid="assessor-teams">
        {" "}
        Teams{" "}
      </Link>
      <h3>Notifications</h3>
    </div>
  );
}

export default AssessorInterface;
