// import { useParams } from "react-router-dom";
import * as React from "react";
import { FormControlLabel, Radio, RadioGroup, Theme } from "@mui/material";
import { useParams } from "react-router-dom";
import AnswerGrid from "../../../../components/Grids/Specific/Answer/AnswerGrid";
import CategoryGrid from "../../../../components/Grids/Specific/Category/CategoryGrid";
import MaturityGrid from "../../../../components/Grids/Specific/Maturity/MaturityGrid";
import TopicGrid from "../../../../components/Grids/Specific/Topic/TopicGrid";
import userType from "../../../../components/Sidebar/listUsersTypes";
import TextfieldEdit from "../../../../components/TextfieldEdit/TextfieldEdit";
import PageLayout from "../../../PageLayout";
import TextfieldEditWeight from "../../../../components/TextfieldEditWeight/TextfieldEditWeight";
import {
  TemplateAPP,
  useGetTemplate,
  usePatchTemplate,
} from "../../../../api/TemplateAPI";
import ErrorPopup, {
  handleError,
  RefObject,
} from "../../../../components/ErrorPopup/ErrorPopup";

/**
 * Page with details regarding a certain template
 * This should only be accessible to admins
 */
function Template({ theme }: { theme: Theme }) {
  const { templateId } = useParams();

  const [templateInfo, setTemplateInfo] = React.useState<TemplateAPP>();

  const { status, data } = useGetTemplate(Number(templateId));

  // Ref for error popup
  const ref = React.useRef<RefObject>(null);

  React.useEffect(() => {
    if (status === "success") {
      setTemplateInfo(data);
    }
  }, [status]);

  const patchTemplate = usePatchTemplate();

  const changeInfo = (newInfo: TemplateAPP) => {
    if (newInfo.weightRangeMax < newInfo.weightRangeMin) {
      handleError(
        ref,
        "Out of bounds: Weight range start must not be less than end."
      );
      return;
    }

    patchTemplate.mutate(newInfo, {
      onSuccess: (templateAPP: TemplateAPP) => {
        setTemplateInfo(templateAPP);
      },
      onError: (error: unknown) => {
        handleError(ref, error);
      },
    });
  };

  const changeInfoOptimistic = (newInfo: TemplateAPP) => {
    const oldInfo = templateInfo;
    setTemplateInfo(newInfo);

    patchTemplate.mutate(newInfo, {
      onError: (error: unknown) => {
        handleError(ref, error);
        setTemplateInfo(oldInfo);
      },
    });
  };

  return (
    <div>
      {templateInfo && (
        <PageLayout
          title={`Template "${templateInfo && templateInfo.name}"`}
          sidebarType={userType.ADMIN}
        >
          <h2> Feedback Information Textbox </h2>
          <p style={{ margin: "0px" }}>
            This is the automated textfield that appears at the top of every
            assessment. It might contain an explanation of the recommendations
            list as well as some notes or tips for the person reviewing their
            feedback.
          </p>
          <TextfieldEdit
            rows={5}
            theme={theme}
            text={templateInfo.feedback}
            handleSave={(intermediateStringValue) =>
              changeInfo({
                ...templateInfo,
                feedback: intermediateStringValue,
              })
            }
          />

          <h2> Areas </h2>
          <p style={{ margin: "0px" }}>
            To view, edit, add, or delete subareas and checkpoints belonging to
            an area, click on the arrow button.
          </p>
          <CategoryGrid theme={theme} templateId={Number(templateId)} />

          <h2>Topics </h2>
          <TopicGrid theme={theme} templateId={Number(templateId)} />

          <h2> Maturity Levels </h2>
          <MaturityGrid theme={theme} templateId={Number(templateId)} />

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
              theme={theme}
              weightValue={templateInfo.weightRangeMin}
              setWeight={(weight) =>
                changeInfo({
                  ...templateInfo,
                  weightRangeMin: weight,
                })
              }
            />
            <TextfieldEditWeight
              theme={theme}
              weightValue={templateInfo.weightRangeMax}
              setWeight={(weight) =>
                changeInfo({
                  ...templateInfo,
                  weightRangeMax: weight,
                })
              }
            />
          </div>

          <h2> Checkpoint Values </h2>
          <div style={{ width: "inherit" }}>
            Include N/A
            <RadioGroup
              sx={{
                width: "inherit",
                marginTop: "5px",
              }}
              name="allowna"
              aria-labelledby="allowna-checkpoints"
              value={templateInfo.includeNoAnswer}
              onClick={() =>
                changeInfoOptimistic({
                  ...templateInfo,
                  includeNoAnswer: !templateInfo.includeNoAnswer,
                })
              }
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
          <AnswerGrid theme={theme} templateId={Number(templateId)} />
        </PageLayout>
      )}
      <ErrorPopup ref={ref} />
    </div>
  );
}

export default Template;
