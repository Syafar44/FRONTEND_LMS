import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import {
  IActivation,
  ILogin,
  IProfile,
  IRegister,
  IUpdatePassword,
  IUpdatePasswordByAdmin,
} from "@/types/Auth";

const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
  activation: (payload: IActivation) =>
    instance.post(`${endpoint.AUTH}/activation`, payload),
  login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),
  getProfileWithToken: (token: string) =>
    instance.get(`${endpoint.AUTH}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getProfile: () => instance.get(`${endpoint.AUTH}/me`),
  getAllUsers: (params?: string) => instance.get(`${endpoint.AUTH}/user?${params}`),
  getUserById: (id: string) => instance.get(`${endpoint.AUTH}/user/${id}`),
  updatePassword: (payload: IUpdatePassword) => instance.put(`${endpoint.AUTH}/password`, payload),
  updatePasswordByAdmin: (id: string, payload: IUpdatePasswordByAdmin) => instance.put(`${endpoint.AUTH}/password/${id}`, payload),
  updateUser: (id: string, payload: IProfile) => instance.put(`${endpoint.AUTH}/user/${id}`, payload),
  updateRole: (id: string, payload: IProfile) => instance.put(`${endpoint.AUTH}/role/${id}`, payload),
  deleteUser: (id: string) => instance.delete(`${endpoint.AUTH}/user/${id}`),
  uploadFileRegister: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return instance.post(`${endpoint.AUTH}/register/bulk`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default authServices;
