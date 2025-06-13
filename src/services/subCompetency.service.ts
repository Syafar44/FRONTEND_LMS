import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICompetency } from "@/types/Competency";

const subCompetencyServices = {
  getSubCompetencyById: (id: string) => instance.get(`${endpoint.SUB_COMPETENCY}/${id}`),
  addSubCompetency: (payload: ICompetency) =>
    instance.post(endpoint.SUB_COMPETENCY, payload),
  deleteSubCompetency: (id: string) => instance.delete(`${endpoint.SUB_COMPETENCY}/${id}`),
  updateSubCompetency: (id: string, payload: ICompetency) =>
    instance.put(`${endpoint.SUB_COMPETENCY}/${id}`, payload),
  getSubCompetencyByCompetency: (byCompetencyId: string, params: string) => instance.get(`${endpoint.SUB_COMPETENCY}/${byCompetencyId}/competencyId?${params}`),
  getSubCompetencyBySlug: (slug: string) => instance.get(`${endpoint.SUB_COMPETENCY}/${slug}/slug`),
};

export default subCompetencyServices;
