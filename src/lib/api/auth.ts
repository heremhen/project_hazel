import axios from "axios";
import { getToken } from "@/lib/cookie_helper";

interface LoginRequestBody {
  email: string;
  password: string;
}

interface LoginOrRegisterResponseBody {
  data: { type: string; token: string };
}

interface RegistrationRequestBody {
  username: string;
  email: string;
  password: string;
}

const authAxios = axios.create({
  baseURL: process.env.BACKEND_URL,
});

authAxios.interceptors.request.use(
  function (config: any) {
    config.headers.Authorization = `Bearer ${getToken("access-token")}`;

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
  return await authAxios.post("auth/token", data);
};

const registerUser = async (
  data: RegistrationRequestBody
): Promise<LoginOrRegisterResponseBody> => {
  return await authAxios.post("users", data);
};

export { login, registerUser };
