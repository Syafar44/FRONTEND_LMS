import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ISop } from "@/types/Sop";

const sopServices = {
  getAllSop: (params?: string) => instance.get(`${endpoint.SOP}?${params}`),
  getSopById: (id: string) => instance.get(`${endpoint.SOP}/${id}`),
  addSop: (payload: ISop) =>
    instance.post(endpoint.SOP, payload),
  deleteSop: (id: string) => instance.delete(`${endpoint.SOP}/${id}`),
  updateSop: (id: string, payload: ISop) =>
    instance.put(`${endpoint.SOP}/${id}`, payload),
  getSopBySlug: (slug: string) => instance.get(`${endpoint.SOP}/${slug}/slug`),
};

export default sopServices;
