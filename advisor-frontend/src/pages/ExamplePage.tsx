import { Stack, createTheme } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PageLayout from "./PageLayout";
import userType from "../components/Sidebar/listUsersTypes";
import testimageFigma from "../components/PageCard/Images/testimageFigma.png";
import ButtonRegular from "../components/ButtonRegular/ButtonRegular";
import ButtonInverted from "../components/ButtonInverted/ButtonInverted";
import Checkpoint from "../components/Checkpoint/Checkpoint";
import TextfieldEdit from "../components/TextfieldEdit/TextfieldEdit";
import Textfield from "../components/Textfield/Textfield";
import PageCard from "../components/PageCard/PageCard";
import AllGrid from "../components/Grids/Specific/AllGrid";
import Subarea from "../components/Subarea/Subarea";

//  coloring theme aligned with UI design
const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6200",
    },
    secondary: {
      main: "#5a534f",
    },
    text: {
      primary: "#5a534f",
    },
  },
});
// To create pages, copy the file and add content within <PageLayout>
// This is a template
export default function Example() {
  return (
    <PageLayout title="Home" footer sidebarType={userType.USER}>
      <Stack spacing={3}>
        {/* all components are listed once as an example with parameters if applicable */}
        <ButtonRegular text="Regular Button" />
        <ButtonInverted text="Inverted Button" />
        <Checkpoint
          feedback={false}
          number={12}
          description="Checkpoint Description"
          checkpointlabels={["Yes", "No", "N/A", "Extra", "Extra2"]}
          checkpointvalues={[0, 1, 5, 50, 100]}
          theme={theme}
        />
        <Subarea
          title="Subarea title"
          summary="Subarea summary"
          description="Subarea description here"
          theme={theme}
        />
        <TextfieldEdit
          text="Here is some text that can be edited"
          theme={theme}
        />
        <Textfield
          text="Here is some text that can not be edited"
          theme={theme}
          rows={5}
          columns="50ch"
        />
        <p />
      </Stack>
      <PageCard
        bodyText="This is a description for the home page card"
        headerText="Title"
        cardHeight="15vh"
        icon={<AssessmentIcon color="primary" fontSize="large" />}
        image={testimageFigma}
        isImageLeft
      />
      <AllGrid />
    </PageLayout>
  );
}
