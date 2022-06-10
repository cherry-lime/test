import PageLayout from "./PageLayout";
import footerImage from "../components/Cards/footer_img.svg";
import userType from "../components/Sidebar/listUsersTypes";

// To create pages, copy the file and add content within <PageLayout>
// This is a template
export default function Example() {
  return (
    <PageLayout
      title="Home"
      footer
      headerColor="#9f9dc4"
      sidebarType={userType.USER}
    >
      text
      <img src={footerImage} alt="text" />
      <img src={footerImage} alt="text" />
    </PageLayout>
  );
}
