import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../components/Button/Button";

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
        <div>
          <Link
            to={`/teams/team?teamid=${teamId}`}
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
