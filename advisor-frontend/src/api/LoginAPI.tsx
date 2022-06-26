import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "./_API";
import { UserAPI } from "./UserAPI";
import {
  setUserRole,
  setUserId,
  setUserName,
  setPassword,
} from "../app/userDataSlice";
import { handleError, RefObject } from "../components/ErrorPopup/ErrorPopup";

/**
 * @params {role: "USERTYPE"} object that contains the body for the POST request
 * @returns Object of login details for the user
 */
export function userRegister(ref?: React.RefObject<RefObject>) {
  // Navigation hook, to be used after the user is logged in
  const navigate = useNavigate();
  // Make the global state variable functions available
  const dispatch = useDispatch();
  return useMutation(
    ["Register new user"],
    async (userRole: { role: string }) => {
      const { data } = await API.post(`/auth/register`, userRole);
      return data;
    },
    {
      onSuccess: async (data: { username: string; password: string }) => {
        dispatch(setUserName(data.username));
        dispatch(setPassword(data.password));
        await navigate(`/signup/details`);
      },
      onError: (error: unknown) => {
        if (ref) {
          handleError(ref, error);
        }
      },
    }
  );
}

/**
 * Checks if the user is logged in and retrieves the userId and userRole.
 * Contains functionality to redirect the user to their homepage and update the global state values.
 */
export function authProfile(ref?: React.RefObject<RefObject>) {
  // Import the Slice functions to access the Redux functions
  const dispatch = useDispatch();
  // Navigation hook, to be used after the user is logged in
  const navigate = useNavigate();

  return useMutation(
    ["Auth profile"],
    async () => {
      const { data } = await API.get(`/auth/profile`);
      return data;
    },
    {
      onSuccess: async (userAPI: UserAPI) => {
        dispatch(setUserRole(userAPI.role));
        dispatch(setUserId(userAPI.user_id.toString()));
        navigate(`/`);
      },
      onError: (error: unknown) => {
        if (ref) {
          handleError(ref, error);
        }
      },
    }
  );
}
/**
 * Login API function that uses an object as specified in the backend API.
 * @param username String value
 * @param password String value
 * @returns onError: display the error message received from the backend API.
 */
export function useLoginTwo(ref?: React.RefObject<RefObject>) {
  // Calls authentication API this way to avoid hook-in-hook issues
  const auth = authProfile();

  return useMutation(
    ["Login Admin"],
    (loginInfo: { username: string; password: string }) =>
      API.post(`/auth/login`, loginInfo),
    {
      onSuccess: () => {
        auth.mutate();
      },
      onError: (error: unknown) => {
        if (ref) {
          handleError(ref, error);
        }
      },
    }
  );
}

/**
 * API Call to logout the current user.
 * Removes the cookie token and resets the session state
 */
export function userLogout(ref?: React.RefObject<RefObject>) {
  return useMutation(["User Logout"], () => API.post(`/auth/logout`), {
    onError: (error: unknown) => {
      if (ref) {
        handleError(ref, error);
      }
    },
  });
}
