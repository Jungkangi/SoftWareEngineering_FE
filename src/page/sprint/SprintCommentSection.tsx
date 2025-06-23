import React, { useEffect, useState } from "react";
import { CommentBox, CommentType } from "../../components/ui";
import {
  fetchSprintComments,
  addSprintComment,
  deleteSprintComment,
} from "../../hooks/sprint/useComment";

interface SprintCommentSectionProps {
  issueId: number;
}

const SprintCommentSection: React.FC<SprintCommentSectionProps> = ({ issueId }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);

  // 댓글 목록 불러오기
  const loadComments = async () => {
    setLoading(true);
    try {
      const data = await fetchSprintComments(issueId);

      setComments(
        Array.isArray(data)
          ? data.map((c: any) => ({
              id: c.C_ID,
              author: c.UID || "익명",
              content: c.CONTENT,
              createdAt: c.CREATE_DATE,
            }))
          : []
      );
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (issueId) loadComments();
    // eslint-disable-next-line
  }, [issueId]);

  const handleAddComment = (content: string): void => {
    if (!content.trim()) return;
    addSprintComment(issueId, content).then(loadComments);
  };

  const handleDeleteComment = (commentId: number): void => {
    deleteSprintComment(commentId).then(loadComments);
  };

  return (
    <>
      <h3>댓글</h3>
      <div className="comment-box-wrapper">
        <CommentBox
          comments={comments}
          onAdd={handleAddComment}
          onDelete={handleDeleteComment}
          inputPlaceholder="이 이슈에 댓글을 남겨보세요!"
          style={{
            flex: 1,
            minHeight: 0,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        />
        {/* 로딩 표시가 필요하다면 별도 구현 */}
        {loading && (
          <div style={{ textAlign: "center", color: "#888", fontSize: 13, marginTop: 8 }}>
            댓글 불러오는 중...
          </div>
        )}
      </div>
    </>
  );
};

export default SprintCommentSection;
