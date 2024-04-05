import { checkTokenIsExpired } from "@/lib/utils";
import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  async function (config: any) {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (
      token &&
      (await checkTokenIsExpired(<string>(<unknown>token))) === false
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      cookieStore.delete("token");
    }

    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

const callGet = async (url: string) => {
  return await axiosInstance.get(url);
};

const callPost = async (url: string, body: object) => {
  return await axiosInstance.post(url, body);
};

const callPostWithoutBody = async (url: string) => {
  return await axiosInstance.post(url);
};

const callPostByFormData = async (url: string, body: FormData) => {
  return await axiosInstance.post(url, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const callPut = async (url: string, body: object) => {
  return await axiosInstance.put(url, body);
};

const callDelete = async (url: string) => {
  return await axiosInstance.delete(url);
};

export {
  callGet,
  callPost,
  callPostWithoutBody,
  callPostByFormData,
  callPut,
  callDelete,
};
