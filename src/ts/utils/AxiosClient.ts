import axios from "axios";

type AxiosClientType = {
  baseUrl: string;
  timeout: number;
  headers?: Record<string, string | number>;
};

const AxiosClient = (clientData: AxiosClientType) => {
  const { baseUrl, timeout, headers } = clientData;

  return axios.create({
    baseURL: baseUrl,
    timeout: timeout,
    headers: headers ? headers : {},
  });
};

export default AxiosClient;
