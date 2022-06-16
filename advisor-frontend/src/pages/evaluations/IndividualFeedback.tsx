import { Link, useLocation, useParams } from "react-router-dom";

/**
 * Page with the feedback related to a self assessment
 * This should only be accessible to the user whose assement this belongs to
 */
function IndividualFeedback() {
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

      <h2> Recommendations for assessment with id {assessmentId} </h2>

      <h3>List of recommendations</h3>
    </div>
  );
}

export default IndividualFeedback;
