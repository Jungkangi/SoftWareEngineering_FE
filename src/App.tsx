// import AppRouter from "./router/router";
// import { RecoilRoot } from "recoil";
// import GlobalStyle from "./styles/globalStyle";

// function App() {
//   return (
//     <RecoilRoot>
//       <GlobalStyle />
//       <AppRouter />
//     </RecoilRoot>
//   );
// }

// export default App;
import AppRouter from "./router/router";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./styles/globalStyle";
import { ThemeProvider } from "styled-components"; // ThemeProvider 추가
import { lightTheme } from "./page/project/projectStyled"; // lightTheme 가져오기

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <AppRouter />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;