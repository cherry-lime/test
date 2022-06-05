import { Routes, Route, Link } from "react-router-dom";
import AdminInterface from "./admin/AdminInterface";
import ListOfIndividuals from "./admin/ListOfIndividuals";
import ListOfTemplates from "./admin/templates/ListOfTemplates";
import Template from "./admin/templates/Template";
import AssessorInterface from "./assessor/AssessorInterface";
import IndividualEvaluation from "./evaluations/IndividualEvaluation";
import TeamEvaluation from "./evaluations/TeamEvaluation";
import TeamFeedback from "./evaluations/TeamFeedback";
import Home from "./Home";
import Team from "./teams/Team";
import TeamList from "./teams/TeamList";
import IndividualEvaluations from "./user/IndividualEvaluations";
import UserInterface from "./user/UserInterface";

function App() {
  return (
    <div className="App">
      <Link to="/"> Home </Link>
      <Link to="/user" state="user">
        {" "}
        User{" "}
      </Link>
      <Link to="/assessor" state="assessor">
        {" "}
        Assessor{" "}
      </Link>
      <Link to="/admin" state="admin">
        {" "}
        Admin{" "}
      </Link>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/user" element={<UserInterface />} />
        <Route
          path="/user/individual-evals"
          element={<IndividualEvaluations />}
        />
        <Route
          path="/user/individual-evals/evaluation"
          element={<IndividualEvaluation />}
        />

        <Route path="/teams" element={<TeamList />} />
        <Route path="/teams/a-team" element={<Team />} />
        <Route path="/teams/a-team/evaluation" element={<TeamEvaluation />} />
        <Route path="/teams/a-team/feedback" element={<TeamFeedback />} />

        <Route path="/assessor" element={<AssessorInterface />} />

        <Route path="/admin" element={<AdminInterface />} />
        <Route path="/admin/individuals" element={<ListOfIndividuals />} />
        <Route path="/admin/templates" element={<ListOfTemplates />} />
        <Route path="/admin/templates/template" element={<Template />} />
      </Routes>
    </div>
  );
}

export default App;
