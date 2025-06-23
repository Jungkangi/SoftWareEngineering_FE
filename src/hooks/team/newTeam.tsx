import api from "../axios";

interface CreateProjectPayload {
  ROLE: string | "PM";
  P_NAME: string;
  CREATE_DATE: string;
}

interface CreateProjectResponse {
  T_ID: number;
  U_ID: string;
  P_ID: number;
  ROLE: string;
  CREATE_DATE: string;
}

export const createProjectAsPM = async (
  payload: CreateProjectPayload
): Promise<CreateProjectResponse> => {
  const response = await api.post<CreateProjectResponse>(
    "/teams/create",
    payload
  );
  return response.data;
};
