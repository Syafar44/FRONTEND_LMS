import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { INotification } from "@/types/Notification";

const notificationServices = {
  token: (payload: { token: string}) =>
    instance.post(`${endpoint.NOTIFICATION}/token`, payload),
  sendMessage: (payload: INotification) =>
    instance.post(`${endpoint.NOTIFICATION}/send`, payload),
};

export default notificationServices;
