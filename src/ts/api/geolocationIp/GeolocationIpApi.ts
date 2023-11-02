import AxiosClient from "@utils/AxiosClient";
import { PayloadType } from "@appTypes/index";

const apiClient = AxiosClient({
  baseUrl: `${process.env.REACT_APP_USER_AUTH_API_URL}`,
  timeout: 5000,
  headers: {
    "X-Api-Key": `${process.env.REACT_APP_USER_AUTH_API_KEY}`,
    "App-Name": `${process.env.REACT_APP_USER_AUTH_APP_NAME_HEADER}`,
  },
});

export const authUser = async (payload: PayloadType): Promise<boolean> => {
  try {
    // todo - need to add agi gateway endpoint, and update lambda
    const response = await apiClient.post("/auth/geolocationIp", {
      email: payload.email,
      password: payload.password,
    });
    return response.headers["app-auth"];
  } catch (error) {
    return false;
  }
};
