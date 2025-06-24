import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICompetency } from "@/types/Competency";

const competencyServices = {
  getAllCompetency: () => instance.get(`${endpoint.COMPETENCY}`),
  getCompetencyById: (id: string) => instance.get(`${endpoint.COMPETENCY}/${id}`),
  addCompetency: (payload: ICompetency) =>
    instance.post(endpoint.COMPETENCY, payload),
  deleteCompetency: (id: string) => instance.delete(`${endpoint.COMPETENCY}/${id}`),
  updateCompetency: (id: string, payload: ICompetency) =>
    instance.put(`${endpoint.COMPETENCY}/${id}`, payload),
  getCompetencyByMainCompetency: (main_competency: string, params: string) => instance.get(`${endpoint.COMPETENCY}/${main_competency}/main_competency?${params}`),
  getCompetencyBySlug: (slug: string, params?: string) => instance.get(`${endpoint.COMPETENCY}/${slug}/slug?${params}`),
};

export default competencyServices;
