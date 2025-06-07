import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IFileURL } from "@/types/File";

const uploadServices = {
  uploadFile: (payload: FormData, onUploadProgress?: (percent: number) => void) =>
    instance.post(`${endpoint.MEDIA}/upload-single`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 600000,
      onUploadProgress: (progressEvent) => {
          if (onUploadProgress && progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onUploadProgress(percent);
          }
      },
    }),
  deleteFile: (payload: IFileURL) =>
    instance.delete(`${endpoint.MEDIA}/remove`, { data: payload }),
};

export default uploadServices;
