import { AppConfig } from "@/settings";
import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { getAccessToken } from "./auth";

type TFunction = () => void;
type TUnionFunction = (e: any) => void;

type ErrorFunctionType = (error: { code: string; message: string }) => void;
type SuccessFunctionType = TFunction | TUnionFunction;

export const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export function get(
  endpoint: string,
  successCallback: SuccessFunctionType,
  errorCallback: ErrorFunctionType
) {
  myFetch("GET", endpoint, undefined, successCallback, errorCallback);
}

export function post(
  endpoint: string,
  body: any,
  successCallback: SuccessFunctionType,
  errorCallback: ErrorFunctionType
) {
  myFetch("POST", endpoint, body, successCallback, errorCallback);
}

export function put(
  endpoint: string,
  body: any,
  successCallback: SuccessFunctionType,
  errorCallback: ErrorFunctionType
) {
  myFetch("PUT", endpoint, body, successCallback, errorCallback);
}

export function _delete(
  endpoint: string,
  body: any,
  successCallback: SuccessFunctionType,
  errorCallback: ErrorFunctionType
) {
  myFetch("DELETE", endpoint, body, successCallback, errorCallback);
}

export async function postWithFormData(
  endpoint: string,
  body: any,
  successCallback: SuccessFunctionType,
  errorCallback: ErrorFunctionType
) {
  let url = AppConfig.API + endpoint;
  const accessToken = await getAccessToken();

  let headers = {
    Authorization: "bearer " + accessToken,
    "Content-Type": "multipart/form-data",
    accept: "application/json",
  };

  const config = { headers };

  let response = null;

  try {
    response = await axios.post(url, body, config);
    _handleSuccess(response, successCallback);
  } catch (error) {
    _handleError(error, errorCallback);
  }
}

export const alertError = (error: any) => {
  alert(error.code + (error.msg ? ": " + error.msg : ""));
};

async function myFetch(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  body: any,
  successCallback: SuccessFunctionType,
  errorCallback: ErrorFunctionType
) {
  let url = AppConfig.API + endpoint;
  const accessToken = await getAccessToken();

  body = JSON.stringify(body);

  let headers: RawAxiosRequestHeaders = defaultHeaders;
  headers["Authorization"] = "bearer " + accessToken;
  headers["Accept-Language"] = "en-US,en;q=0.5";

  const config: AxiosRequestConfig = { headers };

  let response = null;

  try {
    switch (method) {
      case "POST":
        response = await axios.post(url, body, config);
        break;
      case "PUT":
        response = await axios.put(url, body, config);
        break;
      case "DELETE":
        response = await axios.delete(url, config);
        break;
      default:
        response = await axios.get(url, config);
        break;
    }
    _handleSuccess(response, successCallback);
  } catch (error) {
    _handleError(error, errorCallback);
  }
}

const _handleSuccess = (
  response: any,
  successCallback: (data: any) => void
) => {
  const { data } = response;
  successCallback(data);
};

const _handleError = (error: any, errorCallback: ErrorFunctionType) => {
  try {
    const { response } = error;
    const { errors } = response.data;
    errorCallback(errors[0]);
  } catch (error) {
    errorCallback({ code: "ERR_NETWORK", message: "Network error" });
  }
  // const { code, message, response } = error;
  // if (code === "ERR_BAD_REQUEST" || code === "ERR_BAD_RESPONSE") {
  //   errorCallback(response.data);
  // } else if (code === "ERR_NETWORK") {
  //   errorCallback("");
  //   // logout();
  // } else {
  //   errorCallback("");
  //   console.log("Error", error);
  //   // toast.error(() => `${message} [${code}]`);
  // }
};
