import PageLayout from "./page_format";
import footerImage from "../components/Cards/footer_img.svg";

// To create pages, copy the file and add content within <PageLayout>
export default function Room() {
  return (
    <PageLayout title="Home" footer headerColor="#9f9dc4">
      text
      <img src={footerImage} alt="text" />
      <img src={footerImage} alt="text" />
    </PageLayout>
  );
}
