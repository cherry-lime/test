import { useCallback, useEffect, useRef, useState } from "react";
import { FormControl, MenuItem, Select, Theme } from "@mui/material";
import userType from "../../../../components/Sidebar/listUsersTypes";
import PageLayout from "../../../PageLayout";
import TemplateGrid from "../../../../components/Grids/Specific/Template/TemplateGrid";
import {
  TemplateAPP,
  useGetTemplates,
  usePatchTemplate,
} from "../../../../api/TemplateAPI";
import ErrorPopup, {
  RefObject,
} from "../../../../components/ErrorPopup/ErrorPopup";

/**
 * Page containing the list of all existing templates
 * This should only be accessible to admins
 */
function ListOfTemplates({ theme }: { theme: Theme }) {
  const [individualTemplates, setIndividualTemplates] = useState<TemplateAPP[]>(
    []
  );
  const [teamTemplates, setTeamTemplates] = useState<TemplateAPP[]>([]);

  const [activeIndividualTemplate, setActiveIndividualTemplate] =
    useState<TemplateAPP>();
  const [activeTeamTemplate, setActiveTeamTemplate] = useState<TemplateAPP>();

  // Ref for error popup
  const ref = useRef<RefObject>(null);

  // Template queries
  const { status: statusIndividual, data: dataIndividual } =
    useGetTemplates("INDIVIDUAL");

  const { status: statusTeam, data: dataTeam } = useGetTemplates(
    "TEAM",
    undefined,
    ref
  );

  // Template mutation
  const patchTemplate = usePatchTemplate(ref);

  useEffect(() => {
    if (statusIndividual === "success") {
      setIndividualTemplates(dataIndividual);

      const activeIndividual = dataIndividual.find(
        (templateAPP: TemplateAPP) => templateAPP.enabled
      );

      if (activeIndividual) {
        setActiveIndividualTemplate(activeIndividual);
      }
    }
  }, [statusIndividual, dataIndividual]);

  useEffect(() => {
    if (statusTeam === "success") {
      setTeamTemplates(dataTeam);

      const activeTeam = dataTeam.find(
        (templateAPP: TemplateAPP) => templateAPP.enabled
      );

      if (activeTeam) {
        setActiveTeamTemplate(activeTeam);
      }
    }
  }, [statusTeam, dataTeam]);

  const handleActiveIndividualTemplateChange = useCallback(
    (event) => {
      const templateId = parseInt(event.target.value, 10);

      const oldTemplate = individualTemplates.find(
        (template) => template.id === templateId
      );

      if (oldTemplate) {
        const newTemplate = { ...oldTemplate, enabled: true };

        patchTemplate.mutate(newTemplate, {
          onSuccess: (templateAPP: TemplateAPP) => {
            setActiveIndividualTemplate(templateAPP);
          },
        });
      }
    },
    [activeIndividualTemplate]
  );

  const handleActiveTeamTemplateChange = useCallback(
    (event) => {
      const templateId = parseInt(event.target.value, 10);

      const oldTemplate = teamTemplates.find(
        (template) => template.id === templateId
      );

      if (oldTemplate) {
        const newTemplate = { ...oldTemplate, enabled: true };

        patchTemplate.mutate(newTemplate, {
          onSuccess: (templateAPP: TemplateAPP) => {
            setActiveTeamTemplate(templateAPP);
          },
        });
      }
    },
    [activeIndividualTemplate]
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
            value={activeIndividualTemplate ? activeIndividualTemplate.id : ""}
            onChange={handleActiveIndividualTemplateChange}
          >
            {individualTemplates.map((template) => (
              <MenuItem key={template.name} value={template.id.toString()}>
                {template.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TemplateGrid theme={theme} templateType="INDIVIDUAL" />

        <h2>Team Templates</h2>
        <p style={{ marginBottom: "0px" }}>
          Active template for team evaluations:
        </p>
        <FormControl sx={{ width: "inherit" }}>
          <Select
            value={activeTeamTemplate ? activeTeamTemplate.id : ""}
            onChange={handleActiveTeamTemplateChange}
          >
            {teamTemplates.map((template) => (
              <MenuItem key={template.name} value={template.id.toString()}>
                {template.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TemplateGrid theme={theme} templateType="TEAM" />
      </PageLayout>
      <ErrorPopup ref={ref} />
    </div>
  );
}

export default ListOfTemplates;
