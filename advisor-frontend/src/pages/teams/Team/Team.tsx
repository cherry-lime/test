import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Theme,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useRef, useState } from "react";
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
import ErrorPopup, {
  RefObject,
} from "../../../components/ErrorPopup/ErrorPopup";

/**
 * Page providing team details
 * This should only be accessible to the users and assessors in the team
 * Assessors can modify team details
 */
function Team({ theme }: { theme: Theme }) {
  const { teamId } = useParams();

  const { userRole } = useSelector((state: RootState) => state.userData);

  // Ref for error popup
  const ref = useRef<RefObject>(null);

  const { status, data, error } = useGetTeam(Number(teamId), ref);

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

  const patchTeam = usePatchTeam(ref);

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
  /*
  return page with e.g. the following: 
  team information, country, IT Area/ Department, 
  grids for ongoing evaluations, completed evaluations,
  grids for members, assessors that contains e.g. the name(s)
  of team members / assessors
  */
  return (
    <div>
      {teamInfo && (
        <PageLayout
          title={teamInfo ? teamInfo.name : ""}
          sidebarType={userTypes[userRole]}
        >
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
          <ErrorPopup ref={ref} />
        </PageLayout>
      )}
    </div>
  );
}

export default Team;
