import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICompetency } from "@/types/Competency";

const kuisCompetencyServices = {
  getKuisCompetencyById: (id: string) => instance.get(`${endpoint.KUIS_COMPETENCY}/${id}`),
  addKuisCompetency: (payload: ICompetency) =>
    instance.post(endpoint.KUIS_COMPETENCY, payload),
  deleteKuisCompetency: (id: string) => instance.delete(`${endpoint.KUIS_COMPETENCY}/${id}`),
  updateKuisCompetency: (id: string, payload: ICompetency) =>
    instance.put(`${endpoint.KUIS_COMPETENCY}/${id}`, payload),
  getKuisCompetencyBySubCompetency: (byCompetencyId: string) => instance.get(`${endpoint.KUIS_COMPETENCY}/${byCompetencyId}/subCompetencyId`),
};

export default kuisCompetencyServices;
