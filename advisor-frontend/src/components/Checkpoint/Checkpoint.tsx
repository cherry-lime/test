import React, { useCallback, useState } from "react";
import {
  ThemeProvider,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ThemeOptions } from "@mui/material/styles/experimental_extendTheme";
import { AnswerAPP } from "../../api/AnswerAPI";
import { TopicAPP } from "../../api/TopicAPI";
import { AssessmentCheckpointAPP, usePostSaveAssessment } from "../../api/AssessmentAPI";

/*
passing parameter of the optional description of the checkpoints
description of checkpoint = description
description might be empty string
main function returning a checkpoint component 
*/
function Checkpoint({
  description,
  checkpointId,
  assessmentId,
  number,
  topicIds,
  topicList,
  answers,
  selectedAnswer,
  theme,
  feedback,
}: {
  description: string;
  checkpointId: number;
  assessmentId: number;
  number: number;
  topicIds: number[];
  topicList: TopicAPP[];
  answers: AnswerAPP[];
  selectedAnswer: string | undefined;
  theme: ThemeOptions;
  feedback: boolean;
}) {
  /*
  initial value of the checkpoint set to empty string
  using the State Hook in React
  set the value when clicking one of the radio-buttons
  */
  console.log(`${description} ${checkpointId} `)

  const [value, setValue] = useState(selectedAnswer || "");

  const postCheckpointAnswer = usePostSaveAssessment(assessmentId);

  const changeCheckpointAnswer = (newValue: string) => {
    const newAssessmentCheckpoint = {
      checkpointId,
      answerId: newValue !== "-" ? Number(newValue) : undefined,
    };
    postCheckpointAnswer.mutate(newAssessmentCheckpoint, {
      onSuccess: (answer: AssessmentCheckpointAPP) => {
        console.log("answer changed")
        console.log(answer)
        console.log(newValue)
        setValue(newValue);
      },
      onError: (e: unknown) => {
        // eslint-disable-next-line no-console
        console.log(e);
      },
    });
  };

  const handleClick = useCallback(
    (event) => {
      const newValue = event.target.value;
      if (newValue && event.target.value !== value) {
        changeCheckpointAnswer(event.target.value);
      }
    },
    [value]
  );

  /*
  the following for loop is used to dynamically generate an amount of checkpoints
  the amount of checkpoints is defined in checkpointvalues, which is an array of strings
  */
  const items = answers.map((a) => (
    <FormControlLabel
      key={`answers-${a.id.toString()}`}
      control={<Radio color="primary" />}
      label={a.label}
      value={a.id.toString()}
      disabled={feedback}
    />
  ));

  return (
    /*  
    styling of the checkpoint
    there are three radio-buttons Yes, No and N/A in that order
    with horizontal direction (in a row)
    initially the value is empty string
    onClick update the value
    the styling of the checkpoint/radiobutton is in line with the color scheme
    darkgrey when not active and ING orange when selected/clicked
    */
    <ThemeProvider theme={theme}>
      <Card sx={{ width: "inherit", alignSelf: "center" }}>
        <CardContent>
          <Typography
            sx={{
              width: "5%",
              minWidth: "60px",
              float: "left",
              fontSize: "24px",
              fontWeight: "bold",
            }}
            id="checkpointnrlabel"
          >
            {number}
          </Typography>
          {topicIds.length > 0 && (
            <Typography sx={{ textAlign: "left" }} id="checkpoint-topics">
              {`Topics: ${topicList
                .filter((t) => topicIds.includes(Number(t.id)))
                .map((t) => t.name)
                .join(", ")}`}
            </Typography>
          )}
          <Typography sx={{ textAlign: "left" }} id="checkpointnamelabel">
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <RadioGroup
            color="text.primary"
            name="checkpointname"
            aria-labelledby="checkpointnamelabel"
            value={value}
            onClick={handleClick}
            row
          >
            <div>{items}</div>
          </RadioGroup>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}

export default Checkpoint;
