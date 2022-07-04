import { useEffect, useRef } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import UserInterface from "./pages/user/UserInterface/UserInterface";
import Evaluation from "./pages/evaluations/Evaluation/Evaluation";
import ListOfSelfEvals from "./pages/user/ListOfSelfEvals/ListOfSelfEvals";
import Feedback from "./pages/evaluations/Feedback/Feedback";
import TeamList from "./pages/teams/TeamList/TeamList";
import Team from "./pages/teams/Team/Team";
import AssessorInterface from "./pages/assessor/AssessorInterface";
import AdminInterface from "./pages/admin/AdminInterface/AdminInterface";
import ListOfTemplates from "./pages/admin/templates/ListOfTemplates/ListOfTemplates";
import ListOfIndividuals from "./pages/admin/ListOfIndividuals/ListOfIndividuals";
import Area from "./pages/admin/templates/Area/Area";
import Template from "./pages/admin/templates/Template/Template";
import GlobalStyles from "./GlobalStyles";
import INGTheme from "./Theme";
// import SignIn from "./components/SignInUP/SignIn";
// import Chooserole from "./components/SignInUP/Chooserole";
// import DetailGen from "./components/SignInUP/DetailGen";
import { RootState } from "./app/store";
import { authProfile } from "./api/LoginAPI/LoginAPI";

import ErrorPopup, {
  getOnError,
  RefObject,
} from "./components/ErrorPopup/ErrorPopup";
import ErrorPage from "./pages/ErrorPage";
import { SignIn, Chooserole, DetailGen } from "./components/SignInUP/index";

// type declaration for appProp that (possibly) assigns a boolean value to testRender
type appProp = {
  testRender?: boolean;
};
// constant declaration for defaultProps that assigns the value of testRender to false
const defaultProps = {
  testRender: false,
};
/**
 *
 * This component is the root element for the React application.
 * @param testRender Used to manually trigger the routing for unit tests
 * @return The base application component, consisting of all the logic and components for the webapp
 */
function App({ testRender }: appProp) {
  // Import the global state variables that will be used throughout the session
  const { userRole } = useSelector((state: RootState) => state.userData);

  // Ref for error popup
  const refErrorApp = useRef<RefObject>(null);
  const onErrorApp = getOnError(refErrorApp);

  // Call authentication API on pageload once
  const auth = authProfile(onErrorApp);
  useEffect(() => {
    auth.mutate();
  }, []);

  // If the authentication is done, render the routing
  if (auth.isSuccess || auth.isError || testRender) {
    return (
      <div className="App" data-testid="appTest">
        <GlobalStyles />
        {/* Define the routes to each webpage */}
        <Routes>
          {/* Check if the user is logged in, when he accesses the site the first time.
          Redirect to home if the user is already logged in. */}
          <Route
            path="/login"
            element={
              userRole !== "NONE" ? (
                <Navigate to={`/${userRole}`} />
              ) : (
                <SignIn />
              )
            }
          />
          <Route path="/signup" element={<Chooserole />} />
          <Route path="/signup/details" element={<DetailGen />} />
          {/* Only route to the user pages if the user has USER rights */}
          {userRole === "USER" ? (
            <>
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
            </>
          ) : (
            <> </>
          )}
          {/* Only route to the teams pages if the user has USER or ASSESSOR rights */}
          {userRole === "USER" || userRole === "ASSESSOR" ? (
            <>
              <Route path="/teams" element={<TeamList theme={INGTheme} />} />
              <Route
                path="/teams/:teamId"
                element={<Team theme={INGTheme} />}
              />
              <Route
                path="/teams/:teamId/:assessmentId"
                element={<Evaluation team theme={INGTheme} />}
              />
              <Route
                path="/teams/:teamId/feedback/:assessmentId"
                element={<Feedback team theme={INGTheme} />}
              />
            </>
          ) : (
            <> </>
          )}
          {/* Only route to the assessor pages if the user has ASSESSOR rights */}
          {userRole === "ASSESSOR" ? (
            <Route path="/assessor" element={<AssessorInterface />} />
          ) : (
            <> </>
          )}
          {/* Only route to the admin pages if the user has ADMIN rights */}
          {userRole === "ADMIN" ? (
            <>
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
            </>
          ) : (
            <> </>
          )}
          {/* The root page of the routing hierachy.
          Based on if the user is logged in, he sees the login page, or the home page */}
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
          {/* Redirect to an Error page if there is an invalid URL.
          If the user is not logged in, any invalid page will redirect to the login-enabled pages. */}
          <Route
            path="/*"
            element={
              userRole !== "NONE" ? (
                <Navigate to="/error" />
              ) : (
                <>
                  <Navigate to="/login" />{" "}
                </>
              )
            }
          />
          {/* Declare the error page URL address */}
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
        {/* Render the error popup component, in case of an API error  */}
        <ErrorPopup ref={refErrorApp} />
      </div>
    );
  }
  // If the authentication is in progress, show blank page
  return (
    <div className="App" data-testid="emptyPage">
      {" "}
    </div>
  );
}
// Define the default props for the testRender variable
App.defaultProps = defaultProps;

// Export the App component
export default App;
