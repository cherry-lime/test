import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  useGetRecommendations,
  usePatchRecommendation,
} from "../RecommendationAPI";

describe("Testing RecommendationAPI", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: any }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("useGetRecommendations should return query", () => {
    const { result } = renderHook(() => useGetRecommendations(-1, -1), {
      wrapper,
    });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePatchRecommendation should return mutation", () => {
    const { result } = renderHook(() => usePatchRecommendation(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });
});
