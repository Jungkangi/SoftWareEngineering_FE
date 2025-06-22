import api from "../axios";

export interface ProjectData {
  P_NAME: string;
  P_STATUS: "IN_PROGRESS" | "COMPLETED" | "PLANNING" | string;
  P_CDATE: string;
  DISCRIPTION: string;
  PRIORITY: "HIGH" | "MEDIUM" | "LOW" | string;
  CATEGORY: string;
}

export const deleteProjectData = async (projectId: number) => {
  try {
    const response = await api.delete(`/projects/${projectId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Failed to delete project");
  }
};
