import axios from "../axios";

// API expects: TITLE, CONTENTS, P_ID, STAT, ASSIGNEES
interface CreateSprintPayload {
  TITLE: string;
  CONTENTS: string;
  P_ID: number;
  STAT: string;
  ASSIGNEES: string[]; // list of NICKNAMEs or UIDs, as passed in sprint.tsx
}

export const createSprint = async (payload: CreateSprintPayload) => {
  try {
    const response = await axios.post("/sprints/create", payload);
    return response.data;
  } catch (error) {
    console.error("스프린트 생성 실패:", error);
    throw error;
  }
};
