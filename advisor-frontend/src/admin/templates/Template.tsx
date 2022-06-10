import { Link, useLocation, useSearchParams } from "react-router-dom";

function Template() {
  const location = useLocation();
  const data = location.state;
  const [searchParams, setSearchParams] = useSearchParams();
  const templateId = searchParams.get("templateid");

  return (
    <div>
      <p> {data} view </p>
      <Link to="/admin/templates" state={data}>
        {" "}
        Go Back to List of Templates{" "}
      </Link>

      <h2> Template options for template id {templateId} </h2>
    </div>
  );
}

export default Template;
