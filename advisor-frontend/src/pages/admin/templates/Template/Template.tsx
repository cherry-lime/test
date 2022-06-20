import { useParams } from "react-router-dom";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useCallback, useState } from "react";
import AnswerTypeGrid from "../../../../components/Grids/Specific/AnswerTypeGrid";
import CategoryGrid from "../../../../components/Grids/Specific/CategoryGrid";
import MaturityGrid from "../../../../components/Grids/Specific/MaturityGrid";
import TopicGrid from "../../../../components/Grids/Specific/TopicGrid";
import userType from "../../../../components/Sidebar/listUsersTypes";
import TextfieldEdit from "../../../../components/TextfieldEdit/TextfieldEdit";
import TextfieldEditWeight from "../../../../components/TextEditWeight/TextfieldEditWeight";
import Theme from "../../../../Theme";
import PageLayout from "../../../PageLayout";

/**
 * Page with details regarding a certain template
 * This should only be accessible to admins
 */
function Template() {
  const { templateId } = useParams();
  const templateName = "Random";
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(100);

  const [allowNa, setAllowNa] = useState(true);

  const handleAllowNa = useCallback(
    (event) => {
      setAllowNa(event.target.value);
    },
    [allowNa]
  );

  return (
    <div>
      <PageLayout
        title={`Template "${templateName}"`}
        sidebarType={userType.ADMIN}
      >
        <h2> Feedback Textbox </h2>

        <TextfieldEdit theme={Theme} text="Get editable feedback text" />

        <h2> Areas </h2>

        <div style={{ width: "inherit" }}>
          <p style={{ margin: "0px" }}>
            To view, edit, add, or delete subareas and checkpoints belonging to
            an area, click on the arrow button.
          </p>
          <CategoryGrid theme={Theme} templateId={templateId} />
        </div>

        <h2>Topics </h2>

        <TopicGrid theme={Theme} templateId={templateId} />

        <h2> Maturity Levels </h2>

        <MaturityGrid theme={Theme} templateId={templateId} />

        <h2> Score Formula </h2>

        <h2> Weight Range </h2>
        <div
          style={{
            width: "inherit",
            display: "inline-grid",
            gridTemplateColumns: "repeat(2, 250px [col-start])",
            rowGap: "10px",
          }}
        >
          <div>Start</div>
          <div>End</div>
          <TextfieldEditWeight
            theme={Theme}
            weightValue={minWeight}
            setWeight={setMinWeight}
          />
          <TextfieldEditWeight
            theme={Theme}
            weightValue={maxWeight}
            setWeight={setMaxWeight}
          />
        </div>
        <h2> Answer Type </h2>

        <div style={{ width: "inherit" }}>
          Include N/A
          <RadioGroup
            sx={{
              width: "inherit",
              marginTop: "5px",
            }}
            name="allowna"
            aria-labelledby="allowna-checkpoints"
            value={allowNa}
            onClick={handleAllowNa}
            row
          >
            <FormControlLabel
              control={<Radio color="primary" />}
              label="Yes"
              value
            />

            <FormControlLabel
              control={<Radio color="primary" />}
              label="No"
              value={false}
            />
          </RadioGroup>
        </div>
        <AnswerTypeGrid theme={Theme} templateId={templateId} />
      </PageLayout>
    </div>
  );
}

export default Template;
