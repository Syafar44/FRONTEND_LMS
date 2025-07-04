import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ILkp } from "@/types/Lkp";

const LkpServices = {
  getLkpByUser: () => instance.get(`${endpoint.LKP}-user`),
  getRekap: (params: string) => instance.get(`${endpoint.LKP}/rekap?${params}`),
  addLkp: (payload: ILkp) =>
    instance.post(`${endpoint.LKP}/mark`, payload),
};

export default LkpServices;
