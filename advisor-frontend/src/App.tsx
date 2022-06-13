import { Routes, Route, Link } from "react-router-dom";
import AdminInterface from "./admin/AdminInterface/AdminInterface";
import ListOfIndividuals from "./admin/ListOfIndividuals/ListOfIndividuals";
import Area from "./admin/templates/Area/Area";
import ListOfTemplates from "./admin/templates/ListOfTemplates/ListOfTemplates";
import Template from "./admin/templates/Template/Template";
import AssessorInterface from "./assessor/AssessorInterface/AssessorInterface";
import IndividualEvaluation from "./evaluations/IndividualEvaluation";
import IndividualFeedback from "./evaluations/IndividualFeedback";
import TeamEvaluation from "./evaluations/TeamEvaluation";
import TeamFeedback from "./evaluations/TeamFeedback";
import Home from "./Home";
import Team from "./teams/Team/Team";
import TeamList from "./teams/TeamList/TeamList";
import IndividualEvaluations from "./user/IndividualEvaluations/IndividualEvaluations";
import UserInterface from "./user/UserInterface/UserInterface";

function App() {
  return (
    <div className="App">
      <Link data-testid="home" to="/">
        {" "}
        Home{" "}
      </Link>
      <Link to="/user" state="user" data-testid="user">
        {" "}
        User{" "}
      </Link>
      <Link to="/assessor" state="assessor" data-testid="assessor">
        {" "}
        Assessor{" "}
      </Link>
      <Link to="/admin" state="admin" data-testid="admin">
        {" "}
        Admin{" "}
      </Link>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/user" element={<UserInterface />} />
        <Route
          path="/user/self_evaluations"
          element={<IndividualEvaluations />}
        />
        <Route
          path="/user/self_evaluations/:assessmentId"
          element={<IndividualEvaluation />}
        />
        <Route
          path="/user/self_evaluations/feedback/:assessmentId"
          element={<IndividualFeedback />}
        />

        <Route path="/teams" element={<TeamList />} />
        <Route path="/teams/:teamId" element={<Team />} />
        <Route
          path="/teams/:teamId/:assessmentId"
          element={<TeamEvaluation />}
        />
        <Route
          path="/teams/:teamId/feedback/:assessmentId"
          element={<TeamFeedback />}
        />

        <Route path="/assessor" element={<AssessorInterface />} />

        <Route path="/admin" element={<AdminInterface />} />
        <Route path="/admin/individuals" element={<ListOfIndividuals />} />
        <Route path="/admin/templates" element={<ListOfTemplates />} />
        <Route path="/admin/templates/:templateId" element={<Template />} />
        <Route path="/admin/templates/:templateId/:areaId" element={<Area />} />
      </Routes>
    </div>
  );
}

export default App;
