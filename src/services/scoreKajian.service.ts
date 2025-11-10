import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IScoreKajian } from "@/types/Kajian";

const scoreKajianServices = {
  getScoreAll: (params?: string) => instance.get(`${endpoint.SCORE_KAJIAN}?${params}`),
  getScoreAllByUser: () => instance.get(`${endpoint.SCORE_KAJIAN}-user`),
  getScoreById: (id: string) => instance.get(`${endpoint.SCORE_KAJIAN}/${id}`),
  addScore: (payload: IScoreKajian) =>
    instance.post(endpoint.SCORE_KAJIAN, payload),
  deleteScore: (id: string) => instance.delete(`${endpoint.SCORE_KAJIAN}/${id}`),
  updateScore: (id: string, payload: IScoreKajian) =>
    instance.put(`${endpoint.SCORE_KAJIAN}/${id}`, payload),
  getScoreByKajian: (kajian: string) => instance.get(`${endpoint.SCORE_KAJIAN}/${kajian}/kajian`),
  getExportScore: (params?: string) => instance.get(`${endpoint.SCORE_KAJIAN}-export?${params}`),
  getScoreFinal: (params?: string) => instance.get(`${endpoint.SCORE_KAJIAN}-final?${params}`),
};

export default scoreKajianServices;
