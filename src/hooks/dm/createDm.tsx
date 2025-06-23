import axios from "../axios";

interface CreateDmPayload {
  TITLE: string;
  CONTENT: string;
  I_STATUS?: "NOT_CHECKED";
  PRIORITY?: "LOW";
  I_RELEASE?: "PRIVATE" | "PUBLIC";
  FOR_UID: string;
  START_DATE: string;
  EXPIRE_DATE: string;
}

export const createDm = async (projectId: number, payload: CreateDmPayload) => {
  console.log("Creating DM with payload:", payload);
  const response = await axios.post(`/issues/create/${projectId}`, {
    ...payload,
    I_STATUS: "NOT_CHECKED",
    PRIORITY: "LOW",
  });
  return response.data;
};
