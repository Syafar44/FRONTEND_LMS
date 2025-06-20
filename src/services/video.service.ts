import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IVideo } from "@/types/Video";


const videoServices = {
  getVideoById: (id: string) => instance.get(`${endpoint.VIDEO}/${id}`),
  addVideo: (payload: IVideo) =>
    instance.post(endpoint.VIDEO, payload),
  deleteVideo: (id: string) => instance.delete(`${endpoint.VIDEO}/${id}`),
  updateVideo: (id: string, payload: IVideo) =>
    instance.put(`${endpoint.VIDEO}/${id}`, payload),
  getVideoBySubCompetency: (subCompetency: string) => instance.get(`${endpoint.VIDEO}/${subCompetency}/subCompetency`),
};

export default videoServices;
