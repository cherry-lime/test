import { Link, useLocation } from "react-router-dom";

/**
 * Home page visible to anyone with the user role
 */
function UserInterface() {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <h2> User Interface Here </h2>

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
    </div>
  );
}

export default UserInterface;
