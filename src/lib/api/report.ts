"use server";

import {
  callGet,
  callPost,
  callPostByFormData,
  callPostWithoutBody,
  callPut,
  callDelete,
} from "./baseInstance";

async function getAllReport() {
  const response = await callGet("/report");
  return {
    status: response.status,
    data: response.data.result,
  };
}

export { getAllReport };
