import axios from "../axios";

const BASE_URL = "http://13.209.205.163:8000";

// 댓글 목록 조회 (SPRINT/이슈ID)
export async function fetchSprintComments(issueId: number) {
  const res = await axios.get(`${BASE_URL}/comments/SPRINT/${issueId}`);
  return res.data;
}

// 댓글 추가 (SPRINT/이슈ID)
export async function addSprintComment(issueId: number, content: string) {
  const res = await axios.post(`${BASE_URL}/comments/SPRINT/${issueId}`, {
    CONTENT: content,
  });
  return res.data;
}

// 댓글 삭제 (댓글ID)
export async function deleteSprintComment(commentId: number) {
  const res = await axios.delete(`${BASE_URL}/comments/${commentId}`);
  return res.data;
}