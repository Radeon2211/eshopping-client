import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body, ul, ol, h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
  }

  @media only screen and (min-width: 112.5em) {
    html { font-size: 68.75%; }
  }

  @media only screen and (max-width: 56.25em) {
    html { font-size: 56.25%; }
  }

  @media only screen and (max-width: 37.5em) {
    html { font-size: 50%; }
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyles;
