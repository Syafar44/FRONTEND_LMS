import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import ikServices from "@/services/ik.service";
import { IIk } from "@/types/Ik";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Please input title"),
  description: yup.string().required("Please input description"),
  file: yup.string().required("Please input file"),
  duration: yup.string().required("Please input duration"),
  countdown: yup.string().required("Please input countdown"),
  video: yup.string().required("Please input video"),
  image: yup.mixed<FileList | string>().required("Please input image"),
});

const useAddIkModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
    handleUploadFile,
    isPendingMutateUploadFile,
    handleDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("image");
  const fileUrl = getValues("image");

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("image", fileUrl);
      }
    });
  };

  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const addIk = async (payload: IIk) => {
    const res = await ikServices.addIk({
      ...payload,
    })
    return res;
  };

  const {
    mutate: mutateAddIk,
    isPending: isPendingMutateAddIk,
    isSuccess: isSuccessMutateAddIk,
  } = useMutation({
    mutationFn: addIk,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add Ik",
      });
      reset();
    },
  });

  const extractYouTubeId = (url: string): string | undefined => {
    const match = url.match(
      /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^&#?/]+)/,
    );
    return match ? match[1] : undefined;
  };

  const extractDriveId = (url: string): string | undefined => {
    const match = url.match(/(?:drive\.google\.com\/file\/d\/)([^/]+)/);
    return match ? match[1] : undefined;
  };

  const handleAddIk = (data: IIk) => {
    const payload = {
      ...data,
      file: `https://drive.google.com/uc?export=download&id=${extractDriveId(`${data.file}`)}`,
      video: `${extractYouTubeId(`${data.video}`)}`,
      duration: String(Number(data.duration) * 60),
      countdown: String(Number(data.countdown) * 60),
    }
    mutateAddIk(payload)
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddIk,
    isPendingMutateAddIk,
    isSuccessMutateAddIk,
    handleUploadImage,
    handleDeleteImage,
    handleOnClose,
    preview,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
  };
};

export default useAddIkModal;
