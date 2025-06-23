import api from "../axios";

interface Sprint {
  TITLE: string;
  CONTENTS: string;
  P_ID: number;
  STAT: string;
  ASSIGNEES: { UID: string; NICKNAME: string }[];
  S_ID: number;
  CREATE_DATE: string;
}

export const getSprintsByProject = async (
  projectId: number
): Promise<Sprint[]> => {
  const response = await api.get<Sprint[]>(`/sprints/project/${projectId}`);
  console.log("getSprintsByProject response:", response.data);
  return response.data;
};
