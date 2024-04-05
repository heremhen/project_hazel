import {
  callGet,
  callPost,
  callPostByFormData,
  callPostWithoutBody,
  callPut,
  callDelete,
} from "./baseInstance";

async function getAllModels() {
  return await callGet("/models");
}

async function getModel(id: string) {
  return await callGet(`/models/${id}`);
}

async function createAutoMLModel(data: object) {
  return await callPost("/models", data);
}

export { getAllModels, getModel, createAutoMLModel };
