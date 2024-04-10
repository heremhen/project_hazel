"use server";

import {
  callGet,
  callPost,
  callPostByFormData,
  callPostWithoutBody,
  callPut,
  callDelete,
} from "./baseInstance";

async function getFile(dir: string) {
  const response = await callGet(`/r/cdn/${dir}`);
  return {
    status: response.status,
    data: response.data.result,
  };
}

async function getOwnFiles() {
  const response = await callGet(`/r/my/files`);
  return {
    status: response.status,
    data: response.data.result,
  };
}

async function storeUploadFiles(data: FormData) {
  const response = await callPostByFormData("/r/upload", data);
  return {
    status: response.status,
    data: response.data.result,
  };
}

export { getFile, getOwnFiles, storeUploadFiles };
