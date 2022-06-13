import { Link, useLocation, useParams } from "react-router-dom";

/**
 * Page with a self evaluation that can be filled in
 * This should only be accessible to the user whose assement this belongs to
 */
function IndividualEvaluation() {
  const location = useLocation();
  const data = location.state;
  const { assessmentId } = useParams();

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
