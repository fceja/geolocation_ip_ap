import { AxiosResponse } from "axios";

import AxiosClient from "@utils/AxiosClient";
import { IpDataType } from "@appTypes/index";

const apiClient = AxiosClient({
  baseUrl: `${process.env.REACT_APP_IP_INFO_API_URL}`,
  timeout: 5000,
});

export const fetchIpInfoApiData = async (): Promise<IpDataType | null> => {
  try {
    const response: AxiosResponse = await apiClient.get(
      `?token=${process.env.REACT_APP_IP_INFO_API_TOKEN}`
    );
    console.log("ipInfo api response:", response.data);
    return response.data;
  } catch (error) {
    console.error("error:", error);
    return null;
  }
};
