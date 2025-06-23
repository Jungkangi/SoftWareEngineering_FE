import { useEffect, useState } from "react";
import api from "../axios";

export interface TeamData {
  T_ID: number;
  U_ID: string;
  P_ID: number;
  ROLE: "PM" | "MEMBER" | string;
  CREATE_DATE: string;
}

const useGetTeams = (refreshTrigger: number = 0) => {
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const res = await api.get<TeamData[]>("/teams/");
        setTeams(res.data);
        console.log("Fetched teams:", res.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to fetch teams");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [refreshTrigger]);

  return { teams, loading, error };
};

export default useGetTeams;
