import AppRouter from "./router/router";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./styles/globalStyle";

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <AppRouter />
    </RecoilRoot>
  );
}

export default App;
