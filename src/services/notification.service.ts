import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const notificationServices = {
  token: (payload: { token: string}) =>
    instance.post(`${endpoint.NOTIFICATION}/token`, payload),
};

export default notificationServices;
