import { useEffect } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import UserInterface from "./pages/user/UserInterface/UserInterface";
import Home from "./Home";
import Evaluation from "./pages/evaluations/Evaluation/Evaluation";
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
import GlobalStyles from "./GlobalStyles";
import INGTheme from "./Theme";
import SignIn from "./components/SignInUP/SignIn";
import Chooserole from "./components/SignInUP/Chooserole";
import { RootState } from "./app/store";
import { authProfile } from "./api/LoginAPI";
import DetailGen from "./components/SignInUP/DetailGen";

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
      <Link to="/login" state="admin" data-testid="login">
        login
      </Link>
      <Link to="/example"> Examples</Link>
      <Routes>
        <Route
          path="/"
          element={
            userRole !== "NONE" ? (
              <Navigate to={`/${userRole}`} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<SignIn theme={INGTheme} />} />
        <Route path="/signup" element={<Chooserole theme={INGTheme} />} />
        <Route
          path="/signup/details"
          element={<DetailGen theme={INGTheme} />}
        />
        <Route path="/home" element={<Home />} />

        <Route path="/user" element={<UserInterface />} />
        <Route
          path="/user/self_evaluations"
          element={<ListOfSelfEvals theme={INGTheme} />}
        />
        <Route
          path="/user/self_evaluations/:assessmentId"
          element={<Evaluation team={false} theme={INGTheme} />}
        />
        <Route
          path="/user/self_evaluations/feedback/:assessmentId"
          element={<Feedback team={false} theme={INGTheme} />}
        />

        <Route path="/teams" element={<TeamList theme={INGTheme} />} />
        <Route path="/teams/:teamId" element={<Team theme={INGTheme} />} />
        <Route
          path="/teams/:teamId/:assessmentId"
          element={<Evaluation team theme={INGTheme} />}
        />
        <Route
          path="/teams/:teamId/feedback/:assessmentId"
          element={<Feedback team theme={INGTheme} />}
        />

        <Route path="/assessor" element={<AssessorInterface />} />

        <Route path="/admin" element={<AdminInterface />} />
        <Route
          path="/admin/individuals"
          element={<ListOfIndividuals theme={INGTheme} />}
        />
        <Route
          path="/admin/templates"
          element={<ListOfTemplates theme={INGTheme} />}
        />
        <Route
          path="/admin/templates/:templateId"
          element={<Template theme={INGTheme} />}
        />
        <Route
          path="/admin/templates/:templateId/:areaId"
          element={<Area theme={INGTheme} />}
        />
        <Route path="/example" element={<Example />} />
      </Routes>
    </div>
  );
}

export default App;
