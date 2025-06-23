import { useEffect, useState } from "react";
import axios from "../axios";

export interface User {
  UID: string;
  NICKNAME: string;
  PASSWORD: string;
  EMAIL: string;
  PHONE: string;
  CREATE_DATE: string;
  ROLE?: "PM" | "MEMBER" | string;
}

const useAllUsers = (): {
  users: User[] | null;
  loading: boolean;
  error: string | null;
} => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users/");
        setUsers(response.data);
      } catch (err: any) {
        setError(err.message || "에러 발생");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

export default useAllUsers;
