import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import competencyServices from "@/services/competency.service";
import subCompetencyServices from "@/services/subCompetency.service";
import { ISubCompetency } from "@/types/Competency";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  byCompetency: yup.string(),
  title: yup.string().required("Please input title"),
  description: yup.string().required("Please input description"),
  video: yup.mixed<FileList | string>().required("Please input video"),
  image: yup.mixed<FileList | string>().required("Please input image"),
});

const useAddCoreModal = (competencyId: string) => {
  const { setToaster } = useContext(ToasterContext);
  const {
    handleUploadFile,
    isPendingMutateUploadFile,
    handleDeleteFile,
    isPendingMutateDeleteFile,
    uploadProgress
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

  const preview= watch("image");
  const fileUrl= getValues("image");

  const handleUpload= (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("image", fileUrl);
      }
    });
  };

  const handleDelete= (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose= (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const addCore = async (payload: ISubCompetency) => {
    const res = await subCompetencyServices.addSubCompetency({
      ...payload,
    })
    return res;
  };

  const {
    mutate: mutateAddCore,
    isPending: isPendingMutateAddCore,
    isSuccess: isSuccessMutateAddCore,
  } = useMutation({
    mutationFn: addCore,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add Core",
      });
      reset();
    },
  });

  const handleAddCore = (data: ISubCompetency) => {
    const payload = {
      ...data, 
      byCompetency: competencyId,
    }
    mutateAddCore(payload)
  };

  console.log(errors)

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddCore,
    isPendingMutateAddCore,
    isSuccessMutateAddCore,

    preview,
    handleUpload,
    isPendingMutateUploadFile,
    handleDelete,
    isPendingMutateDeleteFile,
    handleOnClose,

    uploadProgress,
  };
};

export default useAddCoreModal;
