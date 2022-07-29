import { createContext, useContext, useState } from "react";

const RegistrationFormContext = createContext({
  formData: {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
  },
  setFormData: () => null,
});

export const useRegistrationContext = () => useContext(RegistrationFormContext);
export const RegistrationFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
  });

  return (
    <RegistrationFormContext.Provider
      value={{
        formData,
        setFormData,
      }}>
      {children}
    </RegistrationFormContext.Provider>
  );
};
