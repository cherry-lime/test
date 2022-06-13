import { Link, useLocation } from "react-router-dom";

function ListOfSelfEvals() {
  const location = useLocation();
  const data = location.state;
  const assessmentIds = [43, 67, 40];
  const feedbackIds = [35, 66, 39];

  return (
    <div>
      <h2> Individual Evaluations Page </h2>

      <Link to="/user" state={data}>
        {" "}
        Go Back to User Interface{" "}
      </Link>

      <h3>List of evaluations</h3>

      {assessmentIds.map((assessmentId) => (
        <div key={`se-${assessmentId}`}>
          <Link
            to={`/user/self_evaluations/${assessmentId}`}
            state={data}
            data-testid={`user-eval-${assessmentId}`}
          >
            {" "}
            Evaluation with id {assessmentId}{" "}
          </Link>
          <br />
        </div>
      ))}

      {feedbackIds.map((feedbackId) => (
        <div key={`f-${feedbackId}`}>
          <Link
            to={`/user/self_evaluations/feedback/${feedbackId}`}
            state={data}
            data-testid={`user-feedback-${feedbackId}`}
          >
            {" "}
            Completed Evaluation with id {feedbackId}{" "}
          </Link>
          <br />
        </div>
      ))}
    </div>
  );
}

export default ListOfSelfEvals;
