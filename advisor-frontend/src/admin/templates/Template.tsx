import React from "react";
import { Link, useLocation } from "react-router-dom";

function Template() {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <p> {data} view </p>
      <Link to="/admin/templates" state={data}>
        {" "}
        Go Back to List of Templates{" "}
      </Link>

      <h2> Template options </h2>
    </div>
  );
}

export default Template;
