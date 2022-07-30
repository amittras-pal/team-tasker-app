import React, { createContext, useContext } from "react";
import { useUserDetails } from "../../../hooks/services/user.services";

const AuthContext = createContext({
  currentUser: {},
  isLoading: false,
  isError: false,
});

export const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const { isLoading, isError, data } = useUserDetails();

  return (
    <AuthContext.Provider
      value={{ currentUser: data?.data?.response ?? {}, isLoading, isError }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
