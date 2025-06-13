import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import competencyServices from "@/services/competency.service";
import kajianServices from "@/services/kajian.service";
import { ICompetency } from "@/types/Competency";
import { IKajian } from "@/types/Kajian";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Please input title"),
  description: yup.string().required("Please input description"),
  video: yup.string().required("Please input video"),
  image: yup.mixed<FileList | string>().required("Please input image"),
});

const useAddKajianModal = () => {
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

  const [access, setAccess] = useState<string[]>([])

  const addKajian = async (payload: IKajian) => {
    const res = await kajianServices.addKajian({...payload})
    return res;
  };

  const {
    mutate: mutateAddKajian,
    isPending: isPendingMutateAddKajian,
    isSuccess: isSuccessMutateAddKajian,
  } = useMutation({
    mutationFn: addKajian,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add Kajian",
      });
      reset();
    },
  });

  const handleAddKajian = (data: IKajian) => mutateAddKajian(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddKajian,
    isPendingMutateAddKajian,
    isSuccessMutateAddKajian,

    preview,
    handleUploadImage,
    isPendingMutateUploadFile,
    handleDeleteImage,
    isPendingMutateDeleteFile,
    handleOnClose,
    access,
    setAccess,
  };
};

export default useAddKajianModal;
