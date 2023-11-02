import { createContext, useContext, useState, FC } from "react";

import {
  AuthContextInterface,
  AuthProviderTypeProps,
  PayloadType,
} from "@appTypes/index";
import { authUser } from "@api/geolocationIp/GeolocationIpApi";

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const AuthProvider: FC<AuthProviderTypeProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const validateCreds = async (payloadData: PayloadType): Promise<void> => {
    setIsSubmitted(true);
    setIsLoggingIn(true);

    const isAuthd = await authUser(payloadData);
    if (isAuthd) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoggingIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoggingIn, isSubmitted, validateCreds }}
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
