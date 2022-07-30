import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/utils";

export const GuestGuard = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to={"/"} />;
};

export const AuthGuard = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};
