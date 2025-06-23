import * as S from "./topStyled";
import { useRecoilState } from "recoil";
import { sidebarOpenState } from "../../props/sidebarprops";
import { PanelLeft, Bell, Search } from "lucide-react";
import { useState } from "react";
import Modal from "../../components/modal/modalAlert";
import { useGetAlerts } from "../../hooks/alert/getAlert";

interface Alert {
  A_ID: number;
  A_CONTENT: string;
  A_READ: boolean;
}

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenState);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const { alerts, loading } = useGetAlerts();

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
        {/* <S.CreateButton>+ Create</S.CreateButton> */}
        <S.NotificationIcon
          onClick={() => setNotificationOpen((prev) => !prev)}
        >
          <Bell />
          <div>{alerts?.filter((alert) => !alert.A_READ).length ?? 0}</div>
        </S.NotificationIcon>
        <Modal
          isOpen={isNotificationOpen}
          onClose={() => setNotificationOpen(false)}
        >
          {loading ? (
            <div>불러오는 중...</div>
          ) : alerts?.length === 0 ? (
            <div>알림이 없습니다.</div>
          ) : (
            alerts?.map((alert) => (
              <div key={alert.A_ID}>🔔 {alert.A_CONTENT}</div>
            ))
          )}
        </Modal>
      </S.TopRightWrapper>
    </S.Wrapper>
  );
};

export default Sidebar;
