import { createContext, FC, ReactNode, useContext, useState } from "react";

import { PayloadT } from "@components/loginForm/LoginForm"
import { authUser } from "@api/userAuth/userAuthApi";

interface AuthContextInterface {
  isAuthd: boolean;
  isAuthTriggered: boolean;
  isAuthProcessing: boolean;
  validateCreds: (formData: PayloadT) => Promise<void>;
}

type AuthProviderTypeProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const AuthProvider: FC<AuthProviderTypeProps> = ({ children }) => {
  const [isAuthd, setIsAuthd] = useState(false);
  const [isAuthTriggered, setIsAuthTriggered] = useState(false);
  const [isAuthProcessing, setIsAuthProcessing] = useState(false);

  const validateCreds = async (payloadData: PayloadT): Promise<void> => {
    setIsAuthTriggered(true);
    setIsAuthProcessing(true);

    const isAuthd = await authUser(payloadData);
    if (isAuthd) {
      setIsAuthd(true);
    } else {
      setIsAuthd(false);
    }
    setIsAuthProcessing(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthd, isAuthProcessing, isAuthTriggered, validateCreds }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextInterface => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Context is undefined");
  }

  return context;
};
