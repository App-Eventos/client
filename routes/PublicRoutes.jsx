import { Navigate } from "react-router-dom";

export const PublicRoutes = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" /> : children;
};

