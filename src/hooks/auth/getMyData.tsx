import { useEffect, useState } from "react";
import axios from "../axios";

interface MeData {
  user: {
    UID: string;
    NICKNAME: string;
  };
}

const useMe = () => {
  const [me, setMe] = useState<MeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await axios.get("/me");
        setMe(response.data);
        console.log("Fetched user info:", response.data);
      } catch (err) {
        setError("Failed to fetch user info");
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  return { me, loading, error };
};

export default useMe;
