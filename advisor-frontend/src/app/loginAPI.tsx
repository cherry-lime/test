import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { setUserRole, setUserID } from "./userDataSlice";

const API = axios.create({
  withCredentials: true,
  baseURL: "https://tabackend.azurewebsites.net",
});

/**
 *
 * @returns
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

export function useLoginTwo() {
  return useMutation(
    ["Login Admin"],
    (loginInfo: { username: string; password: string }) =>
      API.post(`/auth/login`, loginInfo),
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
  return useMutation(["Auth profile"], () => API.get(`/auth/profile`), {
    onSuccess: (data: any) => {
      
      const response = data["data"];
      dispatch(setUserRole(response["role"]));
      dispatch(setUserID(response["user_id"]));
      console.log(response);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
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
