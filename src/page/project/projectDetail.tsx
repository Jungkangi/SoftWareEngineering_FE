import React from "react";
import { Pen } from "lucide-react";
import * as S from "./projectDetailStyled";
import { putProjectData } from "../../hooks/project/putProjectData";

interface ProjectDetailProps {
  projectId: number;
  projectData: {
    P_NAME: string;
    STAT: string;
    DUE_DATE?: string;
    DISCRIPTION?: string;
    PRIORITY: string;
    CATEGORY?: string;
  };
  onUpdate: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  projectId,
  projectData,
  onUpdate,
}) => {
  const [editableProject, setEditableProject] = React.useState(projectData);
  const [isEditing, setIsEditing] = React.useState({
    P_NAME: false,
    STAT: false,
    DUE_DATE: false,
    DISCRIPTION: false,
    PRIORITY: false,
    CATEGORY: false,
  });

  return (
    <S.Wrapper>
      <S.HeaderArea>
        <S.Title>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            {isEditing.P_NAME ? (
              <S.StyledInput
                value={editableProject.P_NAME}
                onChange={(e) =>
                  setEditableProject((prev) => ({
                    ...prev,
                    P_NAME: e.target.value,
                  }))
                }
                autoFocus
              />
            ) : (
              <>{editableProject.P_NAME}</>
            )}
            <Pen
              size={16}
              style={{
                cursor: "pointer",
                opacity: 0.3,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.3")}
              onClick={() =>
                setIsEditing((prev) => ({
                  ...prev,
                  P_NAME: !prev.P_NAME,
                }))
              }
            />
          </div>
        </S.Title>
      </S.HeaderArea>

      <S.Section>
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <S.LabelSteyled>Status</S.LabelSteyled>
          <Pen
            size={16}
            style={{
              cursor: "pointer",
              opacity: 0.3,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.3")}
            onClick={() =>
              setIsEditing((prev) => ({
                ...prev,
                STAT: !prev.STAT,
              }))
            }
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {isEditing.STAT ? (
            <S.StyledInput
              value={editableProject.STAT}
              onChange={(e) =>
                setEditableProject((prev) => ({
                  ...prev,
                  STAT: e.target.value,
                }))
              }
              autoFocus
            />
          ) : (
            <>{editableProject.STAT}</>
          )}
        </div>
      </S.Section>

      <S.Section>
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <S.LabelSteyled>Due Date</S.LabelSteyled>
          <Pen
            size={16}
            style={{
              cursor: "pointer",
              opacity: 0.3,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.3")}
            onClick={() =>
              setIsEditing((prev) => ({
                ...prev,
                DUE_DATE: !prev.DUE_DATE,
              }))
            }
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {isEditing.DUE_DATE ? (
            <S.StyledInput
              type="date"
              value={editableProject.DUE_DATE || ""}
              onChange={(e) =>
                setEditableProject((prev) => ({
                  ...prev,
                  DUE_DATE: e.target.value,
                }))
              }
              autoFocus
            />
          ) : (
            <>{editableProject.DUE_DATE || ""}</>
          )}
        </div>
      </S.Section>

      <S.Section>
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <S.LabelSteyled>Description</S.LabelSteyled>
          <Pen
            size={16}
            style={{
              cursor: "pointer",
              opacity: 0.3,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.3")}
            onClick={() =>
              setIsEditing((prev) => ({
                ...prev,
                DISCRIPTION: !prev.DISCRIPTION,
              }))
            }
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {isEditing.DISCRIPTION ? (
            <S.DescriptionBox
              value={editableProject.DISCRIPTION || ""}
              onChange={(e) =>
                setEditableProject((prev) => ({
                  ...prev,
                  DISCRIPTION: e.target.value,
                }))
              }
              autoFocus
            />
          ) : (
            <>{editableProject.DISCRIPTION || ""}</>
          )}
        </div>
      </S.Section>

      <S.Row>
        <S.Column>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            <S.LabelSteyled>Priority</S.LabelSteyled>
            <Pen
              size={16}
              style={{
                cursor: "pointer",
                opacity: 0.3,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.3")}
              onClick={() =>
                setIsEditing((prev) => ({
                  ...prev,
                  PRIORITY: !prev.PRIORITY,
                }))
              }
            />
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            {isEditing.PRIORITY ? (
              <S.StyledInput
                value={editableProject.PRIORITY}
                onChange={(e) =>
                  setEditableProject((prev) => ({
                    ...prev,
                    PRIORITY: e.target.value,
                  }))
                }
                autoFocus
              />
            ) : (
              <>{editableProject.PRIORITY}</>
            )}
          </div>
        </S.Column>
        <S.Column>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            <S.LabelSteyled>Category</S.LabelSteyled>
            <Pen
              size={16}
              style={{
                cursor: "pointer",
                opacity: 0.3,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.3")}
              onClick={() =>
                setIsEditing((prev) => ({
                  ...prev,
                  CATEGORY: !prev.CATEGORY,
                }))
              }
            />
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
          >
            {isEditing.CATEGORY ? (
              <S.StyledInput
                value={editableProject.CATEGORY || ""}
                onChange={(e) =>
                  setEditableProject((prev) => ({
                    ...prev,
                    CATEGORY: e.target.value,
                  }))
                }
                autoFocus
              />
            ) : (
              <>{editableProject.CATEGORY || ""}</>
            )}
          </div>
        </S.Column>
      </S.Row>

      <S.StyledButton
        onClick={async () => {
          try {
            await putProjectData(projectId, {
              P_NAME: editableProject.P_NAME,
              P_STATUS: editableProject.STAT,
              DISCRIPTION: editableProject.DISCRIPTION || "",
              PRIORITY: editableProject.PRIORITY,
              CATEGORY: editableProject.CATEGORY || "",
            });
            onUpdate();
          } catch (error) {
            console.error("Failed to update project:", error);
          }
        }}
      >
        Update
      </S.StyledButton>
    </S.Wrapper>
  );
};

export default ProjectDetail;
