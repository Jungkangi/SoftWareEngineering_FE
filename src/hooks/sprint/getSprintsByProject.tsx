import api from "../axios";

interface Sprint {
  TITLE: string;
  CONTENTS: string;
  P_ID: number;
  STAT: string;
  S_ID: number;
  CREATE_DATE: string;
}

export const getSprintsByProject = async (
  projectId: number
): Promise<Sprint[]> => {
  const response = await api.get<Sprint[]>(`/sprints/project/${projectId}`);
  return response.data;
};
