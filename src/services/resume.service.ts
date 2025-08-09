import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IResume } from "@/types/Resume";

const resumeServices = {
  getResumeAll: (params?: string) => instance.get(`${endpoint.RESUME}?${params}`),
  getResumeAllByUser: () => instance.get(`${endpoint.RESUME}-user`),
  getResumeById: (id: string) => instance.get(`${endpoint.RESUME}/${id}`),
  addResume: (payload: IResume) =>
    instance.post(endpoint.RESUME, payload),
  deleteResume: (id: string) => instance.delete(`${endpoint.RESUME}/${id}`),
  updateResume: (id: string, payload: IResume) =>
    instance.put(`${endpoint.RESUME}/${id}`, payload),
  getResumeByKajian: (kajian: string) => instance.get(`${endpoint.RESUME}/${kajian}/kajian`),
  exportResume: (params?: string) => instance.get(`${endpoint.RESUME}-export?${params}`),
};

export default resumeServices;
