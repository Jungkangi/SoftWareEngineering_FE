import styled, { css } from "styled-components";
import React, { useState } from "react";
import type { CSSProperties } from "react";
import { MessageCircle, Trash2 } from "lucide-react";

// Button
type ButtonVariant = "default" | "outline" | "ghost" | "destructive" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";
interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}
const getVariantStyles = (variant: ButtonVariant = "default") => {
  switch (variant) {
    case "default":
      return css`
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.primaryForeground};
        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.primary}dd;
        }
      `;
    case "outline":
      return css`
        background-color: transparent;
        border: 1px solid ${({ theme }) => theme.colors.border};
        color: ${({ theme }) => theme.colors.foreground};
        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.accent};
          color: ${({ theme }) => theme.colors.accentForeground};
        }
      `;
    case "ghost":
      return css`
        background-color: transparent;
        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.accent};
          color: ${({ theme }) => theme.colors.accentForeground};
        }
      `;
    case "destructive":
      return css`
        background-color: ${({ theme }) => theme.colors.destructive};
        color: ${({ theme }) => theme.colors.destructiveForeground};
        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.destructive}dd;
        }
      `;
    case "link":
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: underline;
        &:hover:not(:disabled) {
          text-decoration: none;
        }
      `;
  }
};
const getSizeStyles = (size: ButtonSize = "default") => {
  switch (size) {
    case "default":
      return css`
        height: 2.5rem;
        padding: 0 1rem;
        font-size: ${({ theme }) => theme.fontSizes.sm};
      `;
    case "sm":
      return css`
        height: 2rem;
        padding: 0 0.75rem;
        font-size: ${({ theme }) => theme.fontSizes.xs};
      `;
    case "lg":
      return css`
        height: 3rem;
        padding: 0 1.5rem;
        font-size: ${({ theme }) => theme.fontSizes.md};
      `;
    case "icon":
      return css`
        height: 2.5rem;
        width: 2.5rem;
        padding: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      `;
  }
};
export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 500;
  transition: all ${({ theme }) => theme.transitions.default};
  cursor: pointer;

  ${({ variant }) => getVariantStyles(variant)}
  ${({ size }) => getSizeStyles(size)}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

// Badge
type BadgeVariant =
  | "default"
  | "secondary"
  | "outline"
  | "destructive"
  | "success";
interface BadgeProps {
  variant?: BadgeVariant;
}
const getVariantStylesBadge = (variant: BadgeVariant = "default") => {
  switch (variant) {
    case "default":
      return css`
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.primaryForeground};
      `;
    case "secondary":
      return css`
        background-color: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.secondaryForeground};
      `;
    case "outline":
      return css`
        background-color: transparent;
        border: 1px solid ${({ theme }) => theme.colors.border};
        color: ${({ theme }) => theme.colors.foreground};
      `;
    case "destructive":
      return css`
        background-color: ${({ theme }) => theme.colors.destructive};
        color: ${({ theme }) => theme.colors.destructiveForeground};
      `;
    case "success":
      return css`
        background-color: ${({ theme }) => theme.colors.success};
        color: ${({ theme }) => theme.colors.successForeground};
      `;
  }
};
export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.full || "9999px"};
  font-size: ${({ theme }) => theme.fontSizes.xs || "12px"};
  font-weight: 500;
  padding: 0 ${({ theme }) => theme.space[2] || "8px"};
  height: 1.25rem;
  white-space: nowrap;

  ${({ variant }) => getVariantStylesBadge(variant)}
`;

// Avatar
export const Avatar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.full || "9999px"};
  width: 2rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.muted || "#f3f4f6"};
`;
export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const AvatarFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.xs || "12px"};
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.primary || "#6366f1"};
  color: ${({ theme }) => theme.colors.primaryForeground || "#fff"};
`;

// Card
export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.card || "#fff"};
  border-radius: ${({ theme }) => theme.radii.lg || "12px"};
  border: 1px solid ${({ theme }) => theme.colors.border || "#e5e7eb"};
  box-shadow: ${({ theme }) =>
    theme.shadows.sm || "0 1px 2px 0 rgba(0,0,0,0.05)"};
  overflow: hidden;
`;
export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space[6] || "16px"};
  padding-bottom: ${({ theme }) => theme.space[4] || "8px"};
`;
export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.space[1]};
  color: ${({ theme }) => theme.colors.cardForeground};
`;
export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;
export const CardContent = styled.div`
  padding: ${({ theme }) => theme.space[6] || "16px"};
  padding-top: 0;
`;
export const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.space[6]};
  padding-top: 0;
  gap: ${({ theme }) => theme.space[2]};
`;

// Progress
interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  style?: CSSProperties;
}
export const ProgressContainer = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.secondary || "#f3f4f6"};
  border-radius: ${({ theme }) => theme.radii.full || "9999px"};
  height: 0.5rem;
  width: 100%;
`;
export const ProgressIndicator = styled.div<ProgressProps>`
  background-color: ${({ theme }) => theme.colors.primary || "#6366f1"};
  height: 100%;
  transition: width 0.2s ease;
  width: ${({ value }) => `${value || 0}%`};
`;
export const Progress: React.FC<ProgressProps> = ({
  value = 0,
  style,
  ...props
}) => {
  return (
    <ProgressContainer style={style} {...props}>
      <ProgressIndicator value={value} />
    </ProgressContainer>
  );
};

// Tabs
export const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const TabsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;
interface TabsTriggerProps {
  active?: boolean;
}
export const TabsTrigger = styled.button<TabsTriggerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  border-bottom: 2px solid
    ${({ active, theme }) => (active ? theme.colors.primary : "transparent")};
  color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.mutedForeground};

  &:hover {
    color: ${({ theme }) => theme.colors.foreground};
  }
`;
export const TabsContent = styled.div`
  margin-top: ${({ theme }) => theme.space[2]};
`;

// Select
export const Select = styled.div`
  position: relative;
  width: 100%;
`;
export const SelectTrigger = styled.button`
  display: flex;
  height: 2.5rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.input};
  background-color: transparent;
  padding: 0 ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary};
  }
`;
export const SelectValue = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`;
export const SelectContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  width: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-top: ${({ theme }) => theme.space[1]};
`;
export const SelectItem = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
`;

// Dialog(Modal) 스타일 컴포넌트만 유지
export const DialogOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;
export const DialogContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  width: 100%;
  max-width: 32rem;
  max-height: 85vh;
  overflow-y: auto;
  padding: ${({ theme }) => theme.space[6]};
`;
export const DialogHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.space[4]};
`;
export const DialogTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.space[1]};
`;
export const DialogDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;
export const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.space[4]};
`;
export const FormGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[4]} 0;
`;
export const FormGroup = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[2]};
`;
export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.space[4]};
`;
export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
`;
export const Textarea = styled.textarea`
  width: 100%;
  min-height: 3rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.input};
  padding: ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  resize: vertical;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
`

// 댓글 박스(메시지 박스) 컴포넌트
export type CommentType = {
  id: number
  author: string
  content: string
  createdAt: string
}

export function CommentBox({
  comments,
  onAdd,
  onDelete,
  style,
  inputPlaceholder = "댓글을 입력하세요...",
}: {
  comments: CommentType[]
  onAdd: (content: string) => void
  onDelete: (commentId: number) => void
  style?: React.CSSProperties
  inputPlaceholder?: string
}) {
  // 기본값을 true로 변경하여 댓글이 기본적으로 열려있는 상태가 되도록 함
  const [open, setOpen] = useState(true)
  const [input, setInput] = useState("")
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        background: "#f9fafb",
        marginTop: 8,
        padding: 0,
        boxShadow: "0 1px 2px 0 rgba(0,0,0,0.03)",
        ...style,
      }}
    >
      <button
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          background: "none",
          border: "none",
          padding: "8px 12px",
          cursor: "pointer",
          borderBottom: "1px solid #e5e7eb",
          fontWeight: 500,
          fontSize: 14,
          color: "#374151",
        }}
        onClick={() => setOpen((o) => !o)}
      >
        <MessageCircle size={16} style={{ marginRight: 8, color: "#6366f1" }} />
        댓글 {comments.length > 0 && <span style={{ color: "#6366f1", marginLeft: 4 }}>({comments.length})</span>}
        <span style={{ marginLeft: "auto", fontSize: 13, color: "#9ca3af" }}>{open ? "닫기" : "펼치기"}</span>
      </button>
      {open && (
        <div style={{ padding: 12, paddingTop: 8 }}>
          <div style={{ maxHeight: 220, overflowY: "auto", marginBottom: 8 }}>
            {comments.length === 0 && (
              <div style={{ color: "#9ca3af", fontSize: 13, textAlign: "center", padding: 12 }}>아직 댓글이 없습니다.</div>
            )}
            {comments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: 10,
                  borderBottom: "1px solid #f3f4f6",
                  paddingBottom: 6,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 13, color: "#374151" }}>
                    {comment.author}
                    <span style={{ color: "#9ca3af", fontSize: 11, marginLeft: 8 }}>{comment.createdAt}</span>
                  </div>
                  <div style={{ fontSize: 14, color: "#222" }}>{comment.content}</div>
                </div>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ef4444",
                    marginLeft: 8,
                    cursor: "pointer",
                    padding: 0,
                  }}
                  title="댓글 삭제"
                  onClick={() => onDelete(comment.id)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              style={{
                flex: 1,
                border: "1px solid #e5e7eb",
                borderRadius: 4,
                padding: 7,
                fontSize: 14,
                background: "#fff",
              }}
              placeholder={inputPlaceholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) {
                  onAdd(input)
                  setInput("")
                }
              }}
              maxLength={200}
            />
            <Button
              size="sm"
              style={{ minWidth: 48 }}
              onClick={() => {
                if (input.trim()) {
                  onAdd(input)
                  setInput("")
                }
              }}
              disabled={!input.trim()}
            >
              등록
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
