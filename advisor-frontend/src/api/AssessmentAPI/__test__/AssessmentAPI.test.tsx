import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  useDeleteAssessment,
  useGetAssessment,
  useGetAssessments,
  useGetMyIndividualAssessments,
  useGetMyTeamAssessments,
  useGetSaveAssessment,
  usePatchAssessment,
  usePostAssessment,
  usePostCompleteAssessment,
  usePostFeedbackAssessment,
  usePostSaveAssessment,
} from "../AssessmentAPI";

describe("Testing AssessmentAPI", () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: any }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("useGetAnswers should return query", () => {
    const { result } = renderHook(() => useGetAssessments(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useGetAssessment should return query", () => {
    const { result } = renderHook(() => useGetAssessment(-1), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useGetMyIndividualAssessments should return query", () => {
    const { result } = renderHook(() => useGetMyIndividualAssessments(true), {
      wrapper,
    });
    expect(result.current.data).toEqual(undefined);
  });

  it("useGetMyTeamAssessments should return query", () => {
    const { result } = renderHook(() => useGetMyTeamAssessments(true, -1), {
      wrapper,
    });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePostAssessment should return mutation", () => {
    const { result } = renderHook(() => usePostAssessment("INDIVIDUAL"), {
      wrapper,
    });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePatchAssessment should return mutation", () => {
    const { result } = renderHook(() => usePatchAssessment(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("useDeleteAssessment should return mutation", () => {
    const { result } = renderHook(() => useDeleteAssessment(), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePostCompleteAssessment should return mutation", () => {
    const { result } = renderHook(() => usePostCompleteAssessment(-1), {
      wrapper,
    });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePostSaveAssessment should return mutation", () => {
    const { result } = renderHook(() => usePostSaveAssessment(-1, ""), {
      wrapper,
    });
    expect(result.current.data).toEqual(undefined);
  });

  it("useGetSaveAssessment should return query", () => {
    const { result } = renderHook(() => useGetSaveAssessment(-1), { wrapper });
    expect(result.current.data).toEqual(undefined);
  });

  it("usePostFeedbackAssessment should return mutation", () => {
    const { result } = renderHook(() => usePostFeedbackAssessment(-1), {
      wrapper,
    });
    expect(result.current.data).toEqual(undefined);
  });
});
