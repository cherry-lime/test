import React from "react";
import { Link, useLocation } from "react-router-dom";

function ListOfTemplates() {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <p> {data} view </p>
      <Link to="/admin" state={data}>
        {" "}
        Go Back to Admin Interface{" "}
      </Link>

      <h2> List of Templates</h2>

      <Link to="/admin/templates/template" state={data}>
        {" "}
        Template{" "}
      </Link>
    </div>
  );
}

export default ListOfTemplates;
