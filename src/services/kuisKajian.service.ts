import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IKuisKajian } from "@/types/Kajian";

const kuisKajianServices = {
  getKuisKajianById: (id: string) => instance.get(`${endpoint.KUIS_KAJIAN}/${id}`),
  addKuisKajian: (payload: IKuisKajian) =>
    instance.post(endpoint.KUIS_KAJIAN, payload),
  deleteKuisKajian: (id: string) => instance.delete(`${endpoint.KUIS_KAJIAN}/${id}`),
  updateKuisKajian: (id: string, payload: IKuisKajian) =>
    instance.put(`${endpoint.KUIS_KAJIAN}/${id}`, payload),
  getKuisKajianByKajian: (byKajianId: string, params: string) => instance.get(`${endpoint.KUIS_KAJIAN}/${byKajianId}/kajian?${params}`),
};

export default kuisKajianServices;
