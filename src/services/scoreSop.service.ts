import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IScoreSop } from "@/types/Sop";

const scoreSopServices = {
  getScoreAll: (params?: string) => instance.get(`${endpoint.SCORE_SOP}?${params}`),
  getScoreAllByUser: () => instance.get(`${endpoint.SCORE_SOP}-user`),
  getScoreById: (id: string) => instance.get(`${endpoint.SCORE_SOP}/${id}`),
  addScore: (payload: IScoreSop) =>
    instance.post(endpoint.SCORE_SOP, payload),
  deleteScore: (id: string) => instance.delete(`${endpoint.SCORE_SOP}/${id}`),
  updateScore: (id: string, payload: IScoreSop) =>
    instance.put(`${endpoint.SCORE_SOP}/${id}`, payload),
  getScoreBySop: (sop: string) => instance.get(`${endpoint.SCORE_SOP}/${sop}/sop`),
  getExportScore: (params?: string) => instance.get(`${endpoint.SCORE_SOP}-export?${params}`),
  getScoreFinal: (params?: string) => instance.get(`${endpoint.SCORE_SOP}-final?${params}`),
};

export default scoreSopServices;
