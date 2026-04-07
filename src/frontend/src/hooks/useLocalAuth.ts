import { useState } from "react";

const CREDENTIALS = [
  { username: "admin", password: "504560@AUC", role: "admin" as const },
];

const STORAGE_KEY = "mda_local_user";

type LocalUser = { username: string; role: "admin" | "staff" | "client" };

export function useLocalAuth() {
  const [localUser, setLocalUser] = useState<LocalUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as LocalUser) : null;
    } catch {
      return null;
    }
  });

  const localLogin = (username: string, password: string): boolean => {
    const match = CREDENTIALS.find(
      (c) => c.username === username && c.password === password,
    );
    if (match) {
      const user: LocalUser = { username: match.username, role: match.role };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      setLocalUser(user);
      return true;
    }
    return false;
  };

  const localLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setLocalUser(null);
  };

  return { localUser, localLogin, localLogout };
}
