import { createGlobalStyle } from "styled-components";
import Theme from "./Theme";

const GlobalStyles = createGlobalStyle`
  h2 {
    color: ${Theme.palette.text.secondary};
    width: inherit;
    text-align: left;
    margin-top: 10px;
    margin-bottom: 0px;
  }
  h3 {
    color: ${Theme.palette.text.secondary};
    width: inherit;
    text-align: left;
    margin-top: 10px;
    margin-bottom: 0px;
  }
  .MuiOutlinedInput-input { 
    background-color: white !important;
  }
  p {
    width: inherit;
  }
  .arrowIcon {
    color: ${Theme.palette.primary.main};
  }
`;

export default GlobalStyles;
