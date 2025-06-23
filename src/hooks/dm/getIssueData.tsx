import { useEffect, useState } from "react";
import axios from "../axios";

interface IssueDetail {
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

export const useGetIssueData = (issueId: number | null) => {
  const [data, setData] = useState<IssueDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!issueId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/issues/${issueId}`);
        setData(res.data);
      } catch (err) {
        setError("이슈 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [issueId]);

  return { data, loading, error };
};
