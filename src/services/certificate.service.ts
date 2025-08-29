import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICertificate } from "@/types/Certificate";


const certificateServices = {
  getCertificateById: (id: string) => instance.get(`${endpoint.CERTIFICATE}/${id}`),
  addCertificate: (payload: ICertificate) =>
    instance.post(endpoint.CERTIFICATE, payload),
  deleteCertificate: (id: string) => instance.delete(`${endpoint.CERTIFICATE}/${id}`),
  getCertificateByUser: (params?: string) => instance.get(`${endpoint.CERTIFICATE}-user?${params}`),
};

export default certificateServices;
