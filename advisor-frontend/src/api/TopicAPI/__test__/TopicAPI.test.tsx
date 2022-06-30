import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  useDeleteTopic,
  useGetTopic,
  useGetTopics,
  usePatchTopic,
  usePostTopic,
} from "../TopicAPI";

describe("Testing TopicAPI", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: any }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("useGetTopics should return query", () => {
    const { result } = renderHook(() => useGetTopics(-1), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useGetTopic should return query", () => {
    const { result } = renderHook(() => useGetTopic(-1), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePostTopic should return mutation", () => {
    const { result } = renderHook(() => usePostTopic(-1), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePatchTopic should return mutation", () => {
    const { result } = renderHook(() => usePatchTopic(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useDeleteTopic should return mutation", () => {
    const { result } = renderHook(() => useDeleteTopic(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });
});
