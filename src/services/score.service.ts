import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IScore } from "@/types/Score";


const scoreServices = {
  getScoreAll: (params?: string) => instance.get(`${endpoint.SCORE}?${params}`),
  getScoreAllByUser: () => instance.get(`${endpoint.SCORE}-user`),
  getScoreById: (id: string) => instance.get(`${endpoint.SCORE}/${id}`),
  addScore: (payload: IScore) =>
    instance.post(endpoint.SCORE, payload),
  deleteScore: (id: string) => instance.delete(`${endpoint.SCORE}/${id}`),
  updateScore: (id: string, payload: IScore) =>
    instance.put(`${endpoint.SCORE}/${id}`, payload),
  getScoreBySubCompetency: (subCompetency: string) => instance.get(`${endpoint.SCORE}/${subCompetency}/subCompetency`),
  getExportScore: (params?: string) => instance.get(`${endpoint.SCORE}-export?${params}`),
  getScoreFinal: (params?: string) => instance.get(`${endpoint.SCORE}-final?${params}`),
};

export default scoreServices;
