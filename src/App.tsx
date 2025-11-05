import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import RequireAuth from "./components/RequireAuth";

import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import LogActivity from "./pages/LogActivity";
import LogMeal from "./pages/LogMeal";
import Login from "./pages/Login";
import Register from "./pages/Register";

function StartGate() {
  const token = localStorage.getItem("ht_token");
  return <Navigate to={token ? "/dashboard" : "/login"} replace />;
}

export default function App() {
  return (
    <Router>
   
      <ErrorBoundary>
        <Header />
        <div className="pt-20">
          <Routes>
          
            <Route path="/healthcheck" element={<div className="p-6 text-white">✅ App is rendering</div>} />

           
            <Route path="/" element={<StartGate />} />

          
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

         
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/log-activity" element={<RequireAuth><LogActivity /></RequireAuth>} />
            <Route path="/log-meal" element={<RequireAuth><LogMeal /></RequireAuth>} />

         
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
}
