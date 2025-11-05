import React from "react";
import { Navigate } from "react-router-dom";

export default function AuthGate({ children }: { children: React.ReactElement }) {

  const token = window.localStorage.getItem("ht_token");

 
  if (!token) {
    console.log("🔒 No token found, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
