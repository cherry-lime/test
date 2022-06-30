import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  useDeleteAnswer,
  useGetAnswer,
  useGetAnswers,
  usePatchAnswer,
  usePostAnswer,
} from "../AnswerAPI";

describe("Testing AnswerAPI", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: any }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("useGetAnswers should return query", () => {
    const { result } = renderHook(() => useGetAnswers(-1), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useGetAnswer should return query", () => {
    const { result } = renderHook(() => useGetAnswer(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePostAnswer should return mutation", () => {
    const { result } = renderHook(() => usePostAnswer(-1), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePatchAnswer should return mutation", () => {
    const { result } = renderHook(() => usePatchAnswer(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useDeleteAnswer should return mutation", () => {
    const { result } = renderHook(() => useDeleteAnswer(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });
});
