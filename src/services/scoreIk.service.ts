import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IScoreIk } from "@/types/Ik";

const scoreIkServices = {
  getScoreAll: (params?: string) => instance.get(`${endpoint.SCORE_IK}?${params}`),
  getScoreAllByUser: () => instance.get(`${endpoint.SCORE_IK}-user`),
  getScoreById: (id: string) => instance.get(`${endpoint.SCORE_IK}/${id}`),
  addScore: (payload: IScoreIk) =>
    instance.post(endpoint.SCORE_IK, payload),
  deleteScore: (id: string) => instance.delete(`${endpoint.SCORE_IK}/${id}`),
  updateScore: (id: string, payload: IScoreIk) =>
    instance.put(`${endpoint.SCORE_IK}/${id}`, payload),
  getScoreByIk: (Ik: string) => instance.get(`${endpoint.SCORE_IK}/${Ik}/Ik`),
  getExportScore: (params?: string) => instance.get(`${endpoint.SCORE_IK}-export?${params}`),
  getScoreFinal: (params?: string) => instance.get(`${endpoint.SCORE_IK}-final?${params}`),
};

export default scoreIkServices;
