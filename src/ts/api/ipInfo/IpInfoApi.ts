import { AxiosResponse } from "axios";

import AxiosClient from "@utils/AxiosClient";

export type IpDataT = {
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

const apiClient = AxiosClient({
  baseUrl: `${process.env.REACT_APP_IP_INFO_API_URL}`,
  timeout: 5000,
});

export const fetchIpInfoApiData = async (): Promise<IpDataT | null> => {
  try {
    const response: AxiosResponse = await apiClient.get(
      `?token=${process.env.REACT_APP_IP_INFO_API_TOKEN}`
    );
    return response.data;
  } catch (error) {
    console.error("error:", error);
    return null;
  }
};
