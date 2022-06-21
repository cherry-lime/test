import { Grid, Stack, Pagination, Card, Tab, Tabs, ThemeOptions } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ButtonRegular from "../ButtonRegular/ButtonRegular";
import Checkpoint from "../Checkpoint/Checkpoint";
import Subarea from "../Subarea/Subarea";

/**
 * Page with a self evaluation that can be filled in
 * This should only be accessible to the user whose assement this belongs to
 */
function ListOfCheckpoints({
  assessmentId,
  theme,
}: {
  assessmentId: string | undefined;
  theme: ThemeOptions;
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
      <Checkpoint
        number={i}
        theme={theme}
        description="Lorem ipsum"
        checkpointvalues={[0, 1, 2]}
        checkpointlabels={["Yes", "No", "N/A"]}
      />
    );
  }

  const [value, setValue] = React.useState("Single");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div style={{width: "inherit", margin: "auto"}}>
        <Grid container direction="column" alignItems="left">
        <Grid item>
          <Card
            sx={{
              backgroundColor: "white",
              width: "20vw",
              borderRadius: "5px",
            }}
          >
            <Stack direction="row" justifyContent="center" alignItems="center">
              VIEW:
              <Tabs value={value} onChange={handleChange} textColor="primary">
                <Tab value="Single" label="Single" />
                <Tab value="List" label="List" />
              </Tabs>
            </Stack>
          </Card>
        </Grid>
        <br />
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
              number={page}
              theme={theme}
              description="Lorem ipsum"
              checkpointvalues={[0, 1, 2]}
              checkpointlabels={["Yes", "No", "N/A"]}
            />
          )}
          {value === "List" && <Grid item>{checkpointlist}</Grid>}
        </Grid>
      </Grid>
      <Grid container direction="column" alignItems="center">
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
            <Link to={`/user/self_evaluations/feedback/${assessmentId}`} >
              <ButtonRegular text="Finish Assessment" />
            </Link>
          </Stack>
        </Grid>
      </Grid>
    </div>
      
  );
}

export default ListOfCheckpoints;
