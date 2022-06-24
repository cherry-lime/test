import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setUserRole,
  setUserId,
  setUserName,
  setPassword,
} from "./userDataSlice";

// Defines the API address, used to send the requests to
const API = axios.create({
  withCredentials: true,
  baseURL: "https://tabackend.azurewebsites.net",
});

/**
 * @params {role: "USERTYPE"} object that contains the body for the POST request
 * @returns Object of login details for the user
 */
export function userRegister() {
  // Navigation hook, to be used after the user is logged in
  const navigate = useNavigate();
  // Make the global state variable functions available
  const dispatch = useDispatch();
  return useMutation(
    ["Register new user"],
    (userRole: { role: string }) => API.post(`/auth/register`, userRole),
    {
      onSuccess: async (data: any) => {
        dispatch(setUserName(data.data.username));
        dispatch(setPassword(data.data.password));
        await navigate(`/signup/details`);
      },
      onError: (error: any) => {
        // eslint-disable-next-line no-alert
        alert(error);
      },
    }
  );
}

/**
 * Checks if the user is logged in and retrieves the userId and userRole.
 * Contains functionality to redirect the user to their homepage and update the global state values.
 */
export function authProfile() {
  // Import the Slice functions to access the Redux functions
  const dispatch = useDispatch();
  // Navigation hook, to be used after the user is logged in
  const navigate = useNavigate();

  return useMutation(["Auth profile"], () => API.get(`/auth/profile`), {
    onSuccess: async (data: any) => {
      const response = data.data;
      dispatch(setUserRole(response.role));
      dispatch(setUserId(response.user_id));
      navigate(`/`);
      console.log(response);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
}
/**
 * Login API function that uses an object as specified in the backend API.
 * @param username String value
 * @param password String value
 * @returns onError: display the error message received from the backend API.
 */
export function useLoginTwo() {
  // Calls authentication API this way to avoid hook-in-hook issues
  const auth = authProfile();

  return useMutation(
    ["Login Admin"],
    (loginInfo: { username: string; password: string }) =>
      API.post(`/auth/login`, loginInfo),
    {
      onSuccess: (data: any) => {
        auth.mutate();
        // eslint-disable-next-line no-console
        console.log(data);
      },
      onError: (error: any) => {
        // TODO: Display if login has failed.
        // eslint-disable-next-line no-alert
        alert(error.message);
        // eslint-disable-next-line no-console
        console.log(error);
      },
    }
  );
}

/**
 * API Call to logout the current user.
 * Removes the cookie token and resets the session state
 */
export function userLogout() {
  return useMutation(["User Logout"], () => API.post(`/auth/logout`), {
    onSuccess: (data: any) => {
      console.log(data);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
}

export default API;
