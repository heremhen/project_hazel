"use server";

import { callGet, callPost } from "./baseInstance";

interface IResponse {
  status: number;
  data: any;
}

async function prediction(
  horizon_id: number,
  model_id: number,
  pred_type: string,
  data: object
): Promise<IResponse> {
  const resp = await callPost(
    `predict?horizon_id=${horizon_id}&pipeline_id=${model_id}&data_type=${pred_type}`,
    data
  );
  return {
    status: resp.status,
    data: resp.data.result,
  };
}

async function getAllPrediction(model_id: string): Promise<IResponse> {
  const resp = await callGet(`predict?models_id=${model_id}&limit=20`);
  return {
    status: resp.status,
    data: resp.data.result,
  };
}

export { prediction, getAllPrediction };
