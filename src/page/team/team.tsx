import React, { useState } from "react";
import * as S from "./teamStyled";
import { User } from "lucide-react";
import Modal from "../../components/modal/modal";
import CreateTeamPage from "./teamCreate";
// import { useMe } from "../../hooks/useMe";

const TeamPage = () => {
  // const { me } = useMe();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>팀</h1>
      {/* <S.SearchBar placeholder="Search teams" /> */}

      <S.SectionTitle>People you work with</S.SectionTitle>
      <div style={{ display: "flex", gap: "1rem" }}>
        <S.UserCard>
          <User size={32} color="black" />
          {/* <div style={{ marginTop: "0.5rem" }}>{me || "사용자"}</div> */}
          <div style={{ marginTop: "0.5rem" }}>{"사용자"}</div>
        </S.UserCard>
      </div>

      <S.SectionTitle>Teams</S.SectionTitle>
      <S.EmptyTeamWrapper>
        <S.EmptyTeamTitle>페이지를 공유하거나 팀을 멘션하세요</S.EmptyTeamTitle>
        <S.EmptyTeamDesc>
          지금 팀을 만들거나
          <a href="#" style={{ color: "#3b82f6", textDecoration: "underline" }}>
            팀과 공동 작업하는 방법
          </a>
          을 알아보세요
        </S.EmptyTeamDesc>
        <S.TeamCreateButton onClick={() => setIsModalOpen(true)}>
          팀 만들기
        </S.TeamCreateButton>
      </S.EmptyTeamWrapper>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateTeamPage />
      </Modal>
    </div>
  );
};

export default TeamPage;
