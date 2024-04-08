"use server";

import axios from "axios";
import { getToken } from "@/lib/cookie_helper";

interface LoginRequestBody {
  login: string;
  password: string;
}

interface LoginOrRegisterResponseBody {
  status: number;
  data: { access: string; refresh: string };
}

interface RegistrationRequestBody {
  username: string;
  email: string;
  fullname: string;
  password: string;
}

const authAxios = axios.create({
  baseURL: process.env.BACKEND_URL,
});

authAxios.interceptors.request.use(
  function (config: any) {
    config.headers.Authorization = `Bearer ${getToken("token")}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

authAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const login = async (
  data: LoginRequestBody
): Promise<LoginOrRegisterResponseBody> => {
  const response = await authAxios.post("auth/token", data);
  return {
    status: response.status,
    data: response.data.result,
  };
};

const registerUser = async (
  data: RegistrationRequestBody
): Promise<LoginOrRegisterResponseBody> => {
  const response = await authAxios.post("users", data);
  return {
    status: response.status,
    data: response.data.result,
  };
};

export { login, registerUser };
