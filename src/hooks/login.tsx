import { useState } from "react";
import api from "../lib/axios";

interface LoginResponse {
  access_token: string;
  token_type: string;
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    UID: string,
    PASSWORD: string
  ): Promise<LoginResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<LoginResponse>(
        "/login",
        {
          UID,
          PASSWORD,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
