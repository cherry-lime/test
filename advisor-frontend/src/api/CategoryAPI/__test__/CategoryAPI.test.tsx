import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  useDeleteCategory,
  useGetCategory,
  useGetCategories,
  usePatchCategory,
  usePostCategory,
} from "../CategoryAPI";

describe("Testing CategoryAPI", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: any }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("useGetCategorys should return query", () => {
    const { result } = renderHook(() => useGetCategories(-1), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useGetCategory should return query", () => {
    const { result } = renderHook(() => useGetCategory(-1), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePostCategory should return mutation", () => {
    const { result } = renderHook(() => usePostCategory(-1), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePatchCategory should return mutation", () => {
    const { result } = renderHook(() => usePatchCategory(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useDeleteCategory should return mutation", () => {
    const { result } = renderHook(() => useDeleteCategory(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });
});
