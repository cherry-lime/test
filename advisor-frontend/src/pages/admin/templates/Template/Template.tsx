import { Link, useLocation, useParams } from "react-router-dom";

/**
 * Page with details regarding a certain template
 * This should only be accessible to admins
 */
function Template() {
  const location = useLocation();
  const data = location.state;
  const { templateId } = useParams();
  const areaIds = [99, 88, 15];

  return (
    <div>
      <p> {data} view </p>
      <Link to="/admin/templates" state={data}>
        {" "}
        Go Back to List of Templates{" "}
      </Link>

      <h2> Template options for template id {templateId} </h2>

      {areaIds.map((areaId) => (
        <div key={`templ-${areaId}`}>
          <Link
            to={`/admin/templates/${templateId}/${areaId}`}
            state={data}
            data-testid={`template-${templateId}-a-${areaId}`}
          >
            {" "}
            Area with id {areaId}{" "}
          </Link>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Template;
