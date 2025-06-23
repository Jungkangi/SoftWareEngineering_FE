import { useEffect, useState } from "react";
import axios from "../axios";

interface DmIssue {
  TITLE: string;
  CONTENT: string;
  I_STATUS: string;
  PRIORITY: string;
  I_RELEASE: string;
  FOR_UID: string;
  START_DATE: string;
  EXPIRE_DATE: string;
  CREATE_DATE: string;
}

export const useGetDmIssues = (projectId: string) => {
  const [data, setData] = useState<DmIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`/issues/view/${projectId}`);
        setData(response.data);
        console.log("useGetDmIssues response:", response.data);
      } catch (err) {
        setError("이슈 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  return { data, loading, error };
};
