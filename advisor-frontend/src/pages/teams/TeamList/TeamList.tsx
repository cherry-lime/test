import { Link, useLocation } from "react-router-dom";
import Button from "../../../components/Button/Button";

/**
 * Page with the list of teams that the user or assessor is part of
 */
function TeamList() {
  const location = useLocation();
  const data = location.state;
  const teamIds = [2, 4, 5];

  return (
    <div>
      <p> {data} view </p>

      <Link to={`/${data}`} state={data}>
        {" "}
        Go back to {data} interface{" "}
      </Link>

      <h2> List of Teams </h2>

      {data === "assessor" && <Button name="Create New Team" />}

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
  );
}

export default TeamList;
