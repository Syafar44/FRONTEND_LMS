import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IAsesmen } from "@/types/Asesmen";

const asesmenServices = {
  getAsesmen: (params?: string) => instance.get(`${endpoint.ASESMEN}?${params}`),
  getAsesmenById: (id: string) => instance.get(`${endpoint.ASESMEN}/${id}`),
  addAsesmen: (payload: IAsesmen) =>
    instance.post(endpoint.ASESMEN, payload),
  deleteAsesmen: (id: string) => instance.delete(`${endpoint.ASESMEN}/${id}`),
  updateAsesmen: (id: string, payload: IAsesmen) =>
    instance.put(`${endpoint.ASESMEN}/${id}`, payload),
  getAsesmenBySlug: (slug: string) => instance.get(`${endpoint.ASESMEN}/${slug}/slug`),
};

export default asesmenServices;