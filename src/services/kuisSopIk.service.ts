import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IKuisSopIk } from "@/types/SopIk";

const kuisSopIkServices = {
  getKuisSopIkById: (id: string) => instance.get(`${endpoint.KUIS_SOP_IK}/${id}`),
  addKuisSopIk: (payload: IKuisSopIk) =>
    instance.post(endpoint.KUIS_SOP_IK, payload),
  deleteKuisSopIk: (id: string) => instance.delete(`${endpoint.KUIS_SOP_IK}/${id}`),
  updateKuisSopIk: (id: string, payload: IKuisSopIk) =>
    instance.put(`${endpoint.KUIS_SOP_IK}/${id}`, payload),
  getKuisSopIkBySopIk: (bySopIkId: string, params: string) => instance.get(`${endpoint.KUIS_SOP_IK}/${bySopIkId}/sopIkId?${params}`),
};

export default kuisSopIkServices;
