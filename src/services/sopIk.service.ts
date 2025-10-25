import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ISopIk } from "@/types/SopIk";

const sopIkServices = {
  getAllSopIk: (params?: string) => instance.get(`${endpoint.SOP_IK}?${params}`),
  getSopIkById: (id: string) => instance.get(`${endpoint.SOP_IK}/${id}`),
  addSopIk: (payload: ISopIk) =>
    instance.post(endpoint.SOP_IK, payload),
  deleteSopIk: (id: string) => instance.delete(`${endpoint.SOP_IK}/${id}`),
  updateSopIk: (id: string, payload: ISopIk) =>
    instance.put(`${endpoint.SOP_IK}/${id}`, payload),
  getSopIkBySlug: (slug: string) => instance.get(`${endpoint.SOP_IK}/${slug}/slug`),
};

export default sopIkServices;
