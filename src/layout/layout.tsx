import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";
import * as S from "./layoutStyled";
import Top from "./top/top";
import { useNavigate } from "react-router-dom";
import { useCheckToken } from "../hooks/checkToken";
import { useEffect } from "react";

const Layout = () => {
  const { isLoggedIn } = useCheckToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인해 주세요");
      navigate("/auth");
    }
  }, [isLoggedIn, navigate]);

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
