import { createContext, FC, ReactNode, useContext, useState } from "react";

import { FormPayloadT } from "@/ts/components/main/LoginForm"
import { authUser } from "@api/userAuth/userAuthApi";

interface AuthContextInterface {
  isAuthd: boolean;
  isAuthTriggered: boolean;
  isAuthProcessing: boolean;
  performAuth: (formData: FormPayloadT) => Promise<void>;
}

type AuthProviderTypeProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const AuthProvider: FC<AuthProviderTypeProps> = ({ children }) => {
  const [isAuthd, setIsAuthd] = useState(false);
  const [isAuthTriggered, setIsAuthTriggered] = useState(false);
  const [isAuthProcessing, setIsAuthProcessing] = useState(false);

  const performAuth = async (payloadData: FormPayloadT): Promise<void> => {
    setIsAuthTriggered(true);
    setIsAuthProcessing(true);

    const isAuthd = await authUser(payloadData);
    isAuthd ? setIsAuthd(true) : setIsAuthd(false);

    setIsAuthProcessing(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthd, isAuthProcessing, isAuthTriggered, performAuth }}>
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