import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  useDeleteCheckpoint,
  useGetCheckpoint,
  useGetCheckpoints,
  usePatchCheckpoint,
  usePostCheckpoint,
} from "../CheckpointAPI";

describe("Testing CheckpointAPI", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: any }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("useGetCheckpoints should return query", () => {
    const { result } = renderHook(() => useGetCheckpoints(-1), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useGetCheckpoint should return query", () => {
    const { result } = renderHook(() => useGetCheckpoint(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePostCheckpoint should return mutation", () => {
    const { result } = renderHook(() => usePostCheckpoint(-1), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePatchCheckpoint should return mutation", () => {
    const { result } = renderHook(() => usePatchCheckpoint(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useDeleteCheckpoint should return mutation", () => {
    const { result } = renderHook(() => useDeleteCheckpoint(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });
});
