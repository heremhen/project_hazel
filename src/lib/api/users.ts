"use server";

import {
  callGet,
  callPost,
  callPostByFormData,
  callPostWithoutBody,
  callPut,
  callDelete,
} from "./baseInstance";

async function getUser() {
  return await callGet("/users");
}

export { getUser };
