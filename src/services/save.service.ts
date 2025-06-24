import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ISave } from "@/types/Save";


const saveServices = {
  getSaveAll: () => instance.get(`${endpoint.SAVE}`),
  getSaveById: (id: string) => instance.get(`${endpoint.SAVE}/${id}`),
  addSave: (payload: ISave) =>
    instance.post(endpoint.SAVE, payload),
  deleteSave: (id: string) => instance.delete(`${endpoint.SAVE}/${id}`),
  updateSave: (id: string, payload: ISave) =>
    instance.put(`${endpoint.SAVE}/${id}`, payload),
  getSaveByCompetency: (subcompetency: string) => instance.get(`${endpoint.SAVE}/${subcompetency}/subcompetency`),
  getSaveByUser: () => instance.get(`${endpoint.SAVE}-user`),
};

export default saveServices;
