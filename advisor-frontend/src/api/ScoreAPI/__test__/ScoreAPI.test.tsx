import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useGetScores } from "../ScoreAPI";

describe("Testing ScoreAPI", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: any }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("useGetScores should return query", () => {
    const { result } = renderHook(() => useGetScores(-1, -1), {
      wrapper,
    });
    expect(result.current.data).toEqual(undefined);
  });
});
