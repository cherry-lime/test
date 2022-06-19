import { createGlobalStyle } from "styled-components";
import Theme from "./Theme";

const GlobalStyles = createGlobalStyle`
  h2 {
    color: ${Theme.palette.text.secondary};
    width: inherit;
    text-align: left;
    float: left;
    cursor: pointer;
    margin-bottom: 0px;
  }
`;

export default GlobalStyles;
