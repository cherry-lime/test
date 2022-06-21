import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import UserInterface from "./pages/user/UserInterface/UserInterface";
import Home from "./Home";
import Evaluation from "./pages/evaluations/Evaluation";
import ListOfSelfEvals from "./pages/user/ListOfSelfEvals/ListOfSelfEvals";
import Feedback from "./pages/evaluations/Feedback";
import TeamList from "./pages/teams/TeamList/TeamList";
import Team from "./pages/teams/Team/Team";
import AssessorInterface from "./pages/assessor/AssessorInterface";
import AdminInterface from "./pages/admin/AdminInterface/AdminInterface";
import ListOfTemplates from "./pages/admin/templates/ListOfTemplates/ListOfTemplates";
import ListOfIndividuals from "./pages/admin/ListOfIndividuals/ListOfIndividuals";
import Area from "./pages/admin/templates/Area/Area";
import Template from "./pages/admin/templates/Template/Template";
import Example from "./pages/ExamplePage";

function App() {
  return (
    <div className="App">
      <Link data-testid="home" to="/">
        Home
      </Link>
      <Link to="/user" state="user" data-testid="user">
        User
      </Link>
      <Link to="/assessor" state="assessor" data-testid="assessor">
        Assessor
      </Link>
      <Link to="/admin" state="admin" data-testid="admin">
        Admin
      </Link>
      <Link to="/example"> Examples</Link>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/user" element={<UserInterface />} />
        <Route path="/user/self_evaluations" element={<ListOfSelfEvals />} />
        <Route
          path="/user/self_evaluations/:assessmentId"
          element={<Evaluation team={false} />}
        />
        <Route
          path="/user/self_evaluations/feedback/:assessmentId"
          element={<Feedback team={false} />}
        />

        <Route path="/teams" element={<TeamList />} />
        <Route path="/teams/:teamId" element={<Team />} />
        <Route
          path="/teams/:teamId/:assessmentId"
          element={<Evaluation team />}
        />
        <Route
          path="/teams/:teamId/feedback/:assessmentId"
          element={<Feedback team />}
        />

        <Route path="/assessor" element={<AssessorInterface />} />

        <Route path="/admin" element={<AdminInterface />} />
        <Route path="/admin/individuals" element={<ListOfIndividuals />} />
        <Route path="/admin/templates" element={<ListOfTemplates />} />
        <Route path="/admin/templates/:templateId" element={<Template />} />
        <Route path="/admin/templates/:templateId/:areaId" element={<Area />} />
        <Route path="/example" element={<Example />} />
      </Routes>
    </div>
  );
}

export default App;
