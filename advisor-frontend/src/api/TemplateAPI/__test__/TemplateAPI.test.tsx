import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  useDeleteTemplate,
  useDuplicateTemplate,
  useGetTemplate,
  useGetTemplates,
  usePatchTemplate,
  usePostTemplate,
} from "../TemplateAPI";

describe("Testing TemplateAPI", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: any }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("useGetTemplates should return query", () => {
    const { result } = renderHook(() => useGetTemplates("INDIVIDUAL"), {
      wrapper,
    });
    expect(result.current.data).toEqual(undefined);
  });

  it("useGetTemplate should return query", () => {
    const { result } = renderHook(() => useGetTemplate(-1), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePostTemplate should return mutation", () => {
    const { result } = renderHook(() => usePostTemplate("INDIVIDUAL"), {
      wrapper,
    });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePatchTemplate should return mutation", () => {
    const { result } = renderHook(() => usePatchTemplate(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useDeleteTemplate should return mutation", () => {
    const { result } = renderHook(() => useDeleteTemplate(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useDuplicateTemplate should return mutation", () => {
    const { result } = renderHook(() => useDuplicateTemplate(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });
});
