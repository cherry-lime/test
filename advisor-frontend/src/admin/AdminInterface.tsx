import { Link, useLocation } from "react-router-dom";

function AdminInterface() {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <h2> Admin Interface Here </h2>
      <Link to="/admin/individuals" state={data}>
        {" "}
        Individuals{" "}
      </Link>

      <br />

      <Link to="/admin/templates" state={data}>
        {" "}
        Templates{" "}
      </Link>
    </div>
  );
}

export default AdminInterface;
