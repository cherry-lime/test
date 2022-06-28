import { useQuery, useMutation } from "react-query";
import { GridRowId } from "@mui/x-data-grid";
import API from "./_API";
import { AssessmentType } from "../types/AssessmentType";
import { handleError, RefObject } from "../components/ErrorPopup/ErrorPopup";

export type ScoreAPP = {
  maturityId: number;
  categoryId: number;
  score: number;
};

type ScoreAPI = {
  maturity_id: number;
  category_id: number;
  score: number;
};

function scoreToApp(scoreAPI: ScoreAPI) {
  return {
    maturityId: scoreAPI.maturity_id,
    categoryId: scoreAPI.category_id,
    score: scoreAPI.score,
  } as ScoreAPP;
}
