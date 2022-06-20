import { useCallback, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import userType from "../../../../components/Sidebar/listUsersTypes";
import Theme from "../../../../Theme";
import PageLayout from "../../../PageLayout";
import TemplateGrid from "../../../../components/Grids/Specific/TemplateGrid";

/**
 * Page containing the list of all existing templates
 * This should only be accessible to admins
 */
function ListOfTemplates() {
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
        <div style={{ width: "inherit" }}>
          <h2>Individual Templates</h2>
          <p>Active template for individual evaluations:</p>
          <FormControl sx={{ m: 1, width: 200, marginBottom: "20px" }}>
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
          <TemplateGrid theme={Theme} assessmentType="INDIVIDUAL" />
        </div>

        <div style={{ width: "inherit" }}>
          <h2>Team Templates</h2>
          <p>Active template for team evaluations:</p>
          <FormControl sx={{ m: 1, width: 200, marginBottom: "20px" }}>
            <Select value={activeTeam} onChange={handleActiveTeamChange}>
              {teamTemplateList.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TemplateGrid theme={Theme} assessmentType="TEAM" />
        </div>
      </PageLayout>
    </div>
  );
}

export default ListOfTemplates;
