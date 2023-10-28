export type AxiosClientType = {
  baseUrl: string;
  timeout: number;
  headers?: Record<string, string | number>;
};

export type FormDataType = {
  email: string;
  password: string;
};

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
