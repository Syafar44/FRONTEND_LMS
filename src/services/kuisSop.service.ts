import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IKuisSop } from "@/types/Sop";

const kuisSopServices = {
  getKuisSopById: (id: string) => instance.get(`${endpoint.KUIS_SOP}/${id}`),
  addKuisSop: (payload: IKuisSop) =>
    instance.post(endpoint.KUIS_SOP, payload),
  deleteKuisSop: (id: string) => instance.delete(`${endpoint.KUIS_SOP}/${id}`),
  updateKuisSop: (id: string, payload: IKuisSop) =>
    instance.put(`${endpoint.KUIS_SOP}/${id}`, payload),
  getKuisSopBySop: (bySopId: string, params: string) => instance.get(`${endpoint.KUIS_SOP}/${bySopId}/sop?${params}`),
};

export default kuisSopServices;
