import { Link, useLocation, useParams } from "react-router-dom";
import Button from "../../../components/Button/Button";

function Team() {
  const location = useLocation();
  const data = location.state;

  const { teamId } = useParams();

  const assessmentIds = [234, 56, 76];
  const feedbackIds = [123, 555, 23];

  return (
    <div>
      <p> {data} view </p>
      <Link to="/teams" state={data}>
        {" "}
        Go Back to List of Teams{" "}
      </Link>

      <h2 data-testid="team-id"> A Specific Team with id {teamId} </h2>
      {data === "assessor" && <p> Editable team info </p>}

      {data === "user" && <p> Non-editable team info </p>}

      <h3>List of assessors</h3>

      {data === "assessor" && <Button name="Add New Assessor" />}

      <h3>List of members</h3>

      {data === "assessor" && <Button name="Add New Member" />}

      <h3>Evaluations in progress</h3>

      {assessmentIds.map((assessmentId) => (
        <div key={`t-${teamId}-a-${assessmentId}`}>
          <Link
            to={`/teams/${teamId}/${assessmentId}`}
            state={data}
            data-testid={`team-eval-${assessmentId}`}
          >
            {" "}
            Team Evaluation with id {assessmentId}{" "}
          </Link>
          <br />
        </div>
      ))}

      <h3>Completed evaluations</h3>

      {feedbackIds.map((feedbackId) => (
        <div key={`t-${teamId}-f-${feedbackId}`}>
          <Link
            to={`/teams/${teamId}/feedback/${feedbackId}`}
            state={data}
            data-testid={`team-feedback-${feedbackId}`}
          >
            {" "}
            Team Feedback with id {feedbackId}{" "}
          </Link>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Team;
