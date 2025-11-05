import React, { createContext, useContext, useEffect, useState } from "react";

type User = { email: string } | null;
type AuthCtx = {
  user: User;
  login: (email: string) => void;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const token = localStorage.getItem("ht_token");
    const u = localStorage.getItem("ht_user");
    setUser(token && u ? JSON.parse(u) : null);
  }, []);

  const login = (email: string) => {
    localStorage.setItem("ht_token", "demo-token");
    localStorage.setItem("ht_user", JSON.stringify({ email }));
    setUser({ email });
  };

  const logout = () => {
    localStorage.removeItem("ht_token");
    localStorage.removeItem("ht_user");
    setUser(null);
  };

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside AuthProvider");
  return v;
}
