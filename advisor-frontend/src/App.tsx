import { Routes, Route, Link } from "react-router-dom";
import AdminInterface from "./admin/AdminInterface";
import AssessorInterface from "./assessor/AssessorInterface";
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
      <Link to="/admin"> Admin </Link>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/user" element={<UserInterface />} />
        <Route
          path="/user/individual-evals"
          element={<IndividualEvaluations />}
        />

        <Route path="/teams" element={<TeamList />} />
        <Route path="/teams/a-team" element={<Team />} />

        <Route path="/assessor" element={<AssessorInterface />} />
        <Route path="/admin" element={<AdminInterface />} />
      </Routes>
    </div>
  );
}

export default App;
