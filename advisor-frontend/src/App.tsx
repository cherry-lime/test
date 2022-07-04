import { useEffect, useRef } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import GlobalStyles from "./GlobalStyles";
import { RootState } from "./app/store";
import { authProfile } from "./api/LoginAPI/LoginAPI";
import ErrorPopup, {
  getOnError,
  RefObject,
} from "./components/ErrorPopup/ErrorPopup";
import ErrorPage from "./pages/ErrorPage";
import { SignIn, Chooserole, DetailGen } from "./components/SignInUP/index";
import { userRoutes } from "./routes/UserRoutes";
import { userAssessorRoutes } from "./routes/UserAssessorRoutes";
import { assessorRoutes } from "./routes/AssessorRoutes";
import { adminRoutes } from "./routes/AdminRoutes";

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
          {userRole === "USER" ? userRoutes : <></>}
          {/* Only route to the teams pages if the user has USER or ASSESSOR rights */}
          {userRole === "USER" || userRole === "ASSESSOR" ? userAssessorRoutes : <></>}
          {/* Only route to the assessor pages if the user has ASSESSOR rights */}
          {userRole === "ASSESSOR" ? assessorRoutes : <></>}
          {/* Only route to the admin pages if the user has ADMIN rights */}
          {userRole === "ADMIN" ? adminRoutes : <></>}
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
