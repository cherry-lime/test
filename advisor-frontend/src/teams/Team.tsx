import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../components/Button/Button";

function Team() {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <p> {data} view </p>
      <Link to="/teams" state={data}>
        {" "}
        Go Back to List of Teams{" "}
      </Link>

      <h2> A Specific Team </h2>
      {data === "assessor" && <p> Editable team info </p>}

      {data === "user" && <p> Non-editable team info </p>}

      <h3>List of assessors</h3>

      {data === "assessor" && <Button name="Add New Assessor" />}

      <h3>List of members</h3>

      {data === "assessor" && <Button name="Add New Member" />}

      <h3>Evaluations in progress</h3>

      <h3>Completed evaluations</h3>
    </div>
  );
}

export default Team;
