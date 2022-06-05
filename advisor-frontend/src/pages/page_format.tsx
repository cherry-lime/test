import { Box } from "@mui/material";
import Header from "../components/Cards/Header";
import Footer from "../components/Cards/Footer";

type PageProps = {
  footer?: boolean;
  title: string;
  children: React.ReactNode;
  headerColor?: string
};
const defaultProps = {
  footer: false,
  headerColor: "secondary.main"
};

// Page template, footer and headerColor are optional, declare when you need them
export default function PageLayout({ children, footer, title, headerColor }: PageProps) {
  return (
    <body> 
      <Header name={title} bgcolor={headerColor} />
      {footer ? (
        <>
          <Box className="body_footer"> {children} </Box>
          <Footer />
        </>
      ) : <Box className="body"> {children} </Box>}
    </body>
  );
}
PageLayout.defaultProps = defaultProps;
