import { Box } from "@mui/material";
import Header from "../components/Cards/Header";
import Footer from "../components/Cards/Footer";
import Sidebar from "../components/Sidebar/Sidebar";

/**
 * PageProps type is used to pass through components that will dynamically alter the pageLayout.
 */
type PageProps = {
  footer?: boolean;
  title: string;
  children: React.ReactNode;
  headerColor?: string;
  sidebarType: Map<string, boolean>;
};
const defaultProps = {
  footer: false,
  headerColor: "secondary.main",
};

/**
 * @description A function where the body styling is automatically applied, where the content can be passed as children.
 * @param children Placing content between <PageLayout> </PageLayout> will be passed as children.
 * @param footer A boolean value that determines if the footer will be rendered in the page layout. Default is false
 * @param title A string value that gives the header a title
 * @param headerColor: An optional string value that gives the header a specific background. Default is defined in the global theme file.
 * @param sidebarType A Map<string, boolean> type that defines the sidebar items. These are defined under listUserTypes.tsx
 * @returns A body that is styled that fits the webpage design.
 */
export default function PageLayout({
  children,
  footer,
  title,
  headerColor,
  sidebarType,
}: PageProps) {
  return (
    <Sidebar sidebarType={sidebarType}>
      <div className="main_container">
        <Header name={title} bgcolor={headerColor} />
        {footer ? (
          <>
            <Box className="body_footer"> {children} </Box>
            <Footer />
          </>
        ) : (
          <Box className="body"> {children} </Box>
        )}
      </div>
    </Sidebar>
  );
}
PageLayout.defaultProps = defaultProps;