import { Box, Card, CardContent, Divider, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import { PolarArea } from "react-chartjs-2";
import { CategoryAPP, useGetCategories } from "../../../api/CategoryAPI";
import { MaturityAPP, useGetMaturities } from "../../../api/MaturityAPI";
import { ScoreAPP, useGetScores } from "../../../api/ScoreAPI";
import { TopicAPP, useGetTopics } from "../../../api/TopicAPI";
import ErrorPopup, { RefObject } from "../../ErrorPopup/ErrorPopup";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

type ProgressEvaluationCardProps = {
  assessmentId: number;
  templateId: number;
};

export default function ProgressEvaluationCard({
  assessmentId,
  templateId,
}: ProgressEvaluationCardProps) {
  // Ref for error popup
  const ref = useRef<RefObject>(null);

  const [topics, setTopics] = useState<TopicAPP[]>();
  const [categories, setCategories] = useState<CategoryAPP[]>();
  const [maturities, setMaturities] = useState<MaturityAPP[]>();

  const [topicSelected, setTopicSelected] = useState<number | undefined>(
    undefined
  );
  const [categorySelected, setCategorySelected] = useState<number | null>();

  const [scores, setScores] = useState<ScoreAPP[]>();

  const { status: statusTopics, data: dataTopics } = useGetTopics(
    templateId,
    true,
    ref
  );

  const { status: statusCategories, data: dataCategories } = useGetCategories(
    templateId,
    true,
    ref
  );

  const { status: statusMaturities, data: dataMaturities } = useGetMaturities(
    templateId,
    true,
    ref
  );

  const { status: statusScores, data: dataScores } = useGetScores(
    assessmentId,
    topicSelected
  );

  useEffect(() => {
    if (statusTopics === "success") {
      setTopics(dataTopics);
    }
  }, [statusTopics, dataTopics]);

  useEffect(() => {
    if (statusCategories === "success") {
      setCategories(dataCategories);
      setCategorySelected(Number(dataCategories[0].id));
    }
  }, [statusCategories, dataCategories]);

  useEffect(() => {
    if (statusMaturities === "success") {
      setMaturities(dataMaturities);
    }
  }, [statusMaturities, dataMaturities]);

  useEffect(() => {
    if (statusScores === "success") {
      setScores(dataScores);
    }
  }, [statusScores, dataScores]);

  const handleTopicChange = (event: SelectChangeEvent<string>) => {
    if (event.target.value !== "-")
      setTopicSelected(Number(event.target.value));
    else setTopicSelected(undefined);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    if (event.target.value !== "total")
      setCategorySelected(Number(event.target.value));
    else setCategorySelected(null);
  };

  if (!(scores && maturities && categories && categorySelected !== undefined)) {
    return <>...</>;
  }

  const getFilteredScores = () =>
    scores.filter(
      (score: ScoreAPP) =>
        score.categoryId === categorySelected &&
        score.maturityId !== null &&
        score.score !== -1
    ) as ScoreAPP[];

  const getLabels = () =>
    getFilteredScores().map((score: ScoreAPP) => {
      const maturityWithId = maturities.find(
        (maturity: MaturityAPP) => maturity.id === score.maturityId
      );

      if (maturityWithId) {
        return maturityWithId.name;
      }

      return "";
    });

  const getData = () =>
    getFilteredScores().map((score: ScoreAPP) => score.score);

  const getBackgroundColor = () =>
    getFilteredScores().map(
      (score: ScoreAPP) =>
        `rgba(${Math.floor((255 / 100) * (100 - score.score))},${Math.floor(
          (255 / 100) * score.score
        )},0,0.4)`
    );

  const options = {
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <Card
      sx={{
        display: "flex",
        verticalAlign: "middle",
        width: "inherit",
        borderRadius: "20px",
        marginBottom: "10px",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          verticalAlign: "middle",
          width: "inherit",
          borderRadius: "20px",
          marginBottom: "10px",
        }}
      >
        <Box width="50vw" height="50vw" bgcolor="white">
          <CardContent>
            <Stack direction="column">
              <Box width="15vw">
                <h2>View Topic</h2>
                {topics && (
                  <Select
                    value={topicSelected ? topicSelected.toString() : "-"}
                    onChange={handleTopicChange}
                  >
                    {[
                      <MenuItem key="menu-no-topic" value="-">
                        -
                      </MenuItem>,
                      topics.map((topic) => (
                        <MenuItem
                          key={`menu-topic-${topic.id}`}
                          value={topic.id.toString()}
                        >
                          {topic.name}
                        </MenuItem>
                      )),
                    ]}
                  </Select>
                )}
              </Box>

              <Box width="15vw">
                <h2>View Area</h2>
                <Select
                  value={
                    categorySelected === null ? "" : categorySelected.toString()
                  }
                  onChange={handleCategoryChange}
                >
                  <MenuItem key="menu-total-category" value="total">
                    Total
                  </MenuItem>
                  ,
                  {categories.map((category) => (
                    <MenuItem
                      key={category.name}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Stack>
            <Box width="inherit">
              <br />
              <Divider textAlign="left" />
              <br />
            </Box>
            {scores && maturities && categories && (
              <Box>
                {getFilteredScores().map((score: ScoreAPP) => {
                  const maturityWithId = maturities.find(
                    (maturity: MaturityAPP) => maturity.id === score.maturityId
                  );

                  if (maturityWithId) {
                    return <p>{`${maturityWithId.name}: ${score.score}%`}</p>;
                  }

                  return "";
                })}
              </Box>
            )}
            <Box width="inherit">
              <br />
              <Divider textAlign="left" />
              <br />
            </Box>
            {scores && maturities && categories && (
              <Box width="inherit">
                <h2>
                  {scores
                    .filter(
                      (score: ScoreAPP) =>
                        score.categoryId === categorySelected &&
                        score.maturityId === null &&
                        score.score !== -1
                    )
                    .map((score: ScoreAPP) => `Overall: ${score.score}%`)}
                  <br />
                </h2>
              </Box>
            )}
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }} />
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box width="50vw" height="50vw" bgcolor="white">
          <CardContent>
            {scores && maturities && categories && (
              <PolarArea
                data={{
                  labels: getLabels(),
                  datasets: [
                    {
                      label: "Progress Scores",
                      data: getData(),
                      backgroundColor: getBackgroundColor(),
                    },
                  ],
                }}
                options={options}
              />
            )}
          </CardContent>
        </Box>
      </CardContent>
      <ErrorPopup ref={ref} />
    </Card>
  );
}
