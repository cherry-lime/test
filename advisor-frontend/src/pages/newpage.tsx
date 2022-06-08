import PageLayout from "./PageLayout";
import footerImage from "../components/Cards/footer_img.svg";

// To create pages, copy the file and add content within <PageLayout>
// This is a template
export default function Room() {
  return (
    <PageLayout title="Home" footer headerColor="#9f9dc4">
      text
      <img src={footerImage} alt="text" />
      <img src={footerImage} alt="text" />
    </PageLayout>
  );
}
