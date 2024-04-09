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
  return await callGet(`/r/cdn/${dir}`);
}

async function getOwnFiles() {
  return await callGet(`/r/my/files`);
}

async function storeUploadFiles(data: FormData) {
  return await callPostByFormData("/r/upload", data);
}

export { getFile, getOwnFiles, storeUploadFiles };
