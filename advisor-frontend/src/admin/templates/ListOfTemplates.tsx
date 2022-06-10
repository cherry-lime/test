import React from "react";
import { Link, useLocation } from "react-router-dom";

function ListOfTemplates() {
  const location = useLocation();
  const data = location.state;
  const templateIds = [21, 32, 5];

  return (
    <div>
      <p> {data} view </p>
      <Link to="/admin" state={data}>
        {" "}
        Go Back to Admin Interface{" "}
      </Link>

      <h2> List of Templates</h2>

      {templateIds.map((templateId) => (
        <div>
          <Link
            to={`/admin/templates/template?templateid=${templateId}`}
            state={data}
            data-testid={`template-${templateId}`}
          >
            {" "}
            Template with id {templateId}{" "}
          </Link>
          <br />
        </div>
      ))}
    </div>
  );
}

export default ListOfTemplates;
