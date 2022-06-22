import axios from "axios";
import { useMutation } from "react-query";

const API = axios.create({
  withCredentials: true,
  baseURL: "https://tabackend.azurewebsites.net",
});

export function useLogin() {
  return useMutation(
    ["Login Admin"],
    () =>
      API.post(`/auth/login`, {
        username: "birth_taken",
        password: "994c801d-e32b-4281-9e83-f7937b4a1bff",
      }),
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
    (loginInfo: {username: string; password: string;}) => API.post(`/auth/login`, loginInfo),
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
    return useMutation(
        ["Auth profile"],
        () => API.get(`/auth/profile`),
        {
            onSuccess: (data: any) => {
                console.log(data);
              },
              onError: (error: any) => {
                console.log(error);
              },
        }
    )
}

export function userLogout() {
    return useMutation(
        ["User Logout"],
        () => API.post(`/auth/logout`),
        {
            onSuccess: (data: any) => {
                console.log(data);
              },
              onError: (error: any) => {
                console.log(error);
              },
        }
    )
}

export default API;
