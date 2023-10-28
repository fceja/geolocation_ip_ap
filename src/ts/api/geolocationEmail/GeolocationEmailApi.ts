import AxiosClient from "@utils/AxiosClient";
import { AxiosResponse } from "axios";

import { FormDataType } from "@appTypes/index";

const apiClient = AxiosClient({
  baseUrl: `${process.env.REACT_APP_GEOLOCATION_EMAIL_API_URL}`,
  timeout: 5000,
  headers: {
    "x-api-key": `${process.env.REACT_APP_GEOLOCATION_EMAIL_API_KEY}`,
  },
});

export const authUser = async (formData: FormDataType): Promise<boolean> => {
  try {
    const response: AxiosResponse = await apiClient.post("/loginUser", {
      email: formData.email,
      password: formData.password,
    });

    if (response.data["message"] === "Login successful") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
