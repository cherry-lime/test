import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Theme,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
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
import {
  TeamAPP,
  useGetTeam,
  usePatchTeam,
} from "../../../api/TeamAPI/TeamAPI";
import ErrorPopup, {
  handleError,
  RefObject,
} from "../../../components/ErrorPopup/ErrorPopup";
import { checkTeamRouting } from "../../routingHelpers";
import { UserRole } from "../../../types/UserRole";

/**
 * Page providing team details
 * This should only be accessible to the users and assessors in the team
 * Assessors can modify team details
 */
function Team({
  theme,
  presetTeamInfo,
  presetUserRole,
}: {
  theme: Theme;
  presetTeamInfo?: TeamAPP | undefined;
  presetUserRole?: UserRole;
}) {
  const { teamId } = useParams();
  const [userRole, setUserRole] = useState<UserRole>();

  React.useEffect(() => {
    setUserRole(presetUserRole);
  }, [presetUserRole]);

  const { userRole: gotUserRole, userId } = useSelector(
    (state: RootState) => state.userData
  );

  React.useEffect(() => {
    if (!presetUserRole) {
      setUserRole(gotUserRole);
    }
  }, [gotUserRole]);

  // Ref for error popup
  const ref = useRef<RefObject>(null);
  const navigate = useNavigate();

  const teamResponse = useGetTeam(Number(teamId), ref);

  const [teamInfo, setTeamInfo] = useState<TeamAPP>();
  // use useeffect hooks , so you don't have to write classes
  React.useEffect(() => {
    if (presetTeamInfo) {
      setTeamInfo(presetTeamInfo);
    }
  }, [presetTeamInfo]);

  React.useEffect(() => {
    const rerouting = checkTeamRouting(teamResponse);
    if (rerouting) {
      navigate(rerouting);
    }

    if (teamResponse.data && teamResponse.status === "success") {
      setTeamInfo(teamResponse.data);
    }
  }, [teamResponse]);

  const patchTeam = usePatchTeam(ref);

  const changeInfo = (newInfo: TeamAPP) => {
    patchTeam.mutate(newInfo, {
      onSuccess: (teamAPP: TeamAPP) => {
        setTeamInfo(teamAPP);
      },
      onError: (error) => {
        handleError(ref, error);
      },
    });
  };
  // constant declaration that lets you change the IT department
  const changeDept = (newDept: string) => {
    if (teamInfo) {
      const newInfo = teamInfo;
      newInfo.department = newDept;
      changeInfo(newInfo);
    }
  };
  // constant declaration that lets you change the country
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
      {teamInfo && userRole && (
        <PageLayout title={teamInfo.name} sidebarType={userTypes[userRole]}>
          <h2> Team Information </h2>
          <h3> Country </h3>

          {userRole === "ASSESSOR" ? (
            <TextfieldEdit
              text={teamInfo.country}
              theme={theme}
              rows={1}
              handleSave={changeCountry}
            />
          ) : (
            <Textfield
              text={teamInfo.country}
              theme={theme}
              rows={1}
              columns="inherit"
            />
          )}

          <h3> IT Area / Department </h3>

          {userRole === "ASSESSOR" ? (
            <TextfieldEdit
              text={teamInfo.department}
              theme={theme}
              rows={1}
              handleSave={changeDept}
            />
          ) : (
            <Textfield
              text={teamInfo.department}
              theme={theme}
              rows={1}
              columns="inherit"
            />
          )}

          {userRole === "ASSESSOR" && (
            <div
              id="token-info"
              style={{ width: "inherit", display: "contents" }}
            >
              <h3>Invite Token</h3>
              <FormControl sx={{ width: "inherit" }} variant="standard">
                <OutlinedInput
                  readOnly
                  sx={{ backgroundColor: "white" }}
                  id="token"
                  value={teamInfo.inviteToken}
                  startAdornment={
                    <InputAdornment position="start">
                      <IconButton
                        data-testid="copy-token"
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
            </div>
          )}

          <h3>Facilitators</h3>
          <MemberGrid
            theme={theme}
            userId={Number(userId)}
            userRole={userRole}
            teamId={Number(teamId)}
            forAssessors
          />

          <h3>Members</h3>
          <MemberGrid
            theme={theme}
            userId={Number(userId)}
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

Team.defaultProps = {
  presetTeamInfo: undefined,
  presetUserRole: undefined,
};

export default Team;
