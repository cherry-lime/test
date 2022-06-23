import { Link, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import UserInterface from "./pages/user/UserInterface/UserInterface";
import Home from "./Home";
import IndividualEvaluation from "./pages/evaluations/IndividualEvaluation";
import ListOfSelfEvals from "./pages/user/ListOfSelfEvals/ListOfSelfEvals";
import IndividualFeedback from "./pages/evaluations/IndividualFeedback";
import TeamList from "./pages/teams/TeamList/TeamList";
import Team from "./pages/teams/Team/Team";
import TeamEvaluation from "./pages/evaluations/TeamEvaluation";
import TeamFeedback from "./pages/evaluations/TeamFeedback";
import AssessorInterface from "./pages/assessor/AssessorInterface";
import AdminInterface from "./pages/admin/AdminInterface/AdminInterface";
import ListOfTemplates from "./pages/admin/templates/ListOfTemplates/ListOfTemplates";
import ListOfIndividuals from "./pages/admin/ListOfIndividuals/ListOfIndividuals";
import Area from "./pages/admin/templates/Area/Area";
import Template from "./pages/admin/templates/Template/Template";
import GlobalStyles from "./GlobalStyles";
import SignIn from "./components/SignInUP/SignIn";
import Chooserole from "./components/SignInUP/Chooserole";
import { RootState } from "./app/store";
import { authProfile } from "./app/loginAPI";

function App() {
  // Import the global state variables that will be used throughout the session
  const { userRole } = useSelector((state: RootState) => state.userData);
  // Call authentication API on pageload once
  const auth = authProfile();
  useEffect(() => auth.mutate(), []);
  return (
    <div className="App">
      <GlobalStyles />
      <Link data-testid="home" to="/home">
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
      <Link to="/login" state="admin" data-testid="admin">
        login
      </Link>
      <Routes>
        <Route
          path="/"
          element={
            userRole !== "" ? (
              <Navigate to={`/${userRole}`} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Chooserole />} />
        <Route path="/home" element={<Home />} />

        <Route path="/user" element={<UserInterface />} />
        <Route path="/user/self_evaluations" element={<ListOfSelfEvals />} />
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
