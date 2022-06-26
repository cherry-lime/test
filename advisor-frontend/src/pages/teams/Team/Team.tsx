import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Theme,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PageLayout from "../../PageLayout";
import userTypes from "../../../components/Sidebar/listUsersTypes";
import TextfieldEdit from "../../../components/TextfieldEdit/TextfieldEdit";
import MemberGrid from "../../../components/Grids/Specific/Member/MemberGrid";
import AssessmentOngoingGrid from "../../../components/Grids/Specific/Assessment/AssessmentOngoing/AssessmentOngoingGrid";
import AssessmentCompletedGrid from "../../../components/Grids/Specific/Assessment/AssessmentCompleted/AssessmentCompletedGrid";
import { RootState } from "../../../app/store";
import Textfield from "../../../components/Textfield/Textfield";
import { TeamAPP, useGetTeam, usePatchTeam } from "../../../api/TeamAPI";

/**
 * Page providing team details
 * This should only be accessible to the users and assessors in the team
 * Assessors can modify team details
 */
function Team({ theme }: { theme: Theme }) {
  const { teamId } = useParams();

  const { userRole } = useSelector((state: RootState) => state.userData);

  const { status, data, error } = useGetTeam(Number(teamId));

  const [teamInfo, setTeamInfo] = useState<TeamAPP>();

  // Called when "status" of team query is changed
  React.useEffect(() => {
    switch (status) {
      case "error":
        // eslint-disable-next-line no-console
        console.log(error);
        break;
      case "success":
        if (data) {
          setTeamInfo(data);
        }
        break;
      default:
        break;
    }
  }, [status, data]);

  const patchTeam = usePatchTeam();

  const changeInfo = (newInfo: TeamAPP) => {
    patchTeam.mutate(newInfo, {
      onSuccess: (teamAPP: TeamAPP) => {
        setTeamInfo(teamAPP);
      },
      onError: (e: unknown) => {
        // eslint-disable-next-line no-console
        console.log(e);
      },
    });
  };

  const changeDept = (newDept: string) => {
    if (teamInfo) {
      const newInfo = teamInfo;
      newInfo.department = newDept;
      changeInfo(newInfo);
    }
  };

  const changeCountry = (newCountry: string) => {
    if (teamInfo) {
      const newInfo = teamInfo;
      newInfo.country = newCountry;
      changeInfo(newInfo);
    }
  };

  return (
    <PageLayout title={`Team ${teamId}`} sidebarType={userTypes[userRole]}>
      <h2> Team Information </h2>
      <h3> Country </h3>

      {userRole === "ASSESSOR" && (
        <TextfieldEdit
          text={teamInfo ? teamInfo.country : ""}
          theme={theme}
          rows={1}
          handleSave={changeCountry}
        />
      )}

      {userRole !== "ASSESSOR" && (
        <Textfield
          text={teamInfo ? teamInfo.country : ""}
          theme={theme}
          rows={1}
          columns="inherit"
        />
      )}

      <h3> IT Area / Department </h3>

      {userRole === "ASSESSOR" && (
        <TextfieldEdit
          text={teamInfo ? teamInfo.department : ""}
          theme={theme}
          rows={1}
          handleSave={changeDept}
        />
      )}

      {userRole !== "ASSESSOR" && (
        <Textfield
          text={teamInfo ? teamInfo.department : ""}
          theme={theme}
          rows={1}
          columns="inherit"
        />
      )}

      {userRole === "ASSESSOR" && <h3>Invite Token</h3>}

      {userRole === "ASSESSOR" && teamInfo && (
        <FormControl sx={{ width: "inherit" }} variant="standard">
          <OutlinedInput
            readOnly
            sx={{ backgroundColor: "white" }}
            id="token"
            value={teamInfo.inviteToken}
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  onClick={() =>
                    navigator.clipboard.writeText(
                      teamInfo.inviteToken.toString()
                    )
                  }
                >
                  <ContentCopyIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      )}
      <h3>Assessors</h3>

      <MemberGrid
        theme={theme}
        userRole={userRole}
        teamId={Number(teamId)}
        forAssessors
      />
      <h3>Members</h3>
      <MemberGrid
        theme={theme}
        userRole={userRole}
        teamId={Number(teamId)}
        forAssessors={false}
      />

      <h3>Ongoing Evaluations</h3>
      <AssessmentOngoingGrid
        theme={theme}
        userRole={userRole}
        teamId={Number(teamId)}
        assessmentType="TEAM"
      />

      <h3>Completed Evaluations</h3>
      <AssessmentCompletedGrid
        theme={theme}
        teamId={Number(teamId)}
        assessmentType="TEAM"
      />
    </PageLayout>
  );
}

export default Team;
