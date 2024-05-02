import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle `

  :root {
    --green-color: #06c169;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: "Manrope", sans-serif;
  }

  a{
    text-decoration: none;
    color: white;
  }

  a.active {
    color:  var(--green-color);
  }

`
export default GlobalStyles