import { Link, useLocation, useParams } from "react-router-dom";

/**
 * Page with details regarding an area beloging to a certain template
 * This should only be accessible to admins
 */
function Area() {
  const location = useLocation();
  const data = location.state;
  const { templateId } = useParams();
  const { areaId } = useParams();

  return (
    <div>
      <p> {data} view </p>
      <Link to={`/admin/templates/${templateId}`} state={data}>
        {" "}
        Go Back to Template{" "}
      </Link>

      <h2> Area with id {areaId} </h2>
    </div>
  );
}

export default Area;
