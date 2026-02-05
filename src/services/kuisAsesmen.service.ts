import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IKuisAsesmen } from "@/types/Asesmen";

const kuisAsesmenServices = {
  getKuisAsesmen: (params?: string) => instance.get(`${endpoint.KUIS_ASESMEN}?${params}`),
  getKuisAsesmenById: (id: string) => instance.get(`${endpoint.KUIS_ASESMEN}/${id}`),
  addKuisAsesmen: (payload: IKuisAsesmen) =>
    instance.post(endpoint.KUIS_ASESMEN, payload),
  deleteKuisAsesmen: (id: string) => instance.delete(`${endpoint.KUIS_ASESMEN}/${id}`),
  updateKuisAsesmen: (id: string, payload: IKuisAsesmen) =>
    instance.put(`${endpoint.KUIS_ASESMEN}/${id}`, payload),
  getKuisAsesmenByAsesmen: (byAsesmen: string, params: string) => instance.get(`${endpoint.KUIS_ASESMEN}/${byAsesmen}/asesmen?${params}`),

};

export default kuisAsesmenServices;