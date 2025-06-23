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
} from "./teamCreateStyled";
import { useEffect } from "react";
import { Info } from "lucide-react";
import { createProjectAsPM } from "../../hooks/team/newTeam";
import { addTeamMember } from "../../hooks/team/addMember";
import { useState } from "react";
import useAllUsers from "../../hooks/team/getAlluser";
import type { User } from "../../hooks/team/getAlluser";
import { useGetMyProjects } from "../../hooks/project/getProjectData";
import { useNavigate } from "react-router-dom";

const CreateTeamPage = ({
  initialProject,
}: {
  initialProject?: { P_ID: number; P_NAME: string };
}) => {
  const [teamName, setTeamName] = useState(initialProject?.P_NAME ?? "");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [teamProjectId, setTeamProjectId] = useState<number | "">(
    initialProject && initialProject.P_ID ? initialProject.P_ID : ""
  );
  const { projects: myProjects } = useGetMyProjects(0);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [inviteEmail, setInviteEmail] = useState("");
  const [invitedMembers, setInvitedMembers] = useState<User[]>([]);
  const { users } = useAllUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const navigate = useNavigate();

  // Detect email and log users on inviteEmail/users change
  useEffect(() => {
    if (inviteEmail && Array.isArray(users)) {
      const found = users.find(
        (u) => u.EMAIL.toLowerCase() === inviteEmail.toLowerCase()
      );
      setSelectedUser(found ? { ...found, ROLE: "MEMBER" } : null);
    } else {
      setSelectedUser(null);
    }
  }, [inviteEmail, users]);

  const handleNextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const createdAt = new Date().toISOString().split("T")[0];

      // 팀 생성 및 팀원 추가 동기 처리
      const teamRes = await createProjectAsPM({
        ROLE: "PM",
        P_NAME: teamName,
        CREATE_DATE: createdAt,
      });

      if (teamRes?.U_ID) {
        for (const member of invitedMembers) {
          await addTeamMember({
            U_ID: member.UID,
            ROLE: "MEMBER",
            P_NAME: teamName,
            CREATE_DATE: createdAt,
          });
        }
      }

      setStep(3);
    } catch (error) {
      console.error("팀 생성 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return myProjects.length === 0 ? (
          <>
            <Description style={{ marginBottom: "1.5rem" }}>
              아직 생성된 프로젝트가 없습니다.
            </Description>
            <NextButton
              onClick={() => navigate("/project")}
              style={{ padding: "0.6rem 1.2rem" }}
            >
              프로젝트 생성하러 가기 →
            </NextButton>
          </>
        ) : (
          <>
            <FormGroup>
              <Label>연결할 프로젝트 선택</Label>
              <Select
                value={teamProjectId}
                onChange={(e) => {
                  const id = e.target.value ? Number(e.target.value) : "";
                  setTeamProjectId(id);
                  const proj = myProjects.find((p) => p.P_ID === id);
                  setTeamName(proj ? proj.P_NAME : "");
                }}
              >
                <option value="">프로젝트 선택</option>
                {myProjects.map((proj) => (
                  <option key={proj.P_ID} value={proj.P_ID}>
                    {proj.P_NAME}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>프로젝트 설명</Label>
              <div>{description}</div>
            </FormGroup>

            <TipBox>
              <Info size={20} />
              <span>
                <strong>팀 정보 작성 팁</strong>
                <br />
                팀과 연동될 프로젝트를 선택하세요.
              </span>
            </TipBox>
          </>
        );
      case 1:
        return (
          <>
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
              <Label>추가된 팀원</Label>
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
                        <span style={{ fontWeight: 600 }}>
                          {member.NICKNAME}
                        </span>
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
                  아직 추가된 팀원이 없습니다.
                </p>
              )}
            </FormGroup>

            <TipBox>
              <Info size={20} />
              <span>
                <strong>팀원 초대 팁</strong>
                <br />
                이메일로 팀원을 검색하여 초대하세요. 유효한 이메일만 추가됩니다.
              </span>
            </TipBox>
          </>
        );
      case 2:
        return (
          <>
            <FormGroup>
              <Label>연결할 프로젝트 정보</Label>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  lineHeight: "1.8",
                }}
              >
                <li>
                  <strong>연결된 프로젝트:&nbsp;</strong>
                  {teamName || "—"}
                </li>
                <li>
                  <strong>추가할 팀원 수:&nbsp;</strong>
                  {invitedMembers.length}
                </li>
              </ul>
            </FormGroup>

            <FormGroup>
              <Label>팀원 목록</Label>
              {invitedMembers.length > 0 ? (
                <ul style={{ margin: 0, padding: 0 }}>
                  {invitedMembers.map((member, index) => (
                    <li
                      key={member.UID}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontWeight: 600 }}>
                          {member.NICKNAME}
                        </span>
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

            <TipBox>
              <Info size={20} />
              <span>
                <strong>검토 및 확인</strong>
                <br />
                입력한 정보를 확인한 후 <b>제출</b>을 눌러 팀 생성을 완료하세요.
              </span>
            </TipBox>
          </>
        );
      case 3:
        return <Description>팀 생성이 완료되었습니다! 축하합니다.</Description>;
      default:
        return null;
    }
  };

  return (
    <PageWrapper>
      <Title>새 팀 생성</Title>
      <Description>
        팀 정보를 입력하고 팀원을 초대하여 새로운 팀을 만들어보세요.
      </Description>

      <StepWrapper>
        <StepIndicator>
          {["팀 정보", "팀원 초대", "검토 및 확인", "완료"].map(
            (label, idx) => (
              <Step
                key={idx}
                active={idx === step}
                onClick={() => setStep(idx)}
                style={{ cursor: "pointer" }}
              >
                <div>{idx + 1}</div>
                {label}
              </Step>
            )
          )}
        </StepIndicator>

        <SliderViewport>
          <SlidesContainer step={step}>
            {[0, 1, 2, 3].map((s) => (
              <Slide key={s}>{renderStepContent(s)}</Slide>
            ))}
          </SlidesContainer>
        </SliderViewport>

        {step < 3 && (
          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
            {step > 0 && (
              <PrevButton onClick={() => setStep((prev) => prev - 1)}>
                이전
              </PrevButton>
            )}
            <NextButton
              disabled={step === 0 && teamProjectId === ""}
              onClick={async () => {
                if (step === 2) {
                  await handleSubmit();
                } else {
                  handleNextStep();
                }
              }}
            >
              {step === 2 ? "제출" : "다음"}
            </NextButton>
          </div>
        )}
      </StepWrapper>
    </PageWrapper>
  );
};

export default CreateTeamPage;
