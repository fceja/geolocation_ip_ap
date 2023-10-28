import axios from "axios";

import { AxiosClientType } from "@appTypes/index";

const AxiosClient = (clientData: AxiosClientType) => {
  const { baseUrl, timeout, headers } = clientData;

  return axios.create({
    baseURL: baseUrl,
    timeout: timeout,
    headers: headers ? headers : {},
  });
};

export default AxiosClient;
