import { Link, useLocation, useParams } from "react-router-dom";

/**
 * Page with the feedback regarding a team
 * This should only be accessible to the users and assessors in the team
 */
function TeamFeedback() {
  const location = useLocation();
  const data = location.state;
  const { assessmentId, teamId } = useParams();

  return (
    <div>
      <p> {data} view </p>
      <Link to={`/teams/${teamId}`} state={data}>
        {" "}
        Go Back to Team{" "}
      </Link>

      <h2> A Team Evaluation Feedback for assessment with id {assessmentId}</h2>

      {data === "assessor" && <p> Evaluation Feedback can be edited </p>}

      <h3>Assessor Feedback</h3>

      <h3>List of recommendations</h3>
    </div>
  );
}

export default TeamFeedback;
