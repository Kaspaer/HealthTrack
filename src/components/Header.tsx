import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <header className="w-full bg-gray-900/80 backdrop-blur-md border-b border-pink-600/20 text-white fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-pink-400 text-xl font-bold tracking-wide">
          HealthTrack
        </Link>

        <nav className="flex items-center gap-6 text-sm text-gray-300">
          <Link
            to="/"
            className={`hover:text-pink-400 transition ${
              location.pathname === "/" ? "text-pink-400" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/log-activity"
            className={`hover:text-pink-400 transition ${
              location.pathname === "/log-activity" ? "text-pink-400" : ""
            }`}
          >
            Log Activity
          </Link>
          <Link
            to="/log-meal"
            className={`hover:text-pink-400 transition ${
              location.pathname === "/log-meal" ? "text-pink-400" : ""
            }`}
          >
            Log Meal
          </Link>
          <Link
            to="/login"
            className={`hover:text-pink-400 transition ${
              location.pathname === "/login" ? "text-pink-400" : ""
            }`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`hover:text-pink-400 transition ${
              location.pathname === "/register" ? "text-pink-400" : ""
            }`}
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
