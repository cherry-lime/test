import { createGlobalStyle } from "styled-components";
import Theme from "./Theme";

const GlobalStyles = createGlobalStyle`
  h2 {
    color: ${Theme.palette.text.secondary};
    width: inherit;
    text-align: left;
    margin-bottom: 0px;
  }
  .MuiOutlinedInput-input { 
    background-color: white;
  }
  p {
    width: inherit;
  }
  .arrowIcon {
    color: ${Theme.palette.primary.main};
  }
`;

export default GlobalStyles;
