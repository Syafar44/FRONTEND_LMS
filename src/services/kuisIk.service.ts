import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IKuisIk } from "@/types/Ik";

const kuisIkServices = {
  getKuisIkById: (id: string) => instance.get(`${endpoint.KUIS_IK}/${id}`),
  addKuisIk: (payload: IKuisIk) =>
    instance.post(endpoint.KUIS_IK, payload),
  deleteKuisIk: (id: string) => instance.delete(`${endpoint.KUIS_IK}/${id}`),
  updateKuisIk: (id: string, payload: IKuisIk) =>
    instance.put(`${endpoint.KUIS_IK}/${id}`, payload),
  getKuisIkByIk: (byIkId: string, params: string) => instance.get(`${endpoint.KUIS_IK}/${byIkId}/ik?${params}`),
};

export default kuisIkServices;
