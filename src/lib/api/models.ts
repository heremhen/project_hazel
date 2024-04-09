"use server";

import { callGet, callPost } from "./baseInstance";

interface IResponse {
  status: number;
  data: any;
}

async function getAllModels(): Promise<IResponse> {
  const resp = await callGet("/models");
  return {
    status: resp.status,
    data: resp.data.result,
  };
}

async function getModel(id: string): Promise<IResponse> {
  const resp = await callGet(`/models/${id}`);
  return {
    status: resp.status,
    data: resp.data.result,
  };
}

async function createAutoMLModel(data: object): Promise<IResponse> {
  const resp = await callPost("/models", data);
  return {
    status: resp.status,
    data: resp.data.result,
  };
}

export { getAllModels, getModel, createAutoMLModel };
