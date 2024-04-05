import {
  callGet,
  callPost,
  callPostByFormData,
  callPostWithoutBody,
  callPut,
  callDelete,
} from "./baseInstance";

async function getAllHorizon() {
  return await callGet("/horizon");
}

async function createHorizon(data: object) {
  return await callPost("/horizon", data);
}

export { getAllHorizon, createHorizon };
