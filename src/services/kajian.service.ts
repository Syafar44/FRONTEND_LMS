import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICompetency } from "@/types/Competency";

const kajianServices = {
  getKajian: (params?: string) => instance.get(`${endpoint.KAJIAN}?${params}`),
  getKajianById: (id: string) => instance.get(`${endpoint.KAJIAN}/${id}`),
  addKajian: (payload: ICompetency) =>
    instance.post(endpoint.KAJIAN, payload),
  deleteKajian: (id: string) => instance.delete(`${endpoint.KAJIAN}/${id}`),
  updateKajian: (id: string, payload: ICompetency) =>
    instance.put(`${endpoint.KAJIAN}/${id}`, payload),
  getKajianBySlug: (slug: string) => instance.get(`${endpoint.KAJIAN}/${slug}/slug`),
};

export default kajianServices;