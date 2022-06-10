import { Box } from "@mui/material";
import Room from "./newpage";

/**
 * Used to setup routing of all the pages and give an overview of all the different pages in the webpage.
 * @returns All pages that are called within AllPages()
 * @example {<Box>
 * <page1/>
 * <page2/>
 * </Box>}
 */
export default function AllPages() {
  return (
    <Box>
      <Room />
    </Box>
  );
}
