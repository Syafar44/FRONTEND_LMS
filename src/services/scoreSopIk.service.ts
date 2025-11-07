import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IScoreSopIk } from "@/types/SopIk";

const scoreSopIkServices = {
  getScoreAll: (params?: string) => instance.get(`${endpoint.SCORE_SOP_IK}?${params}`),
  getScoreAllByUser: () => instance.get(`${endpoint.SCORE_SOP_IK}-user`),
  getScoreById: (id: string) => instance.get(`${endpoint.SCORE_SOP_IK}/${id}`),
  addScore: (payload: IScoreSopIk) =>
    instance.post(endpoint.SCORE_SOP_IK, payload),
  deleteScore: (id: string) => instance.delete(`${endpoint.SCORE_SOP_IK}/${id}`),
  updateScore: (id: string, payload: IScoreSopIk) =>
    instance.put(`${endpoint.SCORE_SOP_IK}/${id}`, payload),
  getScoreBySopIk: (sopIk: string) => instance.get(`${endpoint.SCORE_SOP_IK}/${sopIk}/sopIk`),
  getExportScore: (params?: string) => instance.get(`${endpoint.SCORE_SOP_IK}-export?${params}`),
  getScoreFinal: (params?: string) => instance.get(`${endpoint.SCORE_SOP_IK}-final?${params}`),
};

export default scoreSopIkServices;
