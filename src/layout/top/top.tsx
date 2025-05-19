import * as S from "./topStyled";
import { useRecoilState } from "recoil";
import { sidebarOpenState } from "../../props/sidebarprops";
import { PanelLeft, Bell, Search } from "lucide-react";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenState);

  return (
    <S.Wrapper>
      <S.FSubWrapper>
        <S.SideButton onClick={() => setSidebarOpen((prev) => !prev)}>
          <PanelLeft />
        </S.SideButton>
        <h3>JungKang2</h3>
      </S.FSubWrapper>
      <S.TopRightWrapper>
        <S.SearchInputWrapper>
          <Search />
          <S.SearchInput placeholder="Search..." />
        </S.SearchInputWrapper>
        <S.CreateButton>+ Create</S.CreateButton>
        <S.NotificationIcon>
          <Bell />
          <div>3</div>
        </S.NotificationIcon>
      </S.TopRightWrapper>
    </S.Wrapper>
  );
};

export default Sidebar;
