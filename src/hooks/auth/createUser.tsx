import { useState } from "react";
import api from "../axios";

interface CreateUserResponse {
  UID: string;
  NICKNAME: string;
  PASSWORD: string;
  EMAIL: string;
  PHONE: string;
  CREATE_DATE: string;
}

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (
    UID: string,
    NICKNAME: string,
    PASSWORD: string,
    EMAIL: string,
    PHONE: string
  ): Promise<CreateUserResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<CreateUserResponse>(
        "/users",
        {
          UID,
          NICKNAME,
          PASSWORD,
          EMAIL,
          PHONE,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.detail || "Signup failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
};
