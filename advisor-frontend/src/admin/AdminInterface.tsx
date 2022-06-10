import { Link, useLocation, useSearchParams } from "react-router-dom";

function AdminInterface() {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <h2> Admin Interface </h2>
      <Link to="/admin/individuals" state={data} data-testid="individuals">
        {" "}
        Individuals{" "}
      </Link>

      <br />

      <Link to="/admin/templates" state={data} data-testid="templates">
        {" "}
        Templates{" "}
      </Link>
    </div>
  );
}

export default AdminInterface;
