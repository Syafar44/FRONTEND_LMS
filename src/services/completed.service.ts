import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const completedServices = {
  addCompleted: (competency: string) => instance.post(endpoint.COMPLETED, { competency }),
  deleteCompleted: (id: string) => instance.delete(`${endpoint.COMPLETED}/${id}`),
  getCompletedByUser: () => instance.get(`${endpoint.COMPLETED}-user`),
};

export default completedServices;
