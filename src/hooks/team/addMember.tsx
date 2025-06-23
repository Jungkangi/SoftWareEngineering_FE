import api from "../axios";

interface AddTeamMemberPayload {
  U_ID: string;
  ROLE: string;
  P_NAME: string;
  CREATE_DATE: string;
}

interface AddTeamMemberResponse {
  T_ID: number;
  U_ID: string;
  P_ID: number;
  ROLE: string;
  CREATE_DATE: string;
}

export const addTeamMember = async (
  payload: AddTeamMemberPayload
): Promise<AddTeamMemberResponse> => {
  const response = await api.post<AddTeamMemberResponse>("/teams/add", payload);
  return response.data;
};
