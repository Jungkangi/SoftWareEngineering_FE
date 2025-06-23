import {
  PageWrapper,
  Title,
  Description,
  StepWrapper,
  StepIndicator,
  Step,
  FormGroup,
  Label,
  Input,
  Textarea,
  Select,
  AvatarUpload,
  TipBox,
  NextButton,
  PrevButton,
  Slide,
  SlidesContainer,
  SliderViewport,
} from "./ModifyteamStyled";
import React from "react";
import { useEffect, useState } from "react";
// import { createProjectAsPM } from "../../hooks/team/newTeam";
// import { addTeamMember } from "../../hooks/team/addMember";
import useAllUsers from "../../hooks/team/getAlluser";
import type { User } from "../../hooks/team/getAlluser";
import { useNavigate } from "react-router-dom";

const CreateTeamPage = ({
  initialProject,
  initialTeam,
  projectName,
  teamMembers,
}: {
  initialProject?: { P_ID: number; P_NAME: string };
  initialTeam?: any;
  projectName?: string;
  teamMembers?: User[];
}) => {
  const [teamName, setTeamName] = useState(projectName ?? "");
  const [description, setDescription] = useState(
    initialTeam?.DESCRIPTION ?? ""
  );
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // const [inviteEmail, setInviteEmail] = useState("");
  const [invitedMembers, setInvitedMembers] = useState<User[]>(
    teamMembers ?? []
  );
  const { users } = useAllUsers();

  useEffect(() => {
    if (inviteEmail && users) {
      const foundUser = users.find((u) => u.EMAIL === inviteEmail);
      setSelectedUser(foundUser ?? null);
    } else {
      setSelectedUser(null);
    }
  }, [inviteEmail, users]);

  const navigate = useNavigate();
  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      // Here you would call an API or perform actions to save the updated team info and members
      // For example, update description and member roles
      // This is a placeholder for actual save logic
      alert("변경사항이 저장되었습니다.");
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeam = async () => {
    setLoading(true);
    try {
      // Here you would call an API or perform actions to delete the team
      // This is a placeholder for actual delete logic
      alert("팀이 삭제되었습니다.");
      navigate("/project"); // Navigate away after deletion
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Title>팀 정보 수정</Title>
      <Description>팀 정보를 수정하고 팀원을 관리할 수 있습니다.</Description>
      <StepWrapper>
        <SliderViewport>
          <FormGroup>
            <Label>팀 이름</Label>
            <Input
              value={teamName}
              readOnly
              style={{ backgroundColor: "#f3f4f6", cursor: "not-allowed" }}
            />
          </FormGroup>

          <FormGroup>
            <Label>프로젝트 설명</Label>
            <div>{description}</div>
          </FormGroup>
          <FormGroup>
            <Label>팀원 이메일 초대</Label>
            <Input
              placeholder="이메일 입력 후 추가"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <NextButton
              type="button"
              disabled={
                !selectedUser ||
                invitedMembers.some((m) => m.UID === selectedUser.UID)
              }
              onClick={() => {
                if (
                  selectedUser &&
                  !invitedMembers.find((m) => m.UID === selectedUser.UID)
                ) {
                  setInvitedMembers((prev) => [...prev, selectedUser]);
                  setInviteEmail("");
                  setSelectedUser(null);
                }
              }}
            >
              추가
            </NextButton>
          </FormGroup>
          <FormGroup>
            <Label>팀원 목록</Label>
            {invitedMembers.length > 0 ? (
              <ul>
                {invitedMembers.map((member, index) => (
                  <li
                    key={member.UID}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontWeight: 600 }}>{member.NICKNAME}</span>
                      <span style={{ color: "#6b7280", fontSize: "0.85rem" }}>
                        {member.EMAIL}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <select
                        value={member.ROLE}
                        onChange={(e) => {
                          const newRole = e.target.value;
                          setInvitedMembers((prev) =>
                            prev.map((m, i) =>
                              i === index ? { ...m, ROLE: newRole } : m
                            )
                          );
                        }}
                        style={{
                          padding: "0.3rem 0.6rem",
                          borderRadius: "0.4rem",
                          border: "1px solid #d1d5db",
                        }}
                      >
                        <option value="PM">PM</option>
                        <option value="MEMBER">MEMBER</option>
                      </select>

                      <button
                        onClick={() =>
                          setInvitedMembers((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                        style={{
                          background: "transparent",
                          border: "none",
                          fontSize: "1rem",
                          color: "#dc2626",
                          cursor: "pointer",
                          lineHeight: 1,
                        }}
                        aria-label="Remove member"
                      >
                        ×
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                추가된 팀원이 없습니다.
              </p>
            )}
          </FormGroup>
        </SliderViewport>

        {step < 3 && (
          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
            {step > 0 && (
              <PrevButton onClick={() => setStep((prev) => prev - 1)}>
                이전
              </PrevButton>
            )}
            <NextButton onClick={handleSaveChanges} disabled={loading}>
              저장
            </NextButton>
          </div>
        )}

        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={handleDeleteTeam}
            disabled={loading}
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              padding: "0.6rem 1.2rem",
              border: "none",
              borderRadius: "0.4rem",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100%",
            }}
          >
            팀 삭제
          </button>
        </div>
      </StepWrapper>
    </PageWrapper>
  );
};

export default CreateTeamPage;
