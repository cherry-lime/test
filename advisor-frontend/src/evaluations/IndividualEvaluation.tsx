import { Link, useLocation, useSearchParams } from "react-router-dom";

function IndividualEvaluation() {
  const location = useLocation();
  const data = location.state;
  const [searchParams, setSearchParams] = useSearchParams();
  const assessmentId = searchParams.get("assessmentid");

  return (
    <div>
      <p> {data} view </p>
      <Link to="/user/self_evaluations" state={data}>
        {" "}
        Go Back to Evaluations Page{" "}
      </Link>

      <h2> An Individual Evaluation with id {assessmentId} </h2>

      <h3>List of checkpoints</h3>
    </div>
  );
}

export default IndividualEvaluation;
