import { Card, Grid, Stack, Tab, Tabs } from "@mui/material";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import RecommendationGrid from "../../components/Grids/Specific/RecommendationGrid";
import userTypes from "../../components/Sidebar/listUsersTypes";
import Subarea from "../../components/Subarea/Subarea";
import INGTheme from "../../Theme";
import PageLayout from "../PageLayout";
import ListOfCheckpoints from "../../components/ListOfCheckpoints/ListOfCheckpoints";

/**
 * Page with the feedback related to a self assessment
 * This should only be accessible to the user whose assement this belongs to
 */
function IndividualFeedback() {
  const { assessmentId } = useParams();


  return (
    <PageLayout
      title={`Recommendations for assessment with id ${assessmentId}`}
      sidebarType={userTypes.USER}
    >
      <ListOfCheckpoints theme={INGTheme} assessmentId={assessmentId} />
    </PageLayout>
  );
}

export default IndividualFeedback;
