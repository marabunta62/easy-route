import axios, { AxiosResponse, AxiosError } from "axios";
import { configEnv } from "@/config/config";

const instance = axios.create({
  withCredentials: false,
  baseURL: configEnv.API_EASY_ROUTE,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(undefined, (error: AxiosError) => {
  let errorMessage = "Unknow error";

  if (!error?.message) {
    errorMessage;
  } else {
    errorMessage = error?.response?.data.message || errorMessage;
  }
  throw new Error(errorMessage);
});

export { instance as axios };
export { AxiosResponse };
