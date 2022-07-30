import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/utils";

export const GuestGuard = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to="/" replace={true} />;
};

export const AuthGuard = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace={true} />;
};
