import { Stack } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { Routes, Route, Link } from "react-router-dom";
import testimageFigma from "./components/PageCard/testimageFigma.png";
import logo from "./logo.svg";
import "./App.css";
import ButtonRegular from "./components/ButtonRegular/ButtonRegular";
import ButtonInverted from "./components/ButtonInverted/ButtonInverted";
import Checkpoint from "./components/Checkpoint/Checkpoint";
import TextfieldEdit from "./components/TextfieldEdit/TextfieldEdit";
import Textfield from "./components/Textfield/Textfield";
import PageCard from "./components/PageCard/PageCard";
import AdminInterface from "./pages/admin/AdminInterface/AdminInterface";
import ListOfIndividuals from "./pages/admin/ListOfIndividuals/ListOfIndividuals";
import Area from "./pages/admin/templates/Area/Area";
import ListOfTemplates from "./pages/admin/templates/ListOfTemplates/ListOfTemplates";
import Template from "./pages/admin/templates/Template/Template";
import AssessorInterface from "./pages/assessor/AssessorInterface";
import IndividualEvaluation from "./pages/evaluations/IndividualEvaluation";
import IndividualFeedback from "./pages/evaluations/IndividualFeedback";
import TeamEvaluation from "./pages/evaluations/TeamEvaluation";
import TeamFeedback from "./pages/evaluations/TeamFeedback";
import Home from "./Home";
import Team from "./pages/teams/Team/Team";
import TeamList from "./pages/teams/TeamList/TeamList";
import UserInterface from "./pages/user/UserInterface/UserInterface";
import AllPages from "./pages/AllPages";
import ListOfSelfEvals from "./pages/user/ListOfSelfEvals/ListOfSelfEvals";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Stack spacing={3}>
          {/* all components are listed once as an example with parameters if applicable */}
          <ButtonRegular text="Regular Button" />
          <ButtonInverted text="Inverted Button" />
          <Checkpoint description="Checkpoint Description" />
          <TextfieldEdit text="Here is some text that can be edited" />
          <Textfield text="Here is some text that can not be edited" />
          <p />
        </Stack>
        <PageCard
          bodyText="This is a description for the home page card"
          headerText="Title"
          cardHeight={125}
          icon={<AssessmentIcon color="primary" fontSize="small" />}
          image={testimageFigma}
          isImageLeft
          isImageRight
        />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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
      <AllPages />
    </div>
  );
}

export default App;
