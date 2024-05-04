import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle `

  :root {
    --green-color: #06c169;
    --title-white-color: #ececec;
    --paragraph-white-color: #a1a1a2;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: "Manrope", sans-serif;
  }
`
export default GlobalStyles