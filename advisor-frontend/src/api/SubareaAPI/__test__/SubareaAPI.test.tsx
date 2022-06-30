import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  useDeleteSubarea,
  useGetSubarea,
  useGetSubareas,
  usePatchSubarea,
  usePostSubarea,
} from "../SubareaAPI";

describe("Testing SubareaAPI", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: any }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("useGetSubareas should return query", () => {
    const { result } = renderHook(() => useGetSubareas(-1), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useGetSubarea should return query", () => {
    const { result } = renderHook(() => useGetSubarea(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePostSubarea should return mutation", () => {
    const { result } = renderHook(() => usePostSubarea(-1), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePatchSubarea should return mutation", () => {
    const { result } = renderHook(() => usePatchSubarea(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useDeleteSubarea should return mutation", () => {
    const { result } = renderHook(() => useDeleteSubarea(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });
});
