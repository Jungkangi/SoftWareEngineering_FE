import { useEffect, useState } from "react";
import axios from "../axios";

interface Alert {
  A_ID: number;
  A_CATEGORY: string;
  A_CONTENT: string;
  A_READ: boolean;
  UID: string;
  P_ID: number;
  T_ID: number;
}

export const useGetAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get("/alerts/view");
        setAlerts(response.data);
        console.log("getAlerts response:", response.data);
      } catch (err) {
        setError("알림을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  return { alerts, loading, error };
};
