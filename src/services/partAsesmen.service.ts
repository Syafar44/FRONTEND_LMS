import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IPartAsesmen } from "@/types/Asesmen";

const partAsesmenServices = {
  getPartAsesmen: (params?: string) => instance.get(`${endpoint.PART_ASESMEN}?${params}`),
  getPartAsesmenById: (id: string) => instance.get(`${endpoint.PART_ASESMEN}/${id}`),
  addPartAsesmen: (payload: IPartAsesmen) =>
    instance.post(endpoint.PART_ASESMEN, payload),
  deletePartAsesmen: (id: string) => instance.delete(`${endpoint.PART_ASESMEN}/${id}`),
  updatePartAsesmen: (id: string, payload: IPartAsesmen) =>
    instance.put(`${endpoint.PART_ASESMEN}/${id}`, payload),
  getPartAsesmenBySlug: (slug: string) => instance.get(`${endpoint.PART_ASESMEN}/${slug}/slug`),
};

export default partAsesmenServices;