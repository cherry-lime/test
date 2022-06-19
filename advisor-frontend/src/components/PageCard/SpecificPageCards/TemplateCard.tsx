import EditIcon from "@mui/icons-material/Edit";
import PageCard from "../PageCard";
import template from "../Images/template.png";

export default function TemplateCard() {
  return (
    <PageCard
      bodyText="View, create and edit evaluation templates"
      headerText="Templates"
      cardHeight="15vh"
      icon={
        <EditIcon
          color="info"
          fontSize="large"
          className="inverse_icon"
          sx={{
            bgcolor: "primary.main",
          }}
        />
      }
      image={template}
      isImageLeft
    />
  );
}
