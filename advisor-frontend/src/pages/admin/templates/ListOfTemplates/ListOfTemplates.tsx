import { useCallback, useState } from "react";
import { FormControl, MenuItem, Select, Theme } from "@mui/material";
import userType from "../../../../components/Sidebar/listUsersTypes";
import PageLayout from "../../../PageLayout";
import TemplateGrid from "../../../../components/Grids/Specific/TemplateGrid";

/**
 * Page containing the list of all existing templates
 * This should only be accessible to admins
 */
function ListOfTemplates({ theme }: { theme: Theme }) {
  const [activeIndividual, setActiveIndividual] = useState("123");
  const [activeTeam, setActiveTeam] = useState("abc");
  const individualTemplateList = ["123", "456", "789"];
  const teamTemplateList = ["abc", "def", "ghi"];

  const handleActiveIndividualChange = useCallback(
    (event) => {
      setActiveIndividual(event.target.value);
    },
    [activeIndividual]
  );

  const handleActiveTeamChange = useCallback(
    (event) => {
      setActiveTeam(event.target.value);
    },
    [activeTeam]
  );

  return (
    <div>
      <PageLayout title="Templates" sidebarType={userType.ADMIN}>
        <h2>Individual Templates</h2>
        <p style={{ marginBottom: "0px" }}>
          Active template for individual evaluations:
        </p>
        <FormControl sx={{ width: "inherit" }}>
          <Select
            value={activeIndividual}
            onChange={handleActiveIndividualChange}
          >
            {individualTemplateList.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TemplateGrid theme={theme} assessmentType="INDIVIDUAL" />

        <h2>Team Templates</h2>
        <p style={{ marginBottom: "0px" }}>
          Active template for team evaluations:
        </p>
        <FormControl sx={{ width: "inherit" }}>
          <Select value={activeTeam} onChange={handleActiveTeamChange}>
            {teamTemplateList.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TemplateGrid theme={theme} assessmentType="TEAM" />
      </PageLayout>
    </div>
  );
}

export default ListOfTemplates;
