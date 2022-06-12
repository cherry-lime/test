import { Link, useLocation, useParams } from "react-router-dom";

function TeamEvaluation() {
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

      <h2> A Team Evaluation with id {assessmentId} </h2>

      {data === "assessor" && <p> Evaluation can be edited </p>}

      {data === "user" && <p> Evaluation cannot be edited </p>}

      <h3>List of checkpoints</h3>
    </div>
  );
}

export default TeamEvaluation;
