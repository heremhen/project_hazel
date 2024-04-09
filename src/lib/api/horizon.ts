"use server";

import {
  callGet,
  callPost,
  callPostByFormData,
  callPostWithoutBody,
  callPut,
  callDelete,
} from "./baseInstance";

async function getAllHorizon() {
  const response = await callGet("/horizon");
  return {
    status: response.status,
    data: response.data.result,
  };
}

async function createHorizon(data: object) {
  const resp = await callPost("/horizon", data);
  return {
    status: resp.status,
    data: resp.data.result,
  };
}

export { getAllHorizon, createHorizon };
