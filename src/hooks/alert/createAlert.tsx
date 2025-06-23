import axios from "../axios";

interface CreateAlertPayload {
  A_CATEGORY: "TEAM_INVITE" | string;
  A_CONTENT: string;
  UID: string;
  P_ID: number;
  I_ID: number;
}

export const createAlert = async (payload: CreateAlertPayload) => {
  const response = await axios.post("/alerts/create", payload);
  console.log("createAlert response:", response.data);
  return response.data;
};
