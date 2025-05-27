import * as S from "./sidebarStyled";
import { useRecoilState } from "recoil";
import { sidebarOpenState } from "../../props/sidebarprops";
import {
  LayoutDashboard,
  House,
  Calendar,
  Settings,
  ChartLine,
  Users,
  User,
  FileClock,
} from "lucide-react";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenState);

  return (
    <S.SidebarContainer isOpen={isSidebarOpen}>
      <S.SidebarMenu>
        <S.SidebarMenuItem isOpen={isSidebarOpen}>
          <S.SidebarLink isOpen={isSidebarOpen} to="/">
            <House />
            <span>Home</span>
          </S.SidebarLink>
        </S.SidebarMenuItem>
        <S.SidebarMenuItem isOpen={isSidebarOpen}>
          <S.SidebarLink isOpen={isSidebarOpen} to="/project">
            <LayoutDashboard />
            <span>Project</span>
          </S.SidebarLink>
        </S.SidebarMenuItem>
        <S.SidebarMenuItem isOpen={isSidebarOpen}>
          <S.SidebarLink isOpen={isSidebarOpen} to="/sprint">
            <FileClock />
            <span>Sprint</span>
          </S.SidebarLink>
        </S.SidebarMenuItem>
        <S.SidebarMenuItem isOpen={isSidebarOpen}>
          <S.SidebarLink isOpen={isSidebarOpen} to="/calendar">
            <Calendar />
            <span>Calendar</span>
          </S.SidebarLink>
        </S.SidebarMenuItem>
        <S.SidebarMenuItem isOpen={isSidebarOpen}>
          <S.SidebarLink isOpen={isSidebarOpen} to="/team">
            <Users />
            <span>Team</span>
          </S.SidebarLink>
        </S.SidebarMenuItem>
        <S.SidebarMenuItem isOpen={isSidebarOpen}>
          <S.SidebarLink isOpen={isSidebarOpen} to="/report">
            <ChartLine />
            <span>Report</span>
          </S.SidebarLink>
        </S.SidebarMenuItem>
        <S.SidebarMenuItem isOpen={isSidebarOpen}>
          <S.SidebarLink isOpen={isSidebarOpen} to="/setting">
            <Settings />
            <span>Setting</span>
          </S.SidebarLink>
        </S.SidebarMenuItem>
      </S.SidebarMenu>
      <S.SidebarFooter isOpen={isSidebarOpen}>
        <User />
        <span>test</span>
      </S.SidebarFooter>
    </S.SidebarContainer>
  );
};

export default Sidebar;
