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
import { useState } from "react";
import { PolarArea } from "react-chartjs-2";

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

export default function ProgressEvaluationCard() {
  const topics: string[] = [
    "Ready Work",
    "Alignment",
    "Testware",
    "Test Environment",
    "Mastery",
    "Metrics",
    "Reporting",
  ];
  const areas: string[] = [
    "View Topic",
    "Risk Analysis",
    "Test Strategy",
    "Agile Development Approach",
    "Way of Working Agile Testing",
    "E2E Testing",
    "Test Training and Skills",
    "(Automated) Tooling",
    "Testguild or Testchapter",
    "Monitoring",
  ];
  const maturitylevels: string[] = [
    "Novice",
    "Advanced",
    "Competent",
    "Proficient",
    "Expert",
    "Overall",
  ];
  const maturitylevelvalues: number[] = [56, 13, 90, 26, 49, 45];
  const [topic, setTopic] = useState(topics[0]);
  const [area, setArea] = useState(areas[0]);

  const handleChangeTopic = (event: SelectChangeEvent) => {
    setTopic(event.target.value);
  };

  const handleChangeArea = (event: SelectChangeEvent) => {
    setArea(event.target.value);
  };

  const topicitems = [];
  const areaitems = [];
  const maturitylevelitems = [];

  for (let i = 0; i < topics.length; i += 1) {
    topicitems.push(<MenuItem value={topics[i]}> {topics[i]} </MenuItem>);
  }

  for (let i = 0; i < areas.length; i += 1) {
    areaitems.push(<MenuItem value={areas[i]}> {areas[i]} </MenuItem>);
  }

  for (let i = 0; i < maturitylevels.length - 1; i += 1) {
    maturitylevelitems.push(
      <h2>
        {maturitylevels[i]} {maturitylevelvalues[i]} %
        <br />
      </h2>
    );
  }

  const backgroundcolor = [];
  for (let i = 0; i < maturitylevelvalues.length; i += 1) {
    const r = Math.floor((255 / 100) * (100 - maturitylevelvalues[i]));
    const g = Math.floor((255 / 100) * maturitylevelvalues[i]);
    const b = 0;
    backgroundcolor.push(`rgba(${r},${g},${b},0.4)`);
  }

  const data = {
    labels: maturitylevels,
    datasets: [
      {
        label: "My First Dataset",
        data: maturitylevelvalues,
        fill: false,
        backgroundColor: backgroundcolor,
      },
    ],
  };
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
            <Stack direction="row">
              <Box width="15vw">
                <h2>View Topic</h2>
                <Select value={topic} onChange={handleChangeTopic} displayEmpty>
                  {topicitems}
                </Select>
              </Box>

              <Box width="15vw">
                <h2>View Area</h2>
                <Select value={area} onChange={handleChangeArea} displayEmpty>
                  {areaitems}
                </Select>
              </Box>
            </Stack>
            <Box width="inherit">
              <br />
              <Divider textAlign="left" />
              <br />
            </Box>
            <Box>{maturitylevelitems}</Box>
            <Box width="inherit">
              <br />
              <Divider textAlign="left" />
              <br />
            </Box>
            <Box width="inherit">
              <h2>
                {maturitylevels[maturitylevelitems.length]}{" "}
                {maturitylevelvalues[maturitylevelitems.length]}
                {" %"}
                <br />
              </h2>
            </Box>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }} />
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box width="50vw" height="50vw" bgcolor="white">
          <CardContent>
            <PolarArea data={data} options={options} />
          </CardContent>
        </Box>
      </CardContent>
    </Card>
  );
}
