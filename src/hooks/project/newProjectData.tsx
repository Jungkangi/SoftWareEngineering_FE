import api from "../axios";

interface CreateProjectPayload {
  P_NAME: string;
  P_STATUS: string;
}

interface CreateProjectResponse {
  P_NAME: string;
  P_STATUS: string;
  P_CDATE: string;
}

export const createProjectAsPM = async (
  payload: CreateProjectPayload
): Promise<CreateProjectResponse> => {
  const response = await api.post<CreateProjectResponse>("/projects/", payload);
  return response.data;
};
