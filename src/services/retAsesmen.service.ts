import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IRetAsesmen } from "@/types/Asesmen";

const retAsesmenServices = {
  getRetAsesmen: (params?: string) => instance.get(`${endpoint.RET_ASESMEN}?${params}`),
  getRetAsesmenById: (id: string) => instance.get(`${endpoint.RET_ASESMEN}/${id}`),
  addRetAsesmen: (payload: IRetAsesmen) =>
    instance.post(endpoint.RET_ASESMEN, payload),
  deleteRetAsesmen: (id: string) => instance.delete(`${endpoint.RET_ASESMEN}/${id}`),
  updateRetAsesmen: (id: string, payload: IRetAsesmen) =>
    instance.put(`${endpoint.RET_ASESMEN}/${id}`, payload),
  getRetAsesmenByUserId: (createdBy: string) => instance.get(`${endpoint.RET_ASESMEN}/${createdBy}/createdBy`),
};

export default retAsesmenServices;