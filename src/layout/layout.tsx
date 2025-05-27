import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";
import * as S from "./layoutStyled";
import Top from "./top/top";

const Layout = () => {
  return (
    <S.Wrapper>
      <Top />
      <S.SubWrapper>
        <Sidebar />
        <S.Content>
          <Outlet />
        </S.Content>
      </S.SubWrapper>
    </S.Wrapper>
  );
};

export default Layout;
