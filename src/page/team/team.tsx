import React, { useState } from "react";
import * as S from "./teamStyled";
import { User } from "lucide-react";
import Modal from "../../components/modal/modal";
import CreateTeamPage from "./teamCreate";
import Modifyteam from "./teamModify";
import useGetTeams from "../../hooks/team/getTeamData";
import { useGetMyProjects } from "../../hooks/project/getProjectData";
import useMe from "../../hooks/auth/getMyData";
import useAllUsers from "../../hooks/team/getAlluser";

const TeamPage = () => {
  const { me } = useMe();
  const { users } = useAllUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState<{
    P_ID: number;
    T_ID: number;
    ROLE: string;
    CREATE_DATE: string;
    U_ID?: number;
    [key: string]: any;
  } | null>(null);
  const { teams, loading, error } = useGetTeams(refreshTrigger);
  const { projects } = useGetMyProjects(refreshTrigger);

  console.log("teams", teams);
  console.log("me", me);
  console.log("projects", projects);

  if (!me) return <p>Loading user info...</p>;

  const myUserId = me?.user?.UID;
  console.log("myUserId", myUserId);
  const uniqueTeamsMap = new Map();
  Array.isArray(teams) &&
    teams.forEach((t) => {
      if (t.U_ID === myUserId && !uniqueTeamsMap.has(t.P_ID)) {
        uniqueTeamsMap.set(t.P_ID, t);
      }
    });
  const uniqueTeams = Array.from(uniqueTeamsMap.values());

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
      {loading ? (
        <p>Loading teams...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : uniqueTeams.length > 0 ? (
        <S.TeamList>
          {uniqueTeams.map((t) => (
            <S.TeamCard
              key={t.T_ID}
              onClick={() => {
                setSelectedTeam(t);
                setIsCreatingTeam(false);
                setIsModalOpen(true);
              }}
            >
              <div style={{ fontWeight: 600 }}>
                {(Array.isArray(projects) &&
                  projects.find((p) => p.P_ID === t.P_ID)?.P_NAME) ||
                  "알 수 없는 프로젝트"}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                ROLE: {t.ROLE}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                생성일: {t.CREATE_DATE}
              </div>
            </S.TeamCard>
          ))}
        </S.TeamList>
      ) : null}
      {!loading && (
        <S.EmptyTeamWrapper>
          <S.EmptyTeamTitle>
            페이지를 공유하거나 팀을 멘션하세요
          </S.EmptyTeamTitle>
          <S.EmptyTeamDesc>
            지금 팀을 만들거나
            <a
              href="#"
              style={{ color: "#3b82f6", textDecoration: "underline" }}
            >
              팀과 공동 작업하는 방법
            </a>
            을 알아보세요
          </S.EmptyTeamDesc>
          <S.TeamCreateButton
            onClick={() => {
              setIsCreatingTeam(true);
              setIsModalOpen(true);
            }}
          >
            팀 만들기
          </S.TeamCreateButton>
        </S.EmptyTeamWrapper>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTeam(null);
          setIsCreatingTeam(false);
          setRefreshTrigger((prev) => prev + 1);
        }}
      >
        <div style={{ padding: "1.5rem" }}>
          {isCreatingTeam ? (
            <CreateTeamPage />
          ) : (
            selectedTeam && (
              <Modifyteam
                initialTeam={selectedTeam}
                projectName={
                  Array.isArray(projects)
                    ? projects.find((p) => p.P_ID === selectedTeam?.P_ID)
                        ?.P_NAME
                    : ""
                }
                teamMembers={teams
                  .filter((tm) => tm.P_ID === selectedTeam?.P_ID)
                  .map((tm) => {
                    const matchedUser = users?.find(
                      (user) => user.UID === tm.U_ID
                    );
                    return {
                      UID: tm.U_ID,
                      NICKNAME: matchedUser?.NICKNAME || "알 수 없음",
                      EMAIL: matchedUser?.EMAIL || "",
                      ROLE: tm.ROLE || "MEMBER",
                      PASSWORD: "",
                      PHONE: "",
                      CREATE_DATE: tm.CREATE_DATE || "",
                    };
                  })}
              />
            )
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TeamPage;
