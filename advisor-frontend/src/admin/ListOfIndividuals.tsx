import React from "react";
import { Link, useLocation } from "react-router-dom";

function ListOfIndividuals() {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <p> {data} view </p>
      <Link to="/admin" state={data}>
        {" "}
        Go Back to Admin Interface{" "}
      </Link>

      <h2> List of Individuals</h2>
    </div>
  );
}

export default ListOfIndividuals;
