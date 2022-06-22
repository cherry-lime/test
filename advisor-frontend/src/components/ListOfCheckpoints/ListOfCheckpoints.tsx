import {
  Grid,
  Stack,
  Pagination,
  Card,
  Tab,
  Tabs,
  ThemeOptions,
} from "@mui/material";
import React from "react";
import Checkpoint from "../Checkpoint/Checkpoint";
import Subarea from "../Subarea/Subarea";

/**
 * Page with a self evaluation that can be filled in
 * This should only be accessible to the user whose assement this belongs to
 */
function ListOfCheckpoints({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  assessmentId,
  theme,
  feedback,
}: {
  assessmentId: string | undefined;
  theme: ThemeOptions;
  feedback: boolean;
}) {
  const assessmentItems = 12;
  const checkpointlist = [];
  const subareaname = "Subarea Name";

  const [page, setPage] = React.useState(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  for (let i = 1; i < assessmentItems + 1; i += 1) {
    checkpointlist.push(
      <Grid item>
        <Checkpoint
          area="Area Name"
          feedback={feedback}
          number={i}
          theme={theme}
          description="Lorem ipsum"
          checkpointvalues={[0, 1, 2]}
          checkpointlabels={["Yes", "No", "N/A"]}
        />
      </Grid>
    );
  }

  const [value, setValue] = React.useState("Single");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div style={{ width: "inherit", display: "contents" }}>
      <Grid container direction="column" alignItems="left" spacing="20px">
        <Grid item>
          <Card
            sx={{
              backgroundColor: "white",
              width: "inherit",
              borderRadius: "5px",
            }}
          >
            <Stack direction="row" justifyContent="left" alignItems="center">
              <Tabs value={value} onChange={handleChange} textColor="primary">
                <Tab value="Single" label="Single" />
                <Tab value="List" label="List" />
              </Tabs>
            </Stack>
          </Card>
        </Grid>
        <Grid item>
          <Subarea
            theme={theme}
            title={subareaname}
            summary="Lorem ipsum"
            description="Lorem ipsum 2"
          />
        </Grid>
        <Grid item>
          {value === "Single" && (
            <Checkpoint
              area="Area Name"
              feedback={feedback}
              number={page}
              theme={theme}
              description="Lorem ipsum"
              checkpointvalues={[0, 1, 2]}
              checkpointlabels={["Yes", "No", "N/A"]}
            />
          )}
        </Grid>
        {value === "List" && checkpointlist}
        <Grid item container direction="column" alignItems="center">
          <Grid item>
            <Stack direction="row" spacing={2} alignItems="center">
              {value === "Single" && (
                <Pagination
                  onChange={handlePageChange}
                  count={assessmentItems}
                  shape="rounded"
                  color="primary"
                  page={page}
                />
              )}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ListOfCheckpoints;
