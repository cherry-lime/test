import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  useDeleteMaturity,
  useGetMaturity,
  useGetMaturities,
  usePatchMaturity,
  usePostMaturity,
} from "../MaturityAPI";

describe("Testing MaturityAPI", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: any }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("useGetMaturitys should return query", () => {
    const { result } = renderHook(() => useGetMaturities(-1), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useGetMaturity should return query", () => {
    const { result } = renderHook(() => useGetMaturity(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePostMaturity should return mutation", () => {
    const { result } = renderHook(() => usePostMaturity(-1), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePatchMaturity should return mutation", () => {
    const { result } = renderHook(() => usePatchMaturity(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useDeleteMaturity should return mutation", () => {
    const { result } = renderHook(() => useDeleteMaturity(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });
});
