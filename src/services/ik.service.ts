import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IIk } from "@/types/Ik";


const ikServices = {
  getAllIk: (params?: string) => instance.get(`${endpoint.IK}?${params}`),
  getIkById: (id: string) => instance.get(`${endpoint.IK}/${id}`),
  addIk: (payload: IIk) =>
    instance.post(endpoint.IK, payload),
  deleteIk: (id: string) => instance.delete(`${endpoint.IK}/${id}`),
  updateIk: (id: string, payload: IIk) =>
    instance.put(`${endpoint.IK}/${id}`, payload),
  getIkBySlug: (slug: string) => instance.get(`${endpoint.IK}/${slug}/slug`),
};

export default ikServices;
