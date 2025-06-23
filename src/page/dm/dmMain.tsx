import * as S from "./dmStyled";
import { useGetDmIssues } from "../../hooks/dm/getDm";
import { useGetMyProjects } from "../../hooks/project/getProjectData";
import { useState } from "react";
import useMe from "../../hooks/auth/getMyData";
import Modal from "../../components/modal/modal";
import { createDm } from "../../hooks/dm/createDm";
import useAllUsers from "../../hooks/team/getAlluser";
import { createAlert } from "../../hooks/alert/createAlert";
import { useGetIssueData } from "../../hooks/dm/getIssueData";

const Report = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const { projects, loading: projectsLoading } = useGetMyProjects(0);
  const {
    data: dmIssues,
    loading: issuesLoading,
    error,
  } = useGetDmIssues(selectedProjectId || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { me } = useMe();
  const [messageTitle, setMessageTitle] = useState("");
  const [messageVisibility, setMessageVisibility] = useState<
    "PRIVATE" | "PUBLIC"
  >("PRIVATE");
  const [messageContent, setMessageContent] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState<string>("");
  const { users } = useAllUsers();
  const [dismissedIndexes, setDismissedIndexes] = useState<number[]>([]);

  return (
    <S.Container>
      <S.Sidebar>
        <S.Title>다이렉트 메시지</S.Title>
        <S.Title>프로젝트 목록</S.Title>

        <S.ConversationList>
          {projectsLoading ? (
            <div>불러오는 중...</div>
          ) : (
            projects.map((project) => (
              <S.ConversationItem
                key={project.P_ID}
                onClick={() => setSelectedProjectId(String(project.P_ID))}
              >
                {project.P_NAME}
              </S.ConversationItem>
            ))
          )}
        </S.ConversationList>
      </S.Sidebar>
      <S.ChatArea>
        <S.ChatHeader>
          {selectedProjectId
            ? projects.find((p) => String(p.P_ID) === selectedProjectId)
                ?.P_NAME || "선택된 프로젝트"
            : "프로젝트를 선택해주세요"}
        </S.ChatHeader>
        <S.ChatMessages>
          {issuesLoading ? (
            <div>불러오는 중...</div>
          ) : error ? (
            <div>{error}</div>
          ) : dmIssues.length === 0 ? (
            <div>이슈가 없습니다.</div>
          ) : (
            dmIssues.map((msg, index) => {
              if (dismissedIndexes.includes(index)) return null;

              const isMine = msg.FOR_UID === me?.user.UID;
              return (
                <S.MessageItem
                  key={index}
                  isOwn={msg.I_RELEASE === "PRIVATE"}
                  style={{
                    backgroundColor: isMine ? "#ffe066" : undefined,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <strong>{msg.TITLE}</strong>
                    <span>내용: {msg.CONTENT}</span>
                    {/* <span>상태: {msg.I_STATUS}</span> */}
                    <span>우선순위: {msg.PRIORITY}</span>
                    <span>공개범위: {msg.I_RELEASE}</span>
                    <span>시작일: {msg.START_DATE}</span>
                  </div>
                  {isMine && (
                    <input
                      type="checkbox"
                      onChange={() =>
                        setDismissedIndexes((prev) => [...prev, index])
                      }
                    />
                  )}
                </S.MessageItem>
              );
            })
          )}
        </S.ChatMessages>
        <S.SendButton onClick={() => setIsModalOpen(true)}>
          메시지 보내기
        </S.SendButton>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div>
            <h3>팀원에게 메시지 보내기</h3>

            <select
              style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
              value={selectedRecipient}
              onChange={(e) => setSelectedRecipient(e.target.value)}
            >
              <option value="">팀원 선택</option>
              {users
                ?.filter((u) => u.UID !== me?.user.UID)
                .map((user) => (
                  <option key={user.UID} value={user.UID}>
                    {user.NICKNAME} ({user.EMAIL})
                  </option>
                ))}
            </select>

            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={messageTitle}
              onChange={(e) => setMessageTitle(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
            />

            <select
              style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
              value={messageVisibility}
              onChange={(e) =>
                setMessageVisibility(e.target.value as "PRIVATE" | "PUBLIC")
              }
            >
              <option value="PRIVATE">비공개</option>
              <option value="PUBLIC">공개</option>
            </select>

            <input
              type="text"
              placeholder="메시지를 입력하세요"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
            />

            <S.SendButton
              disabled={
                !selectedProjectId ||
                !selectedRecipient ||
                !messageTitle ||
                !messageContent
              }
              onClick={async () => {
                if (
                  !selectedProjectId ||
                  !selectedRecipient ||
                  !messageTitle ||
                  !messageContent
                ) {
                  console.warn("All fields are required.");
                  return;
                }

                try {
                  const today = new Date().toISOString().split("T")[0];

                  console.log("Attempting to send DM:", {
                    selectedProjectId,
                    selectedRecipient,
                    messageTitle,
                    messageContent,
                    messageVisibility,
                    today,
                  });

                  const result = await createDm(Number(selectedProjectId), {
                    TITLE: messageTitle,
                    CONTENT: messageContent,
                    FOR_UID: selectedRecipient,
                    START_DATE: today,
                    EXPIRE_DATE: today,
                    I_RELEASE: messageVisibility,
                  });

                  // await createAlert({
                  //   A_CATEGORY: "DM",
                  //   A_CONTENT: messageContent,
                  //   UID: selectedRecipient,
                  //   P_ID: Number(selectedProjectId),
                  //   I_ID: 0,
                  // });

                  console.log("DM sent successfully:", result);

                  setMessageTitle("");
                  setMessageContent("");
                  setSelectedRecipient("");
                  setIsModalOpen(false);
                } catch (error) {
                  console.error("DM send failed:", error);
                  alert("메시지 전송 중 오류가 발생했습니다.");
                }
              }}
            >
              보내기
            </S.SendButton>
          </div>
        </Modal>

        {/* <S.ChatInputWrapper>
          <S.ChatInput placeholder="메시지를 입력하세요..." />
          <S.SendButton>전송</S.SendButton>
        </S.ChatInputWrapper> */}
      </S.ChatArea>
    </S.Container>
  );
};

export default Report;
