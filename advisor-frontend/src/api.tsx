import { useQuery, useMutation, QueryKey, MutationKey } from "react-query";
import axios from "axios";

const API_URL = "https://tabackend.azurewebsites.net";

export function useGet(key: QueryKey, url: string) {
  return useQuery(key, async () => {
    const { data } = await axios.get(API_URL + url);
    return data;
  });
}

export function usePost<BodyType>(key: MutationKey) {
  return useMutation(key, (variables: { url: string; body: BodyType }) =>
    axios.post(API_URL + variables.url, variables.body)
  );
}

export function usePatch<BodyType>(key: MutationKey) {
  return useMutation(key, (variables: { url: string; body: BodyType }) =>
    axios.patch(API_URL + variables.url, variables.body)
  );
}

export function useDelete(key: MutationKey) {
  return useMutation(key, (url: string) => axios.delete(API_URL + url));
}
