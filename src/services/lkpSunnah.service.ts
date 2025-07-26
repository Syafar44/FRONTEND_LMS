import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ILkp } from "@/types/Lkp";

const LkpSunnahServices = {
  getLkpByUser: () => instance.get(`${endpoint.SUNNAH}-user`),
  getRekap: (params: string) => instance.get(`${endpoint.SUNNAH}-rekap?${params}`),
  addLkp: (payload: ILkp) =>
    instance.post(`${endpoint.SUNNAH}/mark`, payload),
};

export default LkpSunnahServices;
