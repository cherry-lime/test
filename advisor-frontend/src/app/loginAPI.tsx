import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "./store";
import { setUserRole, setUserID } from "./userDataSlice";

const API = axios.create({
  withCredentials: true,
  baseURL: "https://tabackend.azurewebsites.net",
});

/**
 * @params {role: "USERTYPE"} object that contains the body for the POST request
 * @returns Object of login details for the user
 */
export function userRegister() {
  return useMutation(
    ["Register new user"],
    (userRole: { role: string }) => API.post(`/auth/register`, userRole),
    {
      onSuccess: (data: any) => {
        console.log(data);
      },
      onError: (error: any) => {
        console.log(error);
      },
    }
  );
}

export function authProfile() {
  const dispatch = useDispatch();
  // Import the global state variables that will be used throughout the session
  const { userID, userRole } = useSelector(
    (state: RootState) => state.userData
  );
  // Navigation hook, to be used after the user is logged in
  const navigate = useNavigate();

  return useMutation(["Auth profile"], () => API.get(`/auth/profile`), {
    onSuccess: async (data: any) => {
      const response = data["data"];
      dispatch(setUserRole(response["role"]));
      dispatch(setUserID(response["user_id"]));
      await navigate(`/${userRole}`);
      console.log(response);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
}
export function useLoginTwo() {
  const auth = authProfile();

  return useMutation(
    ["Login Admin"],
    (loginInfo: { username: string; password: string }) =>
      API.post(`/auth/login`, loginInfo),
    {
      onSuccess: (data: any) => {
        auth.mutate();

        console.log(data);
      },
      onError: (error: any) => {
        console.log(error);
      },
    }
  );
}

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
