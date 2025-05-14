// import { createGlobalStyle } from 'styled-components';

// const GlobalStyle = createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }

//   body {
//     font-family: 'Pretendard', sans-serif;
//     margin: 0;
//     padding: 0;
//   }

//   html{
//     width: 100vw;
//     height: 100vw;
//     overflow:hidden;
//   }

// `;

// export default GlobalStyle;

import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    font-size: 16px;
    line-height: 1.5;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font: inherit;
  }

  input, textarea, select {
    font: inherit;
  }
`
export default GlobalStyle;