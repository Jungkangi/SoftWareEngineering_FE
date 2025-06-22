import { useEffect, useState } from "react";
import api from "../axios";

export interface ProjectData {
  P_NAME: string;
  P_STATUS: "IN_PROGRESS" | "COMPLETED" | "PLANNING" | string;
  P_CDATE: string;
}

export const useGetMyProjects = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get<ProjectData[]>("/projects/my");
        setProjects(response.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};
