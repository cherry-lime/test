import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  useDeleteTeam,
  useGetInviteTokenTeam,
  useGetMyTeams,
  useGetTeam,
  useJoinInviteTokenTeam,
  usePatchTeam,
  usePostTeam,
} from "../TeamAPI";

describe("Testing TeamAPI", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: any }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("useGetTeams should return query", () => {
    const { result } = renderHook(() => useGetMyTeams(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useGetTeam should return query", () => {
    const { result } = renderHook(() => useGetTeam(-1), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePostTeam should return mutation", () => {
    const { result } = renderHook(() => usePostTeam(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePatchTeam should return mutation", () => {
    const { result } = renderHook(() => usePatchTeam(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useDeleteTeam should return mutation", () => {
    const { result } = renderHook(() => useDeleteTeam(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useGetInviteTokenTeam should return mutation", () => {
    const { result } = renderHook(() => useGetInviteTokenTeam(-1), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useJoinInviteTokenTeam should return mutation", () => {
    const { result } = renderHook(() => useJoinInviteTokenTeam(""), {
      wrapper,
    });
    expect(result.current.data).toEqual(undefined);
  });
});
