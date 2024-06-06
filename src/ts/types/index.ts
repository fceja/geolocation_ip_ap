import { ReactNode } from "react";

export type AxiosClientType = {
  baseUrl: string;
  timeout: number;
  headers?: Record<string, string | number>;
};

export type FormDataType = {
  email: string;
  password: string;
};
export type PayloadType = FormDataType;

export type IpDataType = {
  ip: string;
  hostname: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
};

export type LocationType = {
  latitude: number;
  longitude: number;
};

// types
export type AuthProviderTypeProps = {
  children: ReactNode;
};

//interfaces
export interface AuthContextInterface {
  isAuthd: boolean;
  isAuthProcessing: boolean;
  isAuthTriggered: boolean;
  validateCreds: (formData: FormDataType) => Promise<void>;
}
