import { Link, useLocation } from "react-router-dom";

/**
 * Page listing all users registered in the tool
 * This page should only be accessible to admins
 */
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
