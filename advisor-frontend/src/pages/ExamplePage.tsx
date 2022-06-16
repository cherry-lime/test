import { Stack } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";
import userType from "../components/Sidebar/listUsersTypes";
import testimageFigma from "../components/PageCard/testimageFigma.png";

import ButtonRegular from "../components/ButtonRegular/ButtonRegular";
import ButtonInverted from "../components/ButtonInverted/ButtonInverted";
import Checkpoint from "../components/Checkpoint/Checkpoint";
import TextfieldEdit from "../components/TextfieldEdit/TextfieldEdit";
import Textfield from "../components/Textfield/Textfield";
import PageCard from "../components/PageCard/PageCard";
import AllGrid from "../components/Grids/Specific/AllGrid";

// To create pages, copy the file and add content within <PageLayout>
// This is a template
export default function Example() {
  return (
    <PageLayout title="Home" footer sidebarType={userType.USER}>
      <Stack spacing={3}>
        {/* all components are listed once as an example with parameters if applicable */}
        <ButtonRegular text="Regular Button" />
        <ButtonInverted text="Inverted Button" />
        <Checkpoint description="Checkpoint Description" />
        <TextfieldEdit text="Here is some text that can be edited" />
        <Textfield text="Here is some text that can not be edited" />
        <p />
      </Stack>
      <PageCard
        bodyText="This is a description for the home page card"
        headerText="Title"
        cardHeight="15vh"
        icon={<AssessmentIcon color="primary" fontSize="small" />}
        image={testimageFigma}
        isImageLeft
        isImageRight
      />
      <Link data-testid="home" to="/">
        {" "}
        Home{" "}
      </Link>
      <Link to="/user" state="user" data-testid="user">
        {" "}
        User{" "}
      </Link>
      <Link to="/assessor" state="assessor" data-testid="assessor">
        {" "}
        Assessor{" "}
      </Link>
      <Link to="/admin" state="admin" data-testid="admin">
        {" "}
        Admin{" "}
      </Link>

      <AllGrid />
    </PageLayout>
  );
}
