import { AxiosResponse, AxiosError } from "axios";

import AxiosClient from "@utils/AxiosClient";

const apiClient = AxiosClient({
  baseUrl: `${process.env.REACT_APP_PROFILE_API_URL}`,
  timeout: 5000,
  headers: {
    "x-api-key": `${process.env.REACT_APP_PROFILE_API_KEY}`,
  },
});

export const executeSendEmail = (contactEmailMessage: string) => {
  apiClient
    .post("/sendEmail", {
      contactName: process.env.REACT_APP_CONTACT_NAME,
      contactEmail: process.env.REACT_APP_CONTACT_EMAIL,
      contactEmailMessage: `${contactEmailMessage}`,
    })
    .then((response: AxiosResponse) => {
      console.log("/sendEmail response:", response.data);
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.error("error:", error);
      return null;
    });
};
