import { Box } from "@mui/material";
import Header from "../components/Cards/Header";
import Footer from "../components/Cards/Footer";
import Room from "./newpage";

type PageProps = {
  footer?: boolean;
  title: string;
  children: React.ReactNode;
};

export default function PageLayout({ children, footer, title }: PageProps) {
  return (
    <>
      <Header name ={title} />
      <Box className="body"> {children} </Box>
      <Footer />
    </>
  );
}

// Page template, 
export function AllPages() {
  return (
    <Room />
  );
}


